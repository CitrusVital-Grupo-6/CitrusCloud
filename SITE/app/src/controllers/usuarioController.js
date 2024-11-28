var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                        email: resultadoAutenticar[0].email,
                                        nomeCompleto: resultadoAutenticar[0].nomeCompleto,
                                        senha: resultadoAutenticar[0].senha,
                                    });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cnpjEmpresa = req.body.cnpjEmpresaServer;
    var telefoneEmpresa = req.body.telefoneEmpresaServer;
    var nomeFunc = req.body.nomeFuncServer;
    var funcaoFunc = req.body.funcaoFuncServer;
    var cpfFunc = req.body.cpfFuncServer;
    var emailFunc = req.body.emailFuncServer;
    var senhaFunc = req.body.senhaFuncServer;

    usuarioModel.cadastrar(nomeEmpresa, cnpjEmpresa, telefoneEmpresa, nomeFunc, funcaoFunc, cpfFunc, emailFunc, senhaFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarPorEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;
    // let idEmpresa = 1;

    usuarioModel.listarPorEmpresa(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar usuários: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    // let idUsuario = 1;

    usuarioModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar usuários: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    let novoNome = req.body.nomeFunc;
    let novaFuncao = req.body.funcaoFunc;
    let novoCpf = req.body.cpfFunc;
    let novoEmail = req.body.emailFunc;

    usuarioModel.editarUsuario(novoNome, idUsuario, novaFuncao, novoCpf, novoEmail)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletarUsuario(req, res) {
    let idUsuario = req.params.idUsuario;

    usuarioModel.deletarUsuario(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    listarPorEmpresa,
    listarPorUsuario,
    editarUsuario,
    deletarUsuario
}