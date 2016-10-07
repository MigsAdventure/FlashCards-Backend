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
  Card.getAll((err, cards) => {
    if (err) return res.status(400).send(err);
    res.send(cards);
  })
});

app.get('/cards/category/:category', (req,res) => {
  let categories = req.params.category.split('&');
  console.log('query: ',req.query);
  Card.filterCategory(categories, (err,randomQuestion) => {
    if (err) return res.status(400).send(err);   
    res.send(randomQuestion.question);

  });
  // console.log('category: ', categories )
})



app.post('/cards', (req,res) => {
  Card.create(req.body, err => {
    if (err) return res.status(400).send(err);
    res.send(`new card was added: \n ${JSON.stringify(req.body)}`);
  })
});


app.delete('/cards/:id', (req, res) => {
  let deleteCard = req.params.id;
  Card.delete(deleteCard,err => {
  if(err) return res.status(400).send(err);
 });
 res.send('deleted card');
}) 


app.put('/cards/:id', (req,res) => {
  let cardId = req.params.id;
  let updateCard = req.body;
  Card.update(cardId,updateCard, err => {
    if(err) return res.status(400).send(err);
  })
  res.send('updated cards')
})


app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})

