const db = require('../infra/db/mysqldb');

const salvarProduto = async(produto)=>{
    const sqlInsert = 'INSERT INTO produto (nome, descricao, id_categoria) VALUES (?, ?, ?)';
    const values = [produto.nome, produto.descricao, produto.id_categoria];
    const con = await db.getConnection();
        return await con.execute(sqlInsert, values);
}

const listarProdutos = async()=>{
    const sqlSelect = "SELECT p.id, p.nome, p.descricao, c.nome as 'categoria' FROM produto p INNER JOIN categoria c";
    const con = await db.getConnection();
    return await con.execute(sqlSelect);
}

const removerProduto = async(id)=>{
    const sqlDelete = 'DELETE FROM produto WHERE id = ?'
    const values = [id]
    const con = await db.getConnection();
    await con.execute(sqlDelete, values)
}

const atualizarProduto = async(produto)=>{
    const sqlUpdate = 'UPDATE produto SET nome = ?, descricao = ?, id_categoria = ? WHERE id = ?';
    const values = [produto.nome, produto.descricao, produto.id_categoria, produto.id];
    const con = await db.getConnection();
    return await con.execute(sqlUpdate, values);
} 

const getProdutoById = async(id)=>{
    const sqlSelectedById = 'SELECT id, nome, descricao, id_categoria FROM produto WHERE id = ?';
    const values = [id];
    const con = await db.getConnection();
    return await con.execute(sqlSelectedById, values);
}


module.exports = {salvarProduto, listarProdutos, removerProduto, atualizarProduto, getProdutoById}