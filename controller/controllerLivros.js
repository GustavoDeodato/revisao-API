const message = require('../modulo/config.js')

//Import do DAO para realizar o CRUD no banco de dados 
const livroDAO = require('./../model/dao/livro.js')

//import da controller banda para facilitar o relacionamento 
const controllerBanda = require('../banda/controllerBanda.js')


//função para inserir uma livro 
const inserirlivro = async function (livro, contentType){

    try {

        if(String(contentType).toLowerCase() == 'application/json'){
            if(livro.titulo == '' || livro.titulo == null || livro.titulo == undefined || livro.titulo.length > 100 || 
                livro.quantidade == ''|| livro.quantidade == null ||livro.quantidade == undefined || isNaN(livro.quantidade) ||
               livro.data_publicacao == '' || livro.data_publicacao == null || livro.data_publicacao == undefined || livro.data_publicacao.length > 10 || 
                livro.isbn == '' || livro.isbn == undefined || livro.isbn == null || livro.isbn.length > 45
            ){
                return message.ERROR_CONTENT_TYPE
            }else{
                //encaminhando os dados da livro para o DAO realizar o insert no BD 
                let resultlivro = await livroDAO.insertlivro(livro)
        
                if(resultlivro)
                    return message.SUCESS_CREATED_ITEM//201
        
                else 
                    return message.ERROR_INTERNAL_SERVER_MODEL///500
            }
        
        }else{
            return message.ERROR_CONTENT_TYPE
        }
            
        }catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
   
}

//função para atualizar uma livro 
const atualizarlivro = async function (id, livro, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(livro.titulo == '' || livro.titulo == null || livro.titulo == undefined || livro.titulo.length > 100 || 
                livro.quantidade == ''|| livro.quantidade == null ||livro.quantidade == undefined || livro.quantidade.length > 8 ||
                livro.data_publicacao == '' || livro.data_publicacao == null || livro.data_publicacao == undefined || livro.data_publicacao.length > 10 || 
                livro.isbn == '' || livro.isbn == undefined || livro.isbn == null || livro.isbn.length > 45

                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                //verificação existancia ID no BD
                    let result = await livroDAO.selectByidlivro(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update 

                            //adciona o atributi do id no json com os dados recebidos no corpo da requisição 
                            livro.id = id 
                                let resultlivro = await livroDAO.updatelivro(livro)
                                if(resultlivro){
                                    return message.SUCESS_UPDATE_ITEM
                                }else{
                                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                                }
                        }else{
                            return message.ERROR_NOT_FOUND//404
                        }
                    }
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para excluir uma livro 
const excluirlivro = async function (id){
    try {
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS//400

        }else{
            //verificando a existencia do id antes de excluir 
            let resultlivro = await livroDAO.selectByidlivro(id)

            if(resultlivro != false || typeof(resultlivro) == 'object'){
                if(resultlivro.length > 0){
                    //delete
                    let result = await livroDAO.deletelivro(id)

                    if(result)
                        return message.SUCESS_DELETE_ITEM//200
                    else 
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                message.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//função para retornar uma lista de livros 
const listarlivro = async function (){

    try {

        let arraylivros = []

        let dadoslivro = {}

        //Chama a função para retornar a livro no banco de dados 
        let resultlivro = await livroDAO.selectAllLivro()

        if(resultlivro != false || typeof(resultlivro) == 'object' ){
            if(resultlivro.length > 0){
                //cria um json para colocar o array de livros 
                dadoslivro.status = true
                dadoslivro.status_code = 200,
                dadoslivro.items = resultlivro.length

                //Percorrer o array de livros para pegar cada ID de bandas
                // e descobrir quais os dados da banda
                
             
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemlivro of resultlivro){
                 //Busca os dados da classificação na controller de classificacao
                    let dadosBanda = await controllerBanda.buscarBanda(itemlivro.id_banda)

                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemlivro.bandas = dadosBanda.bandas

                     //Remover um atributo do JSON
                    delete itemlivro.id_banda

                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arraylivros.push(itemlivro)
                }

                dadoslivro.musics = arraylivros
                return dadoslivro
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }



      
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500   
        
    }
   
}

//função para retornar uma livro pelo id 
const buscarlivro = async function (id){
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
           return message.ERROR_REQUIRED_FIELDS //400
        }else { 
             let dadoslivro = {}

        //Chama a função para retornar a livro no banco de dados 
        let resultlivro = await livroDAO.selectByidlivro(id)

        if(resultlivro != false || typeof(resultlivro) == 'object'){
            if(resultlivro.length > 0){
                //cria um json para colocar o array de livros 
                dadoslivro.status = true
                dadoslivro.status_code = 200,
                dadoslivro.musics = resultlivro
                return dadoslivro
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }}

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500   
        
    }
   
}

module.exports = {
    inserirlivro,
    atualizarlivro,
    excluirlivro,
    listarlivro,
    buscarlivro
}