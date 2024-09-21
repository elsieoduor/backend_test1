const express = require('express');
const auth = require('../middleware/auth');
const Initiative = require('../models/Initiative');
const router = express.Router();

// Create Initiative
router.post('/', auth, async (req, res) => {
    const { title, description, goals, cta } = req.body;
    const newInitiative = new Initiative({ title, description, goals, cta });

    try {
        const initiative = await newInitiative.save();
        res.json(initiative);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Initiatives
router.get('/', async (req, res) => {
    try {
        const initiatives = await Initiative.find();
        res.json(initiatives);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update Initiative
router.put('/:id', auth, async (req, res) => {
    const { title, description, goals, cta } = req.body;

    try {
        const initiative = await Initiative.findByIdAndUpdate(req.params.id, { title, description, goals, cta }, { new: true });
        res.json(initiative);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Initiative
router.delete('/:id', auth, async (req, res) => {
    try {
        await Initiative.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Initiative removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// Get Initiative by ID
router.get('/:id', async (req, res) => {
  try {
      const initiative = await Initiative.findById(req.params.id);
      if (!initiative) return res.status(404).json({ msg: 'Initiative not found' });
      res.json(initiative);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});


module.exports = router;
