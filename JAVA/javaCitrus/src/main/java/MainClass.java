public class MainClass {
    public static void main(String[] args) {
        EtlXlsx etlAgrotoxico = new EtlXlsx();
        etlAgrotoxico.executarEtlComS3("base_defen.xlsx");

//        EtlXlsx etlPraga = new EtlXlsx();
//        etlPraga.executarEtlComS3("base_praga.xlsx");
    }
}