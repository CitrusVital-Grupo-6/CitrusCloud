package etl;

import conex.ConexaoBancoDados;
import model.Praga;

import java.io.InputStream;
import java.util.List;

public class PragaRepository extends ArquivoProcessado {
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
        // Lógica para ler o arquivo e transformar em objetos Agrotoxico
        // Usar biblioteca como Apache POI ou outras para leitura de XLSX
        return null;
    }
}
