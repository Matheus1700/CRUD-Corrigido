const express = require('express');
var exphbs  = require('express-handlebars');
const {Categoria} = require('./model/Categoria');
const {Produto} = require('./model/Produto');
const categoriaDAO = require('./repository/CategoriaDAO');
const produtoDAO = require('./repository/ProdutoDAO');
const res = require('express/lib/response');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname+'/public'));

// as minhas funcoes viraram isso que ta dentro dos 'get's e dos 'post's
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main', 
    extname:'.hbs',
    helpers: { //pode tirar o helpers depois
        if_eq: function(a, b, opts) {
            if (a==b){
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
        }
    }    
}));


app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.render('main',{layout:'home'});
});

app.get('/categorias',async (req, res)=>{  //esse é oq vai listar
    const [categorias] = await categoriaDAO.listarCategorias();
    console.log('Categorias: '+categorias);
    res.render('main',{layout:'categorias/listar', categorias});
})

app.get('/categorias/novo', async(req,res)=>{  //esse é o FORMS
    console.log('cadastrar nova categoria');
    res.render('main',{layout:'categorias/form'});
});

app.post('/categorias/cadastrar', async(req,res)=>{ //esse é o o que vai postar  (nao tenho acesso)
        const categoria = new Categoria();
        categoria.nome = req.body.nome;
        categoria.descricao = req.body.descricao;
        console.log(`Nome: ${categoria.nome} e Descrição: ${categoria.descricao}`);

        if (req.body.id) { //se o id ja existe
            categoria.id = req.body.id;
            await categoriaDAO.atualizarCategoria(categoria);
        } else {
            await categoriaDAO.salvar(categoria);
        }
        
        res.redirect('/categorias')
})

app.get('/categorias/remover', async(req, res)=>{
    console.log(req.query)
    const id = req.query.id; // pegando o id de listar.hbs
    await categoriaDAO.removerCategoria(id) // falta essa funcao em categoriaDAO
    res.redirect('/categorias')
})

app.get('/categorias/editar', async(req, res)=>{
    const [categorias] = await categoriaDAO.getCategoriaById(req.query.id);
    console.log('cats ' +JSON.stringify(categorias));
    const categoria = categorias[0];
    res.render('main', {layout: 'categorias/form', categoria});
})



// daqui pra baixo é o CRUD de produto
app.get('/produtos', async (req, res)=>{
    const [produtos] = await produtoDAO.listarProdutos();
    console.log('Produtos: '+produtos);
    res.render('main',{layout:'produtos/listar', produtos});
});

app.get('/produtos/novo', async(req, res)=>{
    console.log('Cadastrar Novo produto');
    res.render('main', {layout:'produtos/form'});
});

app.post('/produtos/cadastrar', async(req, res)=>{
    const produto = new Produto();
    produto.nome = req.body.nome
    produto.descricao = req.body.descricao
    produto.id_categoria = req.body.id_categoria
    
    console.log("Id de categoria: " + produto.id_categoria)

    if (req.body.id) {
        produto.id = req.body.id;
        await produtoDAO.atualizarProduto(produto);
    } else {
        await produtoDAO.salvarProduto(produto);
    }

    res.redirect('/produtos')
})

app.get('/produtos/remover', async(req, res)=>{
    console.log(req.query)
    const id = req.query.id
    await produtoDAO.removerProduto(id);
    res.redirect('/produtos')
})

app.get('/produtos/editar', async(req, res)=>{
    const [produtos] = await produtoDAO.getProdutoById(req.query.id);
    const produto = produtos[0];
    res.render('main', {layout: 'produtos/form', produto});
})


app.listen('9000',()=>{
    console.log('Up and Running!');
});