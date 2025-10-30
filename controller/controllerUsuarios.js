const usuarioDAO = require('../model/dao/usuario.js')

const message = require('../modulo/config.js')

const insertUsuario = async function(contentType, usuario){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(usuario.login == ''|| usuario.login == null||usuario.login == undefined|| usuario.login.Length > 45 

            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{


            }
            }
    } catch (error) {
        
    }
    
}