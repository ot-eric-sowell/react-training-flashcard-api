const express = require('express');
const uuid = require('node-uuid');

const router = express.Router();

const sets = {}

function addSampleData() {
  const setId = '6505a286-05e9-4eab-a063-acd018b511b6';

  sets[setId] = {
    id: '6505a286-05e9-4eab-a063-acd018b511b6',
    name: 'Latin Vocab',
    description: 'This is a sample vocab set of Latin words',
    cards: [
      { id: 'be8ff08c-937c-4ca4-af68-0f709dd2534f', correctCount: 1, incorrectCount: 3, front: 'gladius', back: 'sword' },
      { id: 'ee2c6d82-6719-4eb1-a094-7a34cf84a9ab', correctCount: 6, incorrectCount: 8, front: 'imperator', back: 'general' },
      { id: '42cb43c8-6e4e-4e8b-9cec-14d1b45572f4', correctCount: 0, incorrectCount: 0, front: 'spelunca', back: 'cave' },
      { id: '2207c70f-329d-4bd9-aa76-c0846758b471', correctCount: 2, incorrectCount: 3, front: 'aqua', back: 'water' },
      { id: 'c7dada3c-7865-4450-ae71-642dbeeb243c', correctCount: 3, incorrectCount: 4, front: 'bos', back: 'cow' },
      { id: 'f5971033-013c-4d18-808f-03b18ce8e8c3', correctCount: 12, incorrectCount: 4, front: 'mons', back: 'mountain' },
      { id: 'a9a30f6e-5852-49a0-abf0-e62327f8928f', correctCount: 4, incorrectCount: 1, front: 'flumen', back: 'stream' },
      { id: '7178c8bf-266c-44cf-9cf1-71a48f52082e', correctCount: 3, incorrectCount: 5, front: 'puella', back: 'girl' },
      { id: '10837a40-173c-40c2-a3bc-72884e57ea7a', correctCount: 6, incorrectCount: 3, front: 'fur', back: 'thief' },
      { id: '5563b939-67a7-4adb-b6a8-73aa3d9239cf', correctCount: 2, incorrectCount: 1, front: 'furcifer', back: 'jerkface' },
      { id: '7bcf1e5b-ecb3-435e-9aef-317a136ec6c4', correctCount: 0, incorrectCount: 4, front: 'assus', back: 'roasted' },
    ]
  };

  const secondSetId = uuid.v4();

  sets[secondSetId] = {
    id: secondSetId,
    name: 'The Seleucid Dynasty',
    description: 'The first five, because who doesn\'t want to learn about those guys?',
    cards: [
      { id: '9c1d8d32-5855-44d2-a1ce-af75b6f637d2', correctCount: 6, incorrectCount: 3, front: 'Seleucus I Nicator', back: '306-281 BC' },
      { id: '29d34e06-0c5b-4661-bd98-f672f67f3bd0', correctCount: 6, incorrectCount: 3, front: 'Antiochus I Soter', back: '281-261 BC' },
      { id: 'c64a9960-049c-4a58-8cd6-e06f8021dbf5', correctCount: 6, incorrectCount: 3, front: 'Antiochus II Theos', back: '261-246 BC' },
      { id: '7789ca00-fe3c-48c9-93e6-809118b3e27d', correctCount: 6, incorrectCount: 3, front: 'Seleucus II Callinicus', back: '246-225 BC' },
      { id: '1905bef5-fdf9-4358-ab7c-b36fe4f5d0cd', correctCount: 6, incorrectCount: 3, front: 'Seleucus III Ceraunus', back: '225-223 BC' },
    ]
  }

}

//comment this out to not have sample data...obviously.
addSampleData();








router.get('/api/sets', (req, res) => {
  var setArray = [];
  for (var key in sets) {
    setArray.push(sets[key]);
  }

  res.send({
    sets: setArray
  });

});

router.post('/api/sets', (req, res) => {
  var set = {
    name: req.body.name,
    description: req.body.description,
    cards: [],
    id: uuid.v4()
  }
  sets[set.id] = set;

  res.send(set);
});

router.delete('/api/sets/:setId', (req, res) => {

  if (sets[req.params.setId] === undefined) {
    res.sendStatus(404);
    return;
  }

  delete sets[req.params.setId];
  res.sendStatus(204);
});

router.post('/api/sets/:setId/card', (req, res) => {
  console.log('post body', req.body);

  const set = sets[req.params.setId];
  if (set === undefined) {
    res.sendStatus(404);
    return;
  }

  var card = {
    id: uuid.v4(),
    front: req.body.front,
    back: req.body.back,
    correctCount: 0,
    incorrectCount: 0
  };

  set.cards.push(card);

  res.send(card);
});

router.delete('/api/sets/:setId/card/:cardId', (req, res) => {
  console.log('attempting to delete', req.params);

  const set = sets[req.params.setId];
  if (set === undefined) {
    res.sendStatus(404);
    return;
  }

  const cardId = req.params.cardId;
  const index = set.cards.findIndex((x) => x.id === cardId);
  if (index === undefined) {
    res.sendStatus(404);
    return;
  }
  set.cards.splice(index, 1);

  res.sendStatus(204);
});


router.post('/api/sets/:setId/card/:cardId/incorrect', (req, res) => {
  const set = sets[req.params.setId];
  if (set === undefined) {
    res.sendStatus(404);
    return;
  }

  const cardId = req.params.cardId;
  const index = set.cards.findIndex((x) => x.id === cardId);
  if (index === undefined) {
    res.sendStatus(404);
    return;
  }
  set.cards[index].incorrectCount++;

  res.send(set.cards[index]);
});

router.post('/api/sets/:setId/card/:cardId/correct', (req, res) => {
  const set = sets[req.params.setId];
  if (set === undefined) {
    res.sendStatus(404);
    return;
  }

  const cardId = req.params.cardId;
  const index = set.cards.findIndex((x) => x.id === cardId);
  if (index === undefined) {
    res.sendStatus(404);
    return;
  }
  set.cards[index].correctCount++;

  res.send(set.cards[index]);
});


module.exports = router;
