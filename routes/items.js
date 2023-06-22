const items = require("./fakeDb");
const express = require('express');

const router = express.Router();

/** GET / => [item, ...] */

router.get('', (req, res, next) => {
  try {
    return res.json({ items });
  } catch (err) {
    return next(err)
  }
});

// POST /items - Add a new item

router.post('', (req, res, next) => {
  try {
    let newItem = (
      name: req.body.name,
      price: req.body.price
    );

    items.push(newItem);

    return res.json({ item: newItem });
  } catch (err) {
    return next(err)
  }
});

// GET /items/:name - Get a specific item by name

router.get('/:name', (req, res, next) => {
  try {
    let foundItem = items.find(item => item.name === req.params.name);

    if (foundItem) {
      return res.json({ item: foundItem });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }

  } catch (err) {
    return next(err)
  }
});

// PATCH /items/:name - Update a specific item by name

router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = items.find(item => item.name === req.params.name);

    if (foundItem) {
      foundItem.name = req.body.name;
      foundItem.price = req.body.price;
      return res.json({ item: foundItem });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }

  } catch (err) {
    return next(err)
  }
});

// DELETE /items/:name - Delete a specific item by name => "Removed" */

router.delete('/:name', (req, res, next) => {
  try {
    const name = req.params.name;
    const foundItem = items.find(item => item.name === name);

    if (foundItem) {
      Item.remove(name);
      return res.json({ message: 'Deleted' });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    return next(err);
  }
});

//   try {
//     Item.remove(req.params.name);
//     return res.json({ message: 'Deleted' });
//   } catch (err) {
//     return next(err)
//   }
// });

module.exports = router;
