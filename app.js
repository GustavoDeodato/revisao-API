const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const bodyParserJSON = bodyParser.json()

const app = express()


app.use((request, response, next)=>{
    //permissão de acessi para quem irá criar a API
    response.header('Access-Control-Allow-Origin', '*')
    //permissão de acesso para os metodos da api
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTONS')
    //ativa as configurações do header para o cors 
    app.use(cors())

    next()
})

const controllerUsuarios = require('./controller/controllerUsuarios')

app.post('v1/lionbook/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dados = request.body

    let result = await controllerUsuarios.inserirUsuario(dados, contentType)

    response.status(result.status_code)
    result.json(result)
    
})

