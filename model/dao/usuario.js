const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient



const insertUsuario = async function (usuario) {
    try {
        sql = `insert into tbl_usuario(login, senha) values(
        '${usuario.login}',
        '${usuario.senha}'
        
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

const selectAllUsuario = async function(){
    try {
        sql = `select * from tbl_usuario order by desc`

        result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return true 
        else return false 
    } catch (error) {
        console.error
        return false 
    }
}
const updateusuario = async function (usuario){
    try {
        let sql = `update tbl_usuario set login = '${usuario.login}',
                                        senha = '${usuario.senha}',
                                         where id = ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
    } catch (error) {
        return false 
    }

}

//função para deletar usuarios 
const deleteusuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`

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
const selectByidusuario = async function(id){

    try {       
        let sql = `select * from tbl_usuario where id = ${id}`

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
    insertUsuario,
    selectAllUsuario,
    deleteusuario,
    selectByidusuario,
    updateusuario
}