const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use(expressMongoDb('mongodb://localhost/churros'));
app.use(bodyParser.json());
app.use(cors());

app.get('/churros', (req, res) => {
    req.db.collection('sabores').find().toArray((err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});

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

app.put('/churro/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('sabores').updateOne(query, req.body, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});

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

app.post('/churro', (req, res) => {
    req.db.collection('sabores').insert(req.body, (err) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(req.body);
    });
});

app.listen(3000);