const {PrismaClient} = require('../../generated/prisma')
const prisma = new PrismaClient()

const insertlivro = async function (livro) {
    try {
        sql = `insert into tbl_livro(titulo, data_publicacao, quantidade, isbn) values(
        '${livro.titulo}',
        '${livro.data_publicacao}',
        '${livro.quantidade}',
        '${livro.isbn}'
        
        )`

        result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
        return false 
    } catch (error) {
        console.error
        return false
    }
}

const selectAllLivro = async function(){
    try {
        sql = `select * from tbl_livro order by desc`

        result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return true 
        else return false 
    } catch (error) {
        console.error
        return false 
    }
}
const updatelivro = async function (livro){
    try {
        let sql = `update tbl_livro set titulo = '${livro.titulo}',
                                        data_publicacao = '${livro.data_publicacao}',
                                        quantidade = '${livro.quantidade}',
                                        isbn = '${livro.isbn}'
                                         where id = ${livro.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
    } catch (error) {
        return false 
    }

}

//função para deletar livros 
const deletelivro = async function (id) {
    try {
        let sql = `delete from tbl_livro where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else 
        return false 
    } catch (error) {
        return false
    }
    
}

//buscar pelo id 
const selectByidlivro = async function(id){

    try {       
        let sql = `select * from tbl_livro where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
        return false 
    } catch (error) {
        return false 
    }
}
module.exports = {
    insertlivro,
    selectAllLivro,
    deletelivro,
    selectByidlivro,
    updatelivro
}