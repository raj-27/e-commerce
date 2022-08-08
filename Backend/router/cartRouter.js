const router = require('express').Router();
let cart = require('./cartData')

router.get('/', (req, res) => {
    res.send(cart)
})

router.get('/:id', (req, res) => {
    const uniqueData = cart.find(item => item.id === Number(req.params.id));
    res.send(uniqueData);
})

router.post('/', (req, res) => {
    const data = req.body;
    let existingItem = cart.find(item => item.id === data.id)
    if (!existingItem) {
        cart.push(data);
        res.json(cart)
        console.log('Item  Present');
    } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        res.json(existingItem);
        console.log('Item Already Present');
    }
})

router.post('/:id', (req, res) => {
    let { quantity } = req.body;
    let id = req.params.id;
    console.log({ quantity, id });

    let product = cart.find(item => item.id === +id);
    product.quantity = quantity;
    res.json(product);
})

router.delete('/:id', (req, res) => {
    cart = cart.filter((product) => +req.params.id !== product.id);
    res.json(cart);
})


module.exports = router;