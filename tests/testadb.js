const produtoDAO = require('../repository/ProdutoDAO'); // sempre coloque o ';' depois do 'require'

(async ()=> {
    const [produtos] = await produtoDAO.listarProdutos();
    console.log('Produtos: ' + JSON.stringify(produtos));
})();