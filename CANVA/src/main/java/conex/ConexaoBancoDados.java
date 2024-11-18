package conex;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBancoDados {
    private JdbcTemplate conexaoBanco;

    public ConexaoBancoDados() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/citruscloud");
        dataSource.setUsername("root");
        dataSource.setPassword("citrus24vital");
        conexaoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoBanco(){
        return conexaoBanco;
    }
}
