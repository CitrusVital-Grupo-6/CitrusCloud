package main;

import log.Logger;
import conex.ConexaoBancoDados;
import conex.S3Provider;
import software.amazon.awssdk.services.s3.S3Client;
import etl.EtlOrquestrador;

public class Main {

    public static void main(String[] args) {
        String processandoMessage = "\u001B[33mPROCESSANDO:\u001B[0m";
        String sucessoMessage = "\u001B[32mSUCESSO:\u001B[0m";
        String erroMessage = "\u001B[31mERRO:\u001B[0m";

        System.out.println(processandoMessage + " Setando credenciais...");
        String accessKeyId = System.getenv("AWS_ACCESS_KEY_ID");
        String secretAccessKey = System.getenv("AWS_SECRET_ACCESS_KEY");
        String sessionToken = System.getenv("AWS_SESSION_TOKEN");

        System.out.println(processandoMessage + " Estabelecendo conexão com a AWS...");
        S3Client s3Client = new S3Provider(accessKeyId, secretAccessKey, sessionToken).getS3Client();
        System.out.println(sucessoMessage + "Conexão com AWS estabelecida!");

        String bucketNome = "base-dados-citrus";

        ConexaoBancoDados conexao = new ConexaoBancoDados();
        EtlOrquestrador orquestrador = new EtlOrquestrador(s3Client, bucketNome, conexao);

        orquestrador.executarEtlComS3("base_defen.xlsx", "base_praga.xlsx");
    }
}
