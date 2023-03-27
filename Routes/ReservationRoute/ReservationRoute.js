const express = require('express');
const shortid = require('shortid');
const router = express.Router();

// Load reservation model
const reservation = require('../../Models/Reservation');

// @route GET api/reservation
// @description Get all reservation
// @access Public
router.get('/getAllReservations', (req, res) => {
    reservation.find()
    .then(reservation => res.json(reservation))
    .catch(err => res.status(404).json({ msg: 'No reservations found' }));
});

// @route GET api/reservation/:id
// @description Get single reservation by id
// @access Public
router.get('/getReservation', async (req, res) => {
    try {
        const id = req.query.id;
            // const name=req.query.name;

        if (!id) {
            res.status(400).send({err: "Please enter a valid reservation ID."});
        } else {

            let pay =  await reservation.findOne({ reservation_id:id });
                if (!pay) {
                    res.status(404).send({err: 'reservation not found'});
                } else {
                    res.status(200).send({message: pay});
                }
        }

    } catch (error) {
        res.status(400).send({err: error.message})
    }
});

// @route GET api/reservation
// @description add/save reservation
// @access Public
router.post('/addReservation', async (req, res) => {
try{
    const {passenger_id, 
        bus_id, 
        departure_time, 
        arrival_time,
        source_station,
        destination_station,
        reservation_date} = req.body;
    console.log(req.body);
    if(!passenger_id || !bus_id || !departure_time || !arrival_time || !source_station || !destination_station){
        res.status(404).send({ err: "Please enter all fields" });
    } else if(!reservation_date){
        const newReservation = new reservation({
            reservation_id: shortid.generate(),
            passenger_id: passenger_id,
            bus_id: bus_id,
            departure_time: departure_time,
            arrival_time: arrival_time,
            source_station: source_station,
            destination_station : destination_station,
            reservation_date: Date.now()
         });

         await newReservation.save();
         res.status(200).send({ msg: 'Reservation added successfully' });
    } else if(reservation_date){
        const newReservation = new reservation({
            reservation_id: shortid.generate(),
            passenger_id: passenger_id,
            bus_id: bus_id,
            departure_time: departure_time,
            arrival_time: arrival_time,
            source_station: source_station,
            destination_station : destination_station,
            reservation_date: reservation_date
         });

         await newReservation.save();
         res.status(200).send({ msg: 'Reservation added successfully' });
    }

} catch(err){
    res.status(400).send({ error: err});
}
});

// @route GET api/reservation/:id
// @description Update reservation
// @access Public
router.put('/updateReservation', (req, res) => {
    try{
        const id = req.query.id;
    reservation.findOneAndUpdate({reservation_id:id}, req.body)
        .then(reservation => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: err.message  })
        );
    } catch(err){
        res.status(400).json({ error: err.message  })
    }
});

// @route GET api/reservation/:id
// @description Delete reservation by id
// @access Public
router.delete('/deleteReservation/:id', (req, res) => {
  reservation.findOneAndRemove(req.params.id)
    .then(reservation => res.json({ mgs: 'reservation entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such reservation found' }));
});

module.exports = router;