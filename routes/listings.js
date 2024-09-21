const express = require('express');
const auth = require('../middleware/auth');
const Listing = require('../models/Listing');
const router = express.Router();

// Create Listing
router.post('/', auth, async (req, res) => {
    const { tripDetails, costs, savingOptions } = req.body;
    const newListing = new Listing({ tripDetails, costs, savingOptions });

    try {
        const listing = await newListing.save();
        res.json(listing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Listing by ID
router.get('/:id', async (req, res) => {
  try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) return res.status(404).json({ msg: 'Listing not found' });
      res.json(listing);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});


// Update Listing
router.put('/:id', auth, async (req, res) => {
    const { tripDetails, costs, savingOptions } = req.body;

    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, { tripDetails, costs, savingOptions }, { new: true });
        res.json(listing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Listing
router.delete('/:id', auth, async (req, res) => {
    try {
        await Listing.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Listing removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
