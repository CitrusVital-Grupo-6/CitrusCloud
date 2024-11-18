package model;

public class Praga {
    private int id;
    private String nome;

    public Praga(int idPraga, String nomePraga) {
        this.id = idPraga;
        this.nome = nomePraga;
    }
    public Praga() {}

    public int getId() {return id;}
    public String getNome() {return nome;}

    public void setNome(String nome) {this.nome = nome;}
    public void setIdPragas(int idPragas) {this.id = id;}
}
