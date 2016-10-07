const fs =require('fs');
const path = require('path');
const uuid = require('uuid');
const _  = require('lodash');

const filename = path.join(__dirname, '../data/cards.json');

exports.getAll = function(cb) {
  fs.readFile(filename, (err, buffer)  => {
    if (err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
    }

    cb(null, data);
  })
}

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData);
  fs.writeFile(filename, json, cb);
}


exports.create = function(newItem, cb) {
  exports.getAll((err, items) => {
    if (err) return cb(err);
    newItem.id = uuid();
    items.push(newItem);

    exports.write(items, cb);
  });
}

exports.delete = function(deleteItem, cb){
  exports.getAll((err, cards) => {
    let newCards = cards.filter(card => {
      if (card.id !== deleteItem) {
        return card;
      }
    })
    exports.write(newCards, cb)
  })
}


exports.update = function(cardId, updateCard, cb) {
  exports.getAll((err, cards) => {
    let updatedCards = cards.map(card => {
      if(card.id === cardId) {
        card = updateCard;
        card.id = cardId;
      }
      return card;
    })
    exports.write(updatedCards, cb);
  })
}

exports.filterCategory = function(req, cb) {
  exports.getAll((err, cards)  => {
    if(err) return cb(err);
    let categories = req.params.category.split('&');
    let answer = req.query; 
    let filteredCategories = [];
       cards.forEach(card => {
        categories.forEach( category => {
          if(card.category === category) {
              filteredCategories.push(card);
          }
        }) //end of categories map
      })//end of filteredcategories map
    

      filteredCategories = _.shuffle(filteredCategories);
      let randomQuestion = filteredCategories[0];

      
      if (answer.answer === 'true') {
        
        cb(null, randomQuestion.answer)
       
      } else {
          
         cb(null, randomQuestion.question);
      } 
 
  })// end of getALl
}



//card starts off showing no answer
//second time that send is clicked, the answer will be added.
//Then on to the next question and so on.






