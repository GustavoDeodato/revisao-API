//import das bibliotecas para a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Cria um objeto para o body do tipo json 
const bodyParserJSON = bodyParser.json()

//incializando a utilização do express através da variavel app
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// request = significa a chegada de dados na api 
// response = saida de dados na api 
// next = 
app.use((request, response, next)=>{
    //permissão de acessi para quem irá criar a API
    response.header('Access-Control-Allow-Origin', '*')
    //permissão de acesso para os metodos da api
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
   
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

app.listen(8080, function () {
    console.log('API aguardando requisições...')
})