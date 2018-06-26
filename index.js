const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

const app = express();

//cria conexão com o banco de dados
//e a disponibiliza na variável req.db
app.use(expressMongoDb('mongodb://localhost/churros'));

//converte os dados presentes no corpo da requisição em JSON
//e os disponibiliza na variável req.body
app.use(bodyParser.json());

//adiciona o header Access-Control-Allow-Origin:*
//que libera acesso para essa API por qualquer domínio
app.use(cors());

// busca todos os sabores de churros
app.get('/churros', (req, res) => {
    req.db.collection('sabores').find().toArray((err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});

// busca um sabor de churro pelo id
app.get('/churro/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('sabores').findOne(query, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        if(!data){
            res.status(404).send();
            return;
        }

        res.send(data);
    });
});

//insere um novo sabor de churro
app.post('/churro', (req, res) => {
    //remove dados indesejados do body
    let churro = {
        sabor: req.body.sabor,
        recheio: req.body.recheio,
        cobertura: req.body.cobertura
    };

    // exemplo de validação de email
    // if(req.body.email.indexOf('@') == -1){
    //     res.status(400).send({mensagem: 'Email inválido'});
    //     return;
    // }

    req.db.collection('sabores').insert(churro, (err) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(req.body);
    });
});

// atualiza um sabor de churro pelo id
app.put('/churro/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    let churro = {
        sabor: req.body.sabor,
        recheio: req.body.recheio,
        cobertura: req.body.cobertura
    };

    req.db.collection('sabores').updateOne(query, churro, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});

// deleta um sabor de churro pelo id
app.delete('/churro/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('sabores').deleteOne(query, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});

app.listen(3000);