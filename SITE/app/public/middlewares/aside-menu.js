// CRIANDO ASIDE MENU
(() => {
    document.getElementById("aside-menu").innerHTML = `
        <div class="logo" onclick="mudarDash()">
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

// POPULANDO MENU ASIDE
(() => {
    const userData = sessionStorage.getItem("USER_DATA");
    const parsedData = JSON.parse(userData);

    const cargo = parsedData.role;

    // LISTA DE PÁGINAS
    const homeFinanc = `
    <li class="nav-item">
        <a href="./homeFinanc.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#636363" viewBox="0 0 256 256"><path d="M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z"></path></svg>
            <span>Home</span>
        </a>
    </li>
    `

    const dashFinanc = `
        <li class="nav-item">
            <a href="./dashFinanc.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path></svg>
                <span>Dashboard</span>
            </a>
        </li>
    `

    const telaUsuarios = `
        <li class="nav-item">
            <a href="./admin.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#636363" viewBox="0 0 256 256"><path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"></path></svg>
                <span>Usuários</span>
            </a>
        </li>
    `

    const telaAjuda = `
        <li class="nav-item">
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#636363" viewBox="0 0 256 256"><path d="M200.47,56.07A101.37,101.37,0,0,0,128.77,26H128A102,102,0,0,0,26,128v56a22,22,0,0,0,22,22H64a22,22,0,0,0,22-22V144a22,22,0,0,0-22-22H38.2A90,90,0,0,1,128,38h.68a89.71,89.71,0,0,1,89.13,84H192a22,22,0,0,0-22,22v40a22,22,0,0,0,22,22h26v2a26,26,0,0,1-26,26H136a6,6,0,0,0,0,12h56a38,38,0,0,0,38-38V128A101.44,101.44,0,0,0,200.47,56.07ZM64,134a10,10,0,0,1,10,10v40a10,10,0,0,1-10,10H48a10,10,0,0,1-10-10V134Zm118,50V144a10,10,0,0,1,10-10h26v60H192A10,10,0,0,1,182,184Z"></path></svg>
                <span>Ajuda</span>
            </a>
        </li>
    `

    const logoutBtn = `
        <li class="nav-item log-out-icon">
            <a onclick="limparSessao()">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                    <path
                        d="M118,216a6,6,0,0,1-6,6H48a6,6,0,0,1-6-6V40a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H54V210h58A6,6,0,0,1,118,216Zm110.24-92.24-40-40a6,6,0,0,0-8.48,8.48L209.51,122H112a6,6,0,0,0,0,12h97.51l-29.75,29.76a6,6,0,1,0,8.48,8.48l40-40A6,6,0,0,0,228.24,123.76Z">
                    </path>
                </svg> 
                <span>Sair</span>
            </a>
        </li>
    `

    const telaPulverizar = `
        <li class="nav-item">
            <a href="./fazendas.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#636363" viewBox="0 0 256 256"><path d="M208,34H182V24a6,6,0,0,0-12,0V34H86V24a6,6,0,0,0-12,0V34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H74V56a6,6,0,0,0,12,0V46h84V56a6,6,0,0,0,12,0V46h26a2,2,0,0,1,2,2V82H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V94H210V208A2,2,0,0,1,208,210Zm-50-58a6,6,0,0,1-6,6H134v18a6,6,0,0,1-12,0V158H104a6,6,0,0,1,0-12h18V128a6,6,0,0,1,12,0v18h18A6,6,0,0,1,158,152Z"></path></svg>
                <span>Agendar</span>
            </a>
        </li>
    `

    // VERIFICANDO O CARGO PRA ATRIBUIR AS TELAS
    if(cargo == "FINANCEIRO"){
        document.getElementById("nav-items-wrapper").innerHTML = `${homeFinanc} ${dashFinanc} ${telaAjuda} ${logoutBtn}`;
    } else if(cargo == "AGRONOMO"){
        document.getElementById("nav-items-wrapper").innerHTML = `${homeFinanc} ${telaPulverizar} ${telaAjuda} ${logoutBtn}`
    } else if(cargo == "ADMINISTRADOR"){
        document.getElementById("nav-items-wrapper").innerHTML = `${homeFinanc} ${telaPulverizar} ${dashFinanc} ${telaUsuarios} ${telaAjuda} ${logoutBtn}`
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
    window.location = "../pages/login.html";
}