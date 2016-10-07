const fs =require('fs');
const path = require('path');
const uuid = require('uuid');

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
    if (err) return res.status(400).send(err);
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
  if(err) return res.status(400).send(err);
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









