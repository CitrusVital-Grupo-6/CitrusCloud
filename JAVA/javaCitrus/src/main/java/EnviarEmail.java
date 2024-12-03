import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;
import java.sql.*;

public class EnviarEmail {

    private Connection connection;

    public EnviarEmail() throws SQLException {
        String dbUrl = System.getenv("DB_URL");
        String dbUser = System.getenv("DB_USER");
        String dbPassword = System.getenv("DB_PASSWORD");

        if (dbUrl == null || dbUser == null || dbPassword == null) {
            throw new SQLException("Database connection details (DB_URL, DB_USER, DB_PASSWORD) are not set as environment variables.");
        }

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC driver not found: " + e.getMessage(), e);
        } catch (SQLException e) {
            throw new SQLException("Database connection failed: " + e.getMessage(), e);
        }
    }

    public void sendEmail(String to, String subject, String body, String fromEmail, String fromPassword) throws MessagingException {

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp-mail.outlook.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        String finalFromEmail = fromEmail;
        String finalFromPassword = fromPassword;

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(finalFromEmail, finalFromPassword);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);
            message.setText(body);
            Transport.send(message);
        } catch (MessagingException e) {
            throw new MessagingException("Error sending email: " + e.getMessage(), e);
        }
    }

    public void sendEmailsForUpcomingPulverizations() throws SQLException, MessagingException {
        String query = """
                SELECT
                	u.email,
                	p.dataPulverizacao as dtPulverizacao,
                    a.nome as nomeDefen,
                    p.qtdMl,
                	f.nomeFazenda AS nomeFazenda,
                	t.nomeTalhao AS nomeTalhao
                FROM Pulverizacao p
                	JOIN Talhao t ON p.fkTalhao = t.idTalhao
                	LEFT JOIN Agrotoxico a ON a.idAgrotoxico = p.fkAgrotoxico
                	JOIN Fazenda f ON t.fkFazenda = f.idFazenda
                	JOIN Empresa e ON f.fkEmpresa = e.idEmpresa
                	JOIN Usuario u ON u.fkEmpresa = e.idEmpresa
                WHERE p.dataPulverizacao
                BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY);
        """;

        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            String fromEmail = "mariana.lopes@sptech.school";
            String fromPassword = "#Gf54576086898";
            String subject = "IMPORTANTE! Dia da Pulverização se Aproxima!";

            while (resultSet.next()) {
                String to = resultSet.getString("email");
                String dataPulverizacao = resultSet.getString("dtPulverizacao");
                String nomeFazenda = resultSet.getString("nomeFazenda");
                String nomeTalhao = resultSet.getString("nomeTalhao");

                String body = String.format("""
                        Prezado usuário,

                        Gostaríamos de lembrá-lo de que o dia agendado para a pulverização no talhão %s da fazenda %s está se aproximando.
                        Data prevista: %s.

                        Certifique-se de que todas as medidas necessárias sejam tomadas para o sucesso do procedimento.
                        Caso tenha dúvidas, entre em contato conosco.

                        Atenciosamente,
                        Citrus Vital
                        """, nomeTalhao, nomeFazenda, dataPulverizacao);

                try {
                    sendEmail(to, subject, body, fromEmail, fromPassword);
                    System.out.println("Email enviado para: " + to);
                } catch (MessagingException e) {
                    System.err.println("Erro ao enviar email para " + to + ": " + e.getMessage());
                }
            }
        }
    }

    public static void main(String[] args) {
        try {
            EnviarEmail sender = new EnviarEmail();
            sender.sendEmailsForUpcomingPulverizations();
        } catch (SQLException | MessagingException e) {
            e.printStackTrace();
        }
    }
}
