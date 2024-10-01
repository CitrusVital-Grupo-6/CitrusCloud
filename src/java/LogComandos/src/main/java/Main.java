import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        String dangerError = "\u001B[31mDANGER\u001B[0m";
        String alertError = "\u001B[33mALERT\u001B[0m";
        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedNow = "["+now.format(formatter)+"]";

        try {
            System.out.println(formattedNow + dangerError + " - A aplicação encontrou uma erro inesperado. Por favor, reinicie a aplicação e tente novamente");
            Thread.sleep(1000);
            now = LocalDateTime.now();
            formattedNow = "["+now.format(formatter)+"]";
            System.out.println(formattedNow + dangerError + " - A conexão com o banco de dados não foi estabelecida.");
            Thread.sleep(1000);
            now = LocalDateTime.now();
            formattedNow = "["+now.format(formatter)+"]";
            System.out.println(formattedNow + alertError + " - O tempo limite da operação foi excedido.");
            Thread.sleep(1000);
            now = LocalDateTime.now();
            formattedNow = "["+now.format(formatter)+"]";
            System.out.println(formattedNow + " - O usuário X entrou na aplicação.");

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
