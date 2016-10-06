const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Card = require('./models/Card');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES

app.get('/cards', (req, res) => {
  Card.getAll(err)
});

app.post('/cards', (req,res) => {

  console.log('req.body', req.body);

  Card.create(req.body, err => {
    if (err) return res.status(400).send(err);
    res.send(`new card was added: \n ${JSON.stringify(req.body)}`);
  })

});




app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})