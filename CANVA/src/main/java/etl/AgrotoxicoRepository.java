package etl;

import conex.ConexaoBancoDados;
import model.Agrotoxico;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class AgrotoxicoRepository extends ArquivoProcessado {
    String processandoMessage = "\u001B[33mPROCESSANDO:\u001B[0m";
    String sucessoMessage = "\u001B[32mSUCESSO:\u001B[0m";
    String erroMessage = "\u001B[31mERRO:\u001B[0m";

    public AgrotoxicoRepository(String caminhoArquivo, String bucketS3, ConexaoBancoDados conexao) {
        super(caminhoArquivo, bucketS3, conexao);
    }

    @Override
    public void processarArquivo(InputStream arquivo) {
        List<Agrotoxico> agrotoxicos = extrairAgrotoxicos(arquivo);

        System.out.println(processandoMessage+" Inciando inserção dos agrotoxicos no banco...");
        for (Agrotoxico agrot : agrotoxicos) {
            String sql = "INSERT INTO Agrotoxico(idAgrotoxico, nome, tipo, minTemperatura, maxTemperatura, minSemChuva, maxSemChuva) VALUES (?, ?, ?, ?, ?, ?, ?)";
            salvarNoBanco(sql, agrot.getId(),agrot.getNome(), agrot.getTipo(), agrot.getMinTemperatura(), agrot.getMaxTemperatura(), agrot.getMinSemChuva(), agrot.getMaxSemChuva());
        }
        System.out.println(sucessoMessage+" Agrotoxicos inseridos!");
    }

    private List<Agrotoxico> extrairAgrotoxicos(InputStream arquivo) {
        try {
            System.out.println(processandoMessage+" Iniciando leitura do arquivo: "+nomeArquivo+"...");
            Workbook arquivoExcel;
            arquivoExcel = new XSSFWorkbook(arquivo);

            Sheet base = arquivoExcel.getSheetAt(0);
            List<Agrotoxico> objetosExtraidos = new ArrayList<>();

            System.out.println(processandoMessage+" Iniciando criação de objetos...");
            for (Row linha : base) {
                if (linha.getRowNum() == 0) {
                    continue;
                }

                Agrotoxico agrot = new Agrotoxico();
                agrot.setId((int) linha.getCell(0).getNumericCellValue());
                agrot.setNome(linha.getCell(1).getStringCellValue());
                agrot.setTipo(linha.getCell(2).getStringCellValue());
                agrot.setMinTemperatura((int) linha.getCell(3).getNumericCellValue());
                agrot.setMaxTemperatura((int) linha.getCell(4).getNumericCellValue());
                agrot.setMinSemChuva((int) linha.getCell(5).getNumericCellValue());
                agrot.setMaxSemChuva((int) linha.getCell(6).getNumericCellValue());

                objetosExtraidos.add(agrot);
            }

            arquivoExcel.close();
            System.out.println(sucessoMessage + " Objeto criados!");
            System.out.println(sucessoMessage + " Arquivo lido com sucesso!");
            return objetosExtraidos;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
