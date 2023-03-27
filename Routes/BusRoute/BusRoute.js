const express = require('express');
const shortid = require('shortid');
const router = express.Router();

// Load Bus model
const Bus = require('../../Models/Bus');

// @route GET api/bus
// @description Get all bus
// @access Public
router.get('/getAllBus', (req, res) => {
  Bus.find()
    .then(bus => res.json(bus))
    .catch(err => res.status(404).json({ msg: 'No Buses found' }));
});

// @route GET api/bus/:id
// @description Get single book by id
// @access Public
router.get('/getBus', async (req, res) => {
    try {
        const busName = req.query.name;

        if (!busName) {
            res.status(400).send({err: "Please enter a valid bus name."});
        } else {

            const bus = await Bus.findOne({ name: busName });
                if (!bus) {
                    res.status(404).send({err: 'Bus not found'});
                } else {
                    res.status(200).send({message: bus});
                }
        }

    } catch (error) {
        res.status(400).send({err: error.message})
    }
})

// @route GET api/bus
// @description add/save book
// @access Public
router.post('/registerBus', async(req, res) => {
    try {
        const {bus_name, bus_number, bus_seats, price} = req.body;
        console.log(req.body);
        if (!bus_name ||!bus_number ||!bus_seats ||!price) {
            res.status(400).send({err: "Please enter all fields."});
        } else {
            const newBus = new Bus({
                bus_id: shortid.generate(),
                bus_name: bus_name,
                bus_number: bus_number,
                bus_seats: bus_seats,
                price: price
            });

            await newBus.save();

            res.status(200).send({message: "Bus entry created successfully."});
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
});

// @route GET api/bus/:id
// @description Update bus
// @access Public
router.put('/updateBus', (req, res) => {
    try{
        const id = req.query.id;
        Bus.findOneAndUpdate({bus_id:id}, req.body)
            .then(bus => res.json({msg: 'Bus data updated successfully' }))
            .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
            );
    } catch (err){
        res.status(400).json({ error: err.message })
    }
});

// @route GET api/bus/:id
// @description Delete book by id
// @access Public
router.delete('/deleteBus/:id', (req, res) => {
  Bus.findOneAndRemove(req.params.id)
    .then(bus => res.json({ mgs: 'Bus entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such  bus' }));
});

module.exports = router;