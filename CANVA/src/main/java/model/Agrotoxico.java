package model;

public class Agrotoxico {
    private int id;
    private String nome;
    private String tipo;
    private int minTemperatura;
    private int maxTemperatura;
    private int minSemChuva;
    private int maxSemChuva;

    public Agrotoxico(String nome, String tipo, int minTemperatura, int maxTemperatura, int minSemChuva, int maxSemChuva) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.minTemperatura = minTemperatura;
        this.maxTemperatura = maxTemperatura;
        this.minSemChuva = minSemChuva;
        this.maxSemChuva = maxSemChuva;
    }
    public Agrotoxico() {
    }

    public int getId() {return id;}
    public String getNome() {return nome;}
    public String getTipo() {return tipo;}
    public int getMinTemperatura() {return minTemperatura;}
    public int getMaxTemperatura() {return maxTemperatura;}
    public int getMinSemChuva() {return minSemChuva;}
    public int getMaxSemChuva() {return maxSemChuva;}

    public void setId(int idAgrotoxico) {this.id = idAgrotoxico;}
    public void setNome(String nome) {this.nome = nome;}
    public void setTipo(String tipo) {this.tipo = tipo;}
    public void setMinTemperatura(int minTemperatura) {this.minTemperatura = minTemperatura;}
    public void setMaxTemperatura(int maxTemperatura) {this.maxTemperatura = maxTemperatura;}
    public void setMinSemChuva(int minSemChuva) {this.minSemChuva = minSemChuva;}
    public void setMaxSemChuva(int maxSemChuva) {this.maxSemChuva = maxSemChuva;}
}

