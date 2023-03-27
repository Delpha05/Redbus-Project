const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./Routes/connection');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(express.json({extended:false}));
app.use(require('./Routes/UserRoute/UserRoute.js'));
app.use(require('./Routes/BusRoute/BusRoute'));
app.use(require('./Routes/PaymentRoute/PaymentRoute.js'));
app.use(require('./Routes/PassengerRoute/PassengerRoute.js'));
app.use(require('./Routes/ReservationRoute/ReservationRoute.js'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});