package model;

public class Praga {
    private int id;
    private String nomePraga;
    private String climaFavoral;
    private String periodoRisco;
    private String fatoresAdicionais;

    public Praga(int id, String nomePraga, String climaFavoral, String periodoRisco, String fatoresAdicionais) {
        this.id = id;
        this.nomePraga = nomePraga;
        this.climaFavoral = climaFavoral;
        this.periodoRisco = periodoRisco;
        this.fatoresAdicionais = fatoresAdicionais;
    }

    public Praga() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomePraga() {
        return nomePraga;
    }

    public void setNomePraga(String nomePraga) {
        this.nomePraga = nomePraga;
    }

    public String getClimaFavoral() {
        return climaFavoral;
    }

    public void setClimaFavoral(String climaFavoral) {
        this.climaFavoral = climaFavoral;
    }

    public String getPeriodoRisco() {
        return periodoRisco;
    }

    public void setPeriodoRisco(String periodoRisco) {
        this.periodoRisco = periodoRisco;
    }

    public String getFatoresAdicionais() {
        return fatoresAdicionais;
    }

    public void setFatoresAdicionais(String fatoresAdicionais) {
        this.fatoresAdicionais = fatoresAdicionais;
    }
}
