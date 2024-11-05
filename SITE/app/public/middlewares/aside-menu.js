( () => {
    document.getElementById("aside-menu").innerHTML = `
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="Logo da Empresa">
        </div>

        <div class="nav-caret" id="button-aside-menu">
            <div class="nav-caret-background"></div>
            <svg class="nav-caret-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                <path
                    d="M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z">
                </path>
            </svg>
        </div>

        <nav>
            <ul class="nav-items" id="nav-items-wrapper">
            </ul>
        </nav>
    `
})();

(() => {
    var path = window.location.pathname;
    var folder = path.split("/").slice(-2, -1)[0];  

    if(folder == "financ"){
        document.getElementById("nav-items-wrapper").innerHTML = `
            <li class="nav-item">
                <a href="./homeFinanc.html">
                    <i class="fa-solid fa-house"></i>
                    <span>Overview</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="./planejamento.html">
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>Planejamento</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#">
                    <i class="fa-solid fa-user"></i>
                    <span>Usuário</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#">
                    <i class="fa-solid fa-headset"></i>
                    <span>Ajuda</span>
                </a>
            </li>
            <li class="nav-item log-out-icon">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                        <path
                            d="M118,216a6,6,0,0,1-6,6H48a6,6,0,0,1-6-6V40a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H54V210h58A6,6,0,0,1,118,216Zm110.24-92.24-40-40a6,6,0,0,0-8.48,8.48L209.51,122H112a6,6,0,0,0,0,12h97.51l-29.75,29.76a6,6,0,1,0,8.48,8.48l40-40A6,6,0,0,0,228.24,123.76Z">
                        </path>
                    </svg> 
                    <span>Sair</span>
                </a>
            </li>
        `
    } else if(folder == "agron"){
            document.getElementById("nav-items-wrapper").innerHTML = `
            <li class="nav-item">
                <a href="#">
                    <i class="fa-solid fa-house"></i>
                    <span>Início</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="./fazendas.html">
                    <i class="fa-solid fa-calendar-plus"></i>
                    <span>Agendar</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#">
                    <i class="fa-solid fa-user"></i>
                    <span>Usuário</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#">
                    <i class="fa-solid fa-headset"></i>
                    <span>Ajuda</span>
                </a>
            </li>
            <li class="nav-item log-out-icon">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                        <path
                            d="M118,216a6,6,0,0,1-6,6H48a6,6,0,0,1-6-6V40a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H54V210h58A6,6,0,0,1,118,216Zm110.24-92.24-40-40a6,6,0,0,0-8.48,8.48L209.51,122H112a6,6,0,0,0,0,12h97.51l-29.75,29.76a6,6,0,1,0,8.48,8.48l40-40A6,6,0,0,0,228.24,123.76Z">
                        </path>
                    </svg> 
                    <span>Sair</span>
                </a>
            </li>
        `
    }
})();

let asideMenu = document.getElementById("aside-menu");
let buttonAsideMenu = document.getElementById("button-aside-menu");
let mainContent = document.getElementById("main-content");

buttonAsideMenu.addEventListener("click", () => {
    asideMenu.classList.toggle("open");
    mainContent.classList.toggle("aside-open");
});

function limparSessao() {
    sessionStorage.clear();
    window.location = "/";
}