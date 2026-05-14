var express = require('express');
var router = express.Router();

const Items = require('../models/items');

router.get('/', async function(req, res, next) {

  try {

    const items = await Items.find();

    console.log(items);

    res.render('index', {
      title: 'Stored List',
      items: items
    });

  } catch(error) {

    console.log(error);
    next(error);

  }

});

module.exports = router;