const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    }
}))
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    Post.findAll({order: [['id', 'DESC']]})
        .then((posts)=>{
            console.log(posts)
            res.render('home', {posts: posts, goCad: '/cad'})
        })
})

app.get('/cad', (req,res)=>{
    res.render('form', {backHome: '/'})
})

app.post('/add', (req,res)=>{
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch((erro)=>{
        res.send("Houve um erro "+erro)
    })
})

app.get('/deletar/:id', (req,res)=>{
    Post.destroy({where: {'id': req.params.id}})
    .then(()=>{
        res.redirect('/')
    })
    .catch(()=>{
        res.send("erro")
    })
})

app.listen(7171,()=>{
    console.log('ON')
})