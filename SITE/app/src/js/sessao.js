
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    
    if (email == null && nome == null) {
        window.location = "../../public/pages/login.html";
    }

    var path = window.location.pathname;
    var folder = path.split("/").slice(-2, -1)[0];
    var funcNecessaria = ""

    switch (pasta) {
        case pasta == "agron":
            funcNecessaria = "AGRONOMO";
            break;
        case pasta == "financ":
            funcNecessaria = "FINANCEIRO";
            break;
    }

    validarFuncao(funcNecessaria);
}

function vaidarFuncao(funcaoNecessaria) {
    var func = sessionStorage.FUNCAO;
    var isPermitido = false;
    var homeFunc = "";

    switch (func) {
        case func == "ADMINISTRADOR":
            isPermitido = true;
            break;
        case func == funcaoNecessaria:
            isPermitido = true;
            break;
    }

    switch (func) {
        case func == "FINANCEIRO":
            homeFunc = "../../public/financ/homeFinanc.html";
            break;
        case func = "AGRONOMO":
            homeFunc = "../../public/agron/homeAgron.html";
            break;
    }

    if(!isPermitido){
        window.location = homeFunc;
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/";
}