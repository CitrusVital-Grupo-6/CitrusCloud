public class MainClass {
    public static void main(String[] args) {
        EtlXlsx etlAgrotoxico = new EtlXlsx();
        etlAgrotoxico.executarEtlComS3("base_defen.xlsx", "base_praga.xlsx");
    }
}