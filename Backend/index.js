const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const cartRoute = require('./router/cartRouter')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cartRoute);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});