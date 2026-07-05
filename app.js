const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Simulação de banco de dados
let posts = [];

// Rota principal: mostra o editor e o feed
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Salvar nova postagem
app.post('/postar', (req, res) => {
    const { conteudo } = req.body;
    const novoPost = {
        id: Date.now(),
        conteudo: conteudo,
        data: new Date().toLocaleDateString()
    };
    posts.unshift(novoPost); // Adiciona no início do feed
    res.redirect('/');
});

// Deletar postagem
app.post('/deletar/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
