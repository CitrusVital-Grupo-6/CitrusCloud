import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;
import java.sql.*;

public class EnviarEmail {

    private Connection connection; // Database connection

    // Constructor to establish the database connection
    public EnviarEmail() throws SQLException {
        // **CRUCIAL:** Replace with YOUR database credentials SECURELY (environment variables recommended)
        String dbUrl = System.getenv("DB_URL"); // Example: jdbc:mysql://localhost:3306/your_database_name
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

    public void sendEmail(int userId, String subject, String body, String fromEmail, String fromPassword) throws MessagingException, SQLException {
        fromEmail = "mariana.lopes@sptech.school";
        fromPassword = "#Gf54576086898";
        subject = "IMPORTANTE! Dia da Pulverização se Aproxima!";
        body = "Prezado usuário,\n" +
                "\n" +
                "Esperamos que esteja tudo bem com você. Gostaríamos de lembrá-lo de que o dia agendado para a realização da pulverização em seu talhão está se aproximando. É essencial garantir que todas as medidas necessárias sejam tomadas para garantir o sucesso do procedimento.\n" +
                "\n" +
                "Por favor, certifique-se de que a área a ser pulverizada esteja devidamente preparada, livre de objetos que possam interferir no processo. Além disso, lembre-se de seguir as instruções de segurança fornecidas para proteger a si mesmo e ao meio ambiente.\n" +
                "\n" +
                "Caso haja alguma dúvida, entre em contato conosco. Estamos aqui para garantir que tudo ocorra da melhor forma possível.\n" +
                "\n" +
                "Agradecemos pela confiança em nossos serviços e estamos à disposição para qualquer outra informação que precisar.\n" +
                "\n" +
                "Atenciosamente,\n" +
                "\n" +
                "Citrus Vital\n";

        String to = null; // Get email from database

        try {
            to = getUserEmail(userId);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        if (to == null) {
            throw new MessagingException("User email not found in database for ID: " + userId);
        }

        // SMTP settings (you can still parameterize these if needed)
        String smtpHost = "smtp-mail.outlook.com";
        String smtpPort = "587";


        Properties props = new Properties();
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.port", smtpPort);
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
        } finally {
            //Close the database connection after email sending is complete
            closeConnection();
        }
    }

    // Method to fetch user email from the database
    private String getUserEmail(int userId) throws SQLException {
        String email = null;
        try (PreparedStatement statement = connection.prepareStatement("SELECT email FROM Usuario WHERE idUsuario = ?")) {
            statement.setInt(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    email = resultSet.getString("email");
                }
            }
        }
        return email;
    }


    // Method to close the database connection
    private void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            System.err.println("Error closing database connection: " + e.getMessage());
        }
    }


    public static void main(String[] args) {
        try {
            EnviarEmail sender = new EnviarEmail();
            sender.sendEmail(1, "Test Email", "This is a test email.", "mariana.lopes@sptech.school", "#Gf54576086898"); // Replace 1 with a valid user ID
        } catch (MessagingException | SQLException e) {
            e.printStackTrace();
        }
    }
}