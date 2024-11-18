package etl;

import conex.ConexaoBancoDados;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.InputStream;

public abstract class ArquivoProcessado {
    protected String nomeArquivo;
    protected String bucketS3;
    protected JdbcTemplate database;

    public ArquivoProcessado(String caminhoArquivo, String bucketS3, ConexaoBancoDados conexao) {
        this.nomeArquivo = caminhoArquivo;
        this.bucketS3 = bucketS3;
        this.database = conexao.getConexaoBanco();
    }

    public abstract void processarArquivo(InputStream arquivo);

    protected void salvarNoBanco(String sql, Object... valores) {
        database.update(sql, valores);
    }
}
