const usuarioDAO = require('../model/dao/usuario.js')

const message = require('../modulo/config.js')

const inserirUsuario = async function (Usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(Usuario.login == ''|| Usuario.login == null||Usuario.login == undefined|| Usuario.login.Length > 45 ||
                Usuario.senha == '' || Usuario.senha == undefined || Usuario.senha.Length > 45

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultUsuario = await usuarioDAO.insertUsuario(Usuario)

                if(resultUsuario)
                    return message.SUCESS_CREATED_ITEM//201
                else 
                    return message.ERROR_INTERNAL_SERVER_MODEL///500
            }}else{
                        return message.ERROR_CONTENT_TYPE          
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const atualizarUsuario = async function  (id, Usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(Usuario.login == '' || Usuario.login == null || Usuario.login == undefined || Usuario.login.length > 45 || 
                Usuario.senha == '' || Usuario.senha == null || Usuario.senha == undefined || Usuario.senha.length > 45 ||
                id == '' || id == null || id == undefined || isNaN(id)
                 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                    let result = await usuarioDAO.selectByidusuario(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                        
                            Usuario.id = id 
                                let resultUsuario = await usuarioDAO.updateusuario(Usuario)
                                if(resultUsuario){
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

//função para deletar uma bandas 
const excluirUsuario = async function (id){

    try {
          if(id == '' || id == null || id == undefined || isNaN(id)){
                    return message.ERROR_REQUIRED_FIELDS//400
          }else{
             
            let resultUsuario = await usuarioDAO.selectByidusuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    //delete

                    result = await usuarioDAO.deleteusuario(id)

                    if(result)
                        return message.SUCESS_DELETE_ITEM//200
                    else 
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }else{
                    return message.ERROR_NOT_FOUND//404
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
          }



    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }

}

// função para mostrar todas as bandas
const listarUsuario = async function (){

    try {
        let dadosUsuarios = {}

        let resultUsuarios = await usuarioDAO.selectAllUsuario()

         if(resultUsuarios != false || typeof(resultUsuarios) == 'object' ){
                    if(resultUsuarios.length > 0){
                        dadosUsuarios.status = true
                        dadosUsuarios.status_code = 200,
                        dadosUsuarios.items = resultUsuarios.length
                        dadosUsuarios.Usuarios = resultUsuarios
                        return dadosUsuarios
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
//função para buscar uma banda pelo ID 
const buscarUsuario = async function (id){
    try {

         if(id == '' || id == undefined || id == null || isNaN(id)){
                   return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let dadosUsuario = {}

                    resultUsuario = await usuarioDAO.selectByidusuario(id)

                        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                            if(resultUsuario.length > 0 ){
                            dadosUsuario.status = true,
                            dadosUsuario.status_code = 200, 
                            dadosUsuario.instrumentos = resultUsuario
                            return dadosUsuario
                            }else{
                               return message.ERROR_NOT_FOUND//404
                            }                           
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL//500
                        }


                }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
}
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    buscarUsuario,
    listarUsuario
}