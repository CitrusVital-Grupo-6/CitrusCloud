package etl;

import conex.ConexaoBancoDados;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.InputStream;

public class EtlOrquestrador {
    private final S3Client s3Client;
    private final String bucketNome;
    private final ConexaoBancoDados conexao;

    public EtlOrquestrador(S3Client s3Client, String bucketNome, ConexaoBancoDados conexao) {
        this.s3Client = s3Client;
        this.bucketNome = bucketNome;
        this.conexao = conexao;
    }

    public void executarEtlComS3(String nomeArquivoDefen, String nomeArquivoPraga) {
        try (InputStream arquivoDefen = s3Client.getObject(GetObjectRequest.builder()
                .bucket(bucketNome)
                .key(nomeArquivoDefen)
                .build());
             InputStream arquivoPraga = s3Client.getObject(GetObjectRequest.builder()
                     .bucket(bucketNome)
                     .key(nomeArquivoPraga)
                     .build())) {

            if (nomeArquivoDefen.equals("base_defen.xlsx")) {
                AgrotoxicoRepository agrotoxicoRepo = new AgrotoxicoRepository(nomeArquivoDefen, bucketNome, conexao);
                agrotoxicoRepo.processarArquivo(arquivoDefen);
            }

            if (nomeArquivoPraga.equals("base_praga.xlsx")) {
                PragaRepository pragaRepo = new PragaRepository(nomeArquivoPraga, bucketNome, conexao);
                pragaRepo.processarArquivo(arquivoPraga);
            }

            System.out.println("ETL concluída com sucesso");

        } catch (S3Exception e) {
            System.err.println("Erro ao acessar o S3: " + e.awsErrorDetails().errorMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
