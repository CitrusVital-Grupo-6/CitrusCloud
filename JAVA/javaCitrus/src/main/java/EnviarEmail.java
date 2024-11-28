import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class EnviarEmail {

    public void sendEmail(String to, String subject, String body, String smtpHost, String smtpPort, String fromEmail, String fromPassword) throws MessagingException {

        smtpHost = "smtp-mail.outlook.com";
        smtpPort = "587";
        to = "maridlopes29@icloud.com";
        subject = "Teste Email";
        body = "aaa";
        fromEmail = "mariana.lopes@sptech.school";
        fromPassword = "#Gf54576086898";

        // Set up mail server properties
        Properties props = new Properties();
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.port", smtpPort);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); // Enable STARTTLS for security


        String finalFromEmail = fromEmail;
        String finalFromPassword = fromPassword;
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(finalFromEmail, finalFromPassword);
            }
        });

        // Create a new message
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(fromEmail));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject(subject);
        message.setText(body);

        // Send the message
        Transport.send(message);
    }


    /* TESTE ENVIO EMAIL
        public static void main(String[] args) {
        //This main method is for testing purposes only.  Remove this from your actual project.
        EnviarEmail sender = new EnviarEmail();
        try {
            sender.sendEmail("recipient@example.com", "Test Email", "This is a test email.", "your.smtp.server.com", "587", "your_email@example.com", "your_password");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }*/
}