import org.springframework.jdbc.core.JdbcTemplate;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.regions.Region;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class EtlXlsx {
    public String textoAmarelo = "\u001B[33mPROCESSANDO:\u001B[0m";
    public String textoVerde = "\u001B[32mSUCESSO:\u001B[0m";
    public String textoVermelho = "\u001B[31mERRO:\u001B[0m";

    public void executarEtlComS3(String caminho) {
        String nomeBucket = "base-dados-citrus";
        Region region = Region.US_EAST_1;

        S3Client s3 = S3Client.builder()
                .region(region)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();

        try (InputStream s3InputStream = s3.getObject(GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(caminho)
                .build())) {

            List<Agrotoxico> agrotoxicos = extrairAgrotoxicos(caminho, s3InputStream);

            for (Agrotoxico agrotoxico : agrotoxicos) {
                jogandoNoBanco(agrotoxico);
            }
            System.out.println(textoVerde + "Tudo certo rei");

        } catch (S3Exception e) {
            System.err.println(textoVermelho + e.awsErrorDetails().errorMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Agrotoxico> extrairAgrotoxicos(String nomeArquivo, InputStream arquivo) {
        try {
            System.out.println(textoAmarelo+"Iniciando leitura do arquivo: "+nomeArquivo);
            Workbook arquivoExcel;
            if (nomeArquivo.endsWith(".xlsx")) {
                arquivoExcel = new XSSFWorkbook(arquivo);
            } else {
                arquivoExcel = new HSSFWorkbook(arquivo);
            }

            Sheet base = arquivoExcel.getSheetAt(0);
            List<Agrotoxico> objetosExtraidos = new ArrayList<>();

            System.out.println(textoAmarelo + "Iniciando transformação das linhas em objetos");
            for (Row linha : base) {
                if (linha.getRowNum() == 0) {
                    continue;
                }

                Agrotoxico agrot = new Agrotoxico();
                agrot.setNome(linha.getCell(1).getStringCellValue());
                agrot.setTipo(linha.getCell(2).getStringCellValue());
                agrot.setMinTemperatura((int) linha.getCell(3).getNumericCellValue());
                agrot.setMaxTemperatura((int) linha.getCell(4).getNumericCellValue());
                agrot.setMinSemChuva((int) linha.getCell(5).getNumericCellValue());
                agrot.setMaxSemChuva((int) linha.getCell(6).getNumericCellValue());

                objetosExtraidos.add(agrot);
            }

            arquivoExcel.close();
            System.out.println(textoVerde + "Linhas transformadas em objetos");
            System.out.println(textoVerde + "Arquivo lido com sucesso");
            return objetosExtraidos;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void jogandoNoBanco(Agrotoxico agrot) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        System.out.println(textoAmarelo+"Inserindo dados no banco de dados...");
        String sql = "INSERT INTO Agrotoxico(idAgrotoxico, nome, tipo, minTemperatura, maxTemperatura, minSemChuva, maxSemChuva) VALUES (?, ?, ?, ?, ?, ?, ?)";

        con.update(sql, agrot.getIdAgrotoxico(), agrot.getNome(), agrot.getTipo(), agrot.getMinTemperatura(), agrot.getMaxTemperatura(), agrot.getMinSemChuva(), agrot.getMaxSemChuva());

        System.out.println(textoVerde+"Dados inseridos com sucesso: "+ agrot);
    }
}
