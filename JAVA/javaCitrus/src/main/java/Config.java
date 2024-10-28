import io.github.cdimascio.dotenv.Dotenv;

public class Config {
    private static Dotenv dotenv = Dotenv.load();

    public static String getAwsAccessKeyId() {return dotenv.get("AWS_ACCESS_KEY_ID");}
    public static String getAwsSecretAccessKey() {return dotenv.get("AWS_SECRET_ACCESS_KEY");}
    public static String getSessionToken() {return dotenv.get("AUTH_TOKEN");}
}
