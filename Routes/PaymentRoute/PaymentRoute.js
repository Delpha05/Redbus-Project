const express = require('express');
const shortid = require('shortid');
const router = express.Router();

// Load payment model
const payment = require('../../Models/Payment');
const user = require('../../Models/User');

// @route GET api/payment
// @description Get all payment
// @access Public
router.get('/getAllPayments', (req, res) => {
  payment.find()
    .then(payment => res.json(payment))
    .catch(err => res.status(404).json({ msg: 'No payments found' }));
});

// @route GET api/payment/:id
// @description Get single payment by id
// @access Public
router.get('/getPayment', async (req, res) => {
    try {
        const id = req.query.id;
            // const name=req.query.name;

        if (!id) {
            res.status(400).send({err: "Please enter a valid user ID."});
        } else {

            let pay =  await payment.findOne({ payment_id:id });
                if (!pay) {
                    res.status(404).send({err: 'payment not found'});
                } else {
                    res.status(200).send({message: pay});
                }
        }

    } catch (error) {
        res.status(400).send({err: error.message})
    }
});

// @route GET api/payment
// @description add/save payment
// @access Public
router.post('/addPayment', async (req, res) => {
try{
    const {payment_amount, payment_date, passenger_id} = req.body;
    console.log(req.body);
    if(!payment_amount || ! passenger_id){
        res.status(404).send({ err: "Please enter all fields" });
    } else if(!payment_date && payment_amount && passenger_id){
        const newPayment = new payment({
            payment_id: shortid.generate(),
            payment_amount: payment_amount,
            payment_date: Date.now(),
            passenger_id: passenger_id
         });

         await newPayment.save();
         res.status(200).send({ msg: 'Payment added successfully' });
    } else if(payment_date && payment_amount && passenger_id){
        const newPayment = new payment({
            payment_id: shortid.generate(),
            payment_amount: payment_amount,
            payment_date: payment_date,
            passenger_id: passenger_id
         });

         await newPayment.save();
         res.status(200).send({ msg: 'Payment added successfully' });
    }

} catch(err){
    res.status(400).send({ error: err});
}
});

// @route GET api/payment/:id
// @description Update payment
// @access Public
router.put('/updatePayment', (req, res) => {
    try{
        const id = req.query.id;
    payment.findOneAndUpdate({payment_id:id}, req.body)
        .then(payment => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: err.message  })
        );
    } catch(err){
        res.status(400).json({ error: err.message  })
    }
});

// @route GET api/payment/:id
// @description Delete payment by id
// @access Public
router.delete('/deletePayment/:id', (req, res) => {
  payment.findOneAndRemove(req.params.id)
    .then(payment => res.json({ mgs: 'Payment entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such payment found' }));
});

module.exports = router;