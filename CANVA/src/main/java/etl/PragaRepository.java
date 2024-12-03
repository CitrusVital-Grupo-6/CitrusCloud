package etl;

import conex.ConexaoBancoDados;
import model.Agrotoxico;
import model.Praga;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class PragaRepository extends ArquivoProcessado {
    String processandoMessage = "\u001B[33mPROCESSANDO:\u001B[0m";
    String sucessoMessage = "\u001B[32mSUCESSO:\u001B[0m";
    String erroMessage = "\u001B[31mERRO:\u001B[0m";
    
    public PragaRepository(String caminhoArquivo, String bucketS3, ConexaoBancoDados conexao) {
        super(caminhoArquivo, bucketS3, conexao);
    }

    @Override
    public void processarArquivo(InputStream arquivo) {
        List<Praga> pragas = extrairPragas(arquivo);

        for(Praga praga : pragas){
            String sql = "INSERT INTO pragas (nome, condicao, periodo) VALUES (?, ?, ?)";
            salvarNoBanco(sql, praga.getId(), praga.getNome());
        }
    }

    private List<Praga> extrairPragas(InputStream arquivo) {
        try {
            System.out.println(processandoMessage+" Iniciando leitura do arquivo: "+nomeArquivo+"...");
            Workbook arquivoExcel;
            arquivoExcel = new XSSFWorkbook(arquivo);

            Sheet base = arquivoExcel.getSheetAt(0);
            List<Praga> objetosExtraidos = new ArrayList<>();

            System.out.println(processandoMessage+" Iniciando criação de objetos...");
            for (Row linha : base) {
                if (linha.getRowNum() == 0) {
                    continue;
                }
    
                Praga praga = new Praga();
                praga.setId((int) linha.getCell(0).getNumericCellValue());
                praga.setNome(linha.getCell(1).getStringCellValue());

                objetosExtraidos.add(praga);
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
