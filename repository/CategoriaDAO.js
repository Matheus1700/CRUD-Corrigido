const db = require('../infra/db/mysqldb');

const salvarCategoria = async(categoria)=>{
const sqlInsert = 'INSERT INTO categoria(nome,descricao) VALUES (?,?)';
const values = [categoria.nome,categoria.descricao];
const con = await db.getConnection();
    return await con.execute(sqlInsert,values);
}

const listarCategorias = async()=>{
    const sqlSelect  = 'SELECT * FROM categoria';
    const con = await db.getConnection();
    return await con.execute(sqlSelect);
}

const removerCategoria = async(id)=>{
    const sqlDelete = 'DELETE FROM categoria WHERE id = ?'
    const values = [id]
    const con = await db.getConnection();
    await con.execute(sqlDelete, values)
}

const atualizarCategoria = async(categoria)=>{
    const sqlUpdate = 'UPDATE categoria SET nome = ?, descricao = ? WHERE id = ?';
    const values = [categoria.nome, categoria.descricao, categoria.id];
    const con = await db.getConnection();
    return await con.execute(sqlUpdate, values);
}

const getCategoriaById = async(id)=>{
    const sqlSelectedById = 'SELECT id, nome, descricao FROM categoria WHERE id = ?';
    const values = [id];
    const con = await db.getConnection();
    return await con.execute(sqlSelectedById, values);
}


module.exports = {salvarCategoria, listarCategorias, removerCategoria, atualizarCategoria, getCategoriaById}