import org.springframework.jdbc.core.JdbcTemplate;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
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
    private Boolean primeiraConex = true;


    public void executarEtlComS3(String nomeArquivoDefen, String nomeArquivoPraga) {
        String accessKeyId = System.getenv("AWS_ACCESS_KEY_ID");
        String secretAccessKey = System.getenv("AWS_SECRET_ACCESS_KEY");
        String sessionToken = System.getenv("AWS_SESSION_TOKEN");

        S3Client s3 = new S3Provider(accessKeyId, secretAccessKey, sessionToken).getS3Client();

        String nomeBucket = "base-dados-citrus";
        try (InputStream arquivoDefen = s3.getObject(GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivoDefen)
                .build());
             InputStream arquivoPraga = s3.getObject(GetObjectRequest.builder()
                     .bucket(nomeBucket)
                     .key(nomeArquivoPraga)
                     .build())) {

            if (nomeArquivoDefen.equals("base_defen.xlsx")) {
                List<Agrotoxico> agrotoxicos = extrairAgrotoxicos(nomeArquivoDefen, arquivoDefen);

                for (Agrotoxico agrotoxico : agrotoxicos) {
                    inserirAgrotoxico(agrotoxico, primeiraConex);
                }
            } else {
                List<Praga> pragas = extrairPragas(nomeArquivoPraga, arquivoPraga);

                for (Praga praga : pragas) {
                    inserirPraga(praga, primeiraConex);
                }
            }

            System.out.println(textoVerde + "ETL Concluída com sucesso");

        } catch (S3Exception e) {
            System.err.println(textoVermelho + e.awsErrorDetails().errorMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Praga> extrairPragas(String nomeArquivo, InputStream arquivo){
        try {
            System.out.println(textoAmarelo+"Iniciando leitura do arquivo: "+nomeArquivo);
            Workbook arquivoExcel;
            if (nomeArquivo.endsWith(".xlsx")) {
                arquivoExcel = new XSSFWorkbook(arquivo);
            } else {
                arquivoExcel = new HSSFWorkbook(arquivo);
            }

            Sheet base = arquivoExcel.getSheetAt(0);
            List<Praga> objetosExtraidos = new ArrayList<>();

            System.out.println(textoAmarelo + "Iniciando transformação das linhas em objetos");
            for (Row linha : base) {
                if (linha.getRowNum() == 0) {
                    continue;
                }

                Praga praga = new Praga();
                praga.setIdPragas((int) linha.getCell(0).getNumericCellValue());
                praga.setNome(linha.getCell(1).getStringCellValue());

                objetosExtraidos.add(praga);
            }

            arquivoExcel.close();
            System.out.println(textoVerde + "Linhas transformadas em objetos");
            System.out.println(textoVerde + "Arquivo lido com sucesso");
            return objetosExtraidos;
        } catch (IOException e) {
            throw new RuntimeException(e);
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
                agrot.setIdAgrotoxico((int) linha.getCell(0).getNumericCellValue());
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

    private void inserirAgrotoxico(Agrotoxico agrot, Boolean primeiraConex) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        if (primeiraConex) {
            System.out.println(textoAmarelo + "Desabilitando restrição de chave estrangeira...");
            String disableForeignKeys = "SET FOREIGN_KEY_CHECKS = 0;";
            con.execute(disableForeignKeys);
            System.out.println(textoVerde + "Restrições de chave estrangeira desabilitadas");

            System.out.println(textoAmarelo + "Limpando os dados da tabela Agrotoxico...");
            String truncateSql = "TRUNCATE TABLE Agrotoxico;";
            con.execute(truncateSql);
            System.out.println(textoVerde + "Limpeza feita na tabela Agrotoxico");

            System.out.println(textoAmarelo + "Habilitando restrição de chave estrangeira...");
            String enableForeignKeys = "SET FOREIGN_KEY_CHECKS = 1;";
            con.execute(enableForeignKeys);
            System.out.println(textoVerde + "Restrições de chave estrangeira habilitadas");

            primeiraConex = false;
        }

        System.out.println(textoAmarelo+"Inserindo dados no banco de dados...");
        String sql = "INSERT INTO Agrotoxico(idAgrotoxico, nome, tipo, minTemperatura, maxTemperatura, minSemChuva, maxSemChuva) VALUES (?, ?, ?, ?, ?, ?, ?)";

        con.update(sql, agrot.getIdAgrotoxico(),agrot.getNome(), agrot.getTipo(), agrot.getMinTemperatura(), agrot.getMaxTemperatura(), agrot.getMinSemChuva(), agrot.getMaxSemChuva());

        System.out.println(textoVerde+"Dados inseridos com sucesso: "+ agrot);
    }

    private void inserirPraga(Praga praga, Boolean primeiraConex) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        if (primeiraConex) {
            System.out.println(textoAmarelo + "Desabilitando restrição de chave estrangeira...");
            String disableForeignKeys = "SET FOREIGN_KEY_CHECKS = 0;";
            con.execute(disableForeignKeys);
            System.out.println(textoVerde + "Restrições de chave estrangeira desabilitadas");

            System.out.println(textoAmarelo + "Limpando os dados da tabela Agrotoxico...");
            String truncateSql = "TRUNCATE TABLE Agrotoxico;";
            con.execute(truncateSql);
            System.out.println(textoVerde + "Limpeza feita na tabela Agrotoxico");

            System.out.println(textoAmarelo + "Habilitando restrição de chave estrangeira...");
            String enableForeignKeys = "SET FOREIGN_KEY_CHECKS = 1;";
            con.execute(enableForeignKeys);
            System.out.println(textoVerde + "Restrições de chave estrangeira habilitadas");

            primeiraConex = false;
        }

        System.out.println(textoAmarelo+"Inserindo dados no banco de dados...");
        String sql = "INSERT INTO Praga(idPraga, nome) VALUES (?, ?)";

        con.update(sql, praga.getIdPraga(), praga.getNomePraga());

        System.out.println(textoVerde+"Dados inseridos com sucesso: "+ praga);
    }
}
