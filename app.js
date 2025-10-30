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
//Endpoint para retornar todas as usuarios 
app.get('v1/lionbook/usuario', cors(), async function(request, response){
    let resultusuario = await controllerUsuarios.listarUsuario()

    response.status(resultusuario.status_code)
    response.json(resultusuario)
} )

//Endpoint pesquisar usuario com base id
app.get('v1/lionbook/usuario:id', cors(), async function(request, response){

    let idusuario = request.params.id

    let resultusuario = await controllerUsuarios.buscarUsuario(idusuario)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})


//Endpoint pesquisar e deletar usuarios pelo id
app.delete('v1/lionbook/usuario:id', cors(), async function (request, response){
    let idusuario = request.params.id

    let resultusuario = await controllerUsuarios.excluirUsuario(idusuario)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

//Endpoint para atualizar uma usuario 
app.put('v1/lionbook/usuario:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idusuario = request.params.id

    //recebe os dados do corpo da requisição 
    let dadosbody = request.body

    let resultusuario = await controllerUsuarios.atualizarUsuario(idusuario, dadosbody, contentType)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

////////////////////////////////////////////// livros ///////////////////////////////////////////////
const ControllerLivros = require('./controller/controllerLivros')


app.post('v1/lionbook/livro', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dados = request.body

    let result = await ControllerLivros.inserirlivro(dados, contentType)

    response.status(result.status_code)
    result.json(result)
    
})
//Endpoint para retornar todas as usuarios 
app.get('v1/lionbook/livro', cors(), async function(request, response){
    let resultusuario = await ControllerLivros.listarlivro()

    response.status(resultusuario.status_code)
    response.json(resultusuario)
} )

//Endpoint pesquisar usuario com base id
app.get('v1/lionbook/livro:id', cors(), async function(request, response){

    let id = request.params.id

    let resultusuario = await ControllerLivros.buscarlivro(id)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})


//Endpoint pesquisar e deletar usuarios pelo id
app.delete('v1/lionbook/livro:id', cors(), async function (request, response){
    let id = request.params.id

    let resultusuario = await ControllerLivros.excluirlivro(id)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

//Endpoint para atualizar uma usuario 
app.put('v1/lionbook/livro:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let id = request.params.id

    //recebe os dados do corpo da requisição 
    let dadosbody = request.body

    let resultusuario = await ControllerLivros.atualizarlivro(id, dadosbody, contentType)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

app.listen(8080, function () {
    console.log('API aguardando requisições...')
})