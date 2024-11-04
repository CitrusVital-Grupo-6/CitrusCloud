var fazendaModel = require("../models/fazendaModel");

function adicionarFazenda(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFazenda = req.body.nomeServer
    var cidade = req.body.cidadeServer;


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

    fazendaModel.consultarEndereco(cidade).then(
        function (resultado) {

            if (resultado.length > 0) {


                fazendaModel.adicionarFazenda(nomeFazenda, resultado[0].idEndereco).then(

                    function (resultado2) {
                        console.log(resultado2);
                        res.status(200).json(resultado2);

                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
                    }
                );

            } else {

                fazendaModel.inserirCidade(cidade).then(

                    function (resultado3) {

                        fazendaModel.consultarEndereco(cidade).then(
                            function (resultado) {

                                fazendaModel.adicionarFazenda(nomeFazenda, resultado[0].idEndereco).then(

                                    function (resultado6) {
                                        console.log(resultado6);
                                        res.status(200).json(resultado6);

                                    }
                                ).catch(
                                    function (erro) {
                                        console.log(erro);
                                        console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
                                    }
                                );

                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
                            }
                        );
                    }


                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
                    }
                );


            }

        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
        }
    );


    //fazendaModel.adicionarFazenda(nomeFazenda, resultado[0].idEndereco).then(

    //  function (resultado4) {
    //    console.log(resultado4);
    //  res.status(200).json(resultado4);

    //}
    //).catch(
    //  function (erro) {
    //    console.log(erro);
    //  console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
    //}
    // );

}


module.exports = {
    adicionarFazenda
}