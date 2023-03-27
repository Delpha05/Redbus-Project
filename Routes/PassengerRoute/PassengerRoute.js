const express = require('express');
const shortid = require('shortid');
const router = express.Router();

// Load passenger model
const passenger = require('../../Models/Passenger');

// @route GET api/passenger
// @description Get all passenger
// @access Public
router.get('/getAllPassengers', (req, res) => {
  passenger.find()
    .then(passenger => res.json(passenger))
    .catch(err => res.status(404).json({ msg: 'No passengers found' }));
});

// @route GET api/passenger/:id
// @description Get single passenger by id
// @access Public
// router.get('/getPassenger', async (req, res) => {
//     try{
//         const id = req.query.id;

//         if(!id){
//             res.status(400).send({ msg: 'Please enter a valid passenger ID'});
//         } else {
//             const pass = await passenger.findOne({passenger_id:id});
//             if(!pass){
//                 res.status(404).send({ msg: 'No passenger found' });
//             }else {
//                 res.status(200).send({message: pass});
//             }
            
//         }
//     } catch (err){
//         res.status(400).send({error:err.message});
//     }
  
// });
router.get('/getPassenger/:id', (req, res) => {
    const id = req.params.id;
        passenger.findOne({_id:id})
          .then(passenger => res.json(passenger))
          .catch(err => res.status(404).json({ msg: 'No passenger found' }));
});

// @route GET api/passenger
// @description add/save passenger
// @access Public
router.post('/addPassenger', async (req, res) => {
    try {
        const {passenger_fname, 
            passenger_lname, 
            passenger_email, 
            passenger_gender, 
            passenger_age, 
            passenger_phone} = req.body;
        if(!passenger_fname || !passenger_lname || !passenger_email || !passenger_gender || !passenger_age || !passenger_phone){
            return res.status(400).send({ msg: 'Please fill all the fields' });
        } else {
            const newPassenger = new passenger({
                passenger_id: shortid.generate(),
                passenger_fname : passenger_fname, 
                passenger_lname : passenger_lname, 
                passenger_email : passenger_email, 
                passenger_gender : passenger_gender, 
                passenger_age: passenger_age, 
                passenger_phone: passenger_phone
                
            });
            await newPassenger.save();
            res.status(200).send({msg:"Passenger details added successfully"});
        }
    } catch(err) {
        res.status(400).send({error:err});
    }
  });

// @route GET api/passenger/:id
// @description Update passenger
// @access Public
router.put('/updatePassenger', async (req, res) => {
    try{
        const id = req.query.id;
        console.log(req.body, id);
    passenger.findOneAndUpdate({passenger_id:id},req.body)
        .then(passenger => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: err.message })
        );
    } catch (err) {
        res.status(400).send({error:err.message});
    }
});

// @route GET api/passenger/:id
// @description Delete passenger by id
// @access Public
router.delete('/deletePassenger/:id', (req, res) => {
  passenger.findOneAndRemove(req.params.id)
    .then(passenger => res.json({ mgs: 'Passenger entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such passenger found' }));
});

module.exports = router;