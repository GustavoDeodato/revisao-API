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

module.exports = {
    insertUsuario,
    selectAllUsuario
}