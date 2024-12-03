package conex;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBancoDados {
    private JdbcTemplate conexaoBanco;

    public ConexaoBancoDados() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setUrl(System.getenv("DB_URL"));
        dataSource.setUsername(System.getenv("DB_USER"));
        dataSource.setPassword(System.getenv("DB_PASSWORD"));
        conexaoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoBanco(){
        return conexaoBanco;
    }
}
