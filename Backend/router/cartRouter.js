const router = require("express").Router();
let cart = require("./cartData");

router.get("/", (req, res) => {
    res.send(cart);
});

router.get("/:id", (req, res) => {
    const uniqueData = cart.find((item) => item.id === Number(req.params.id));
    res.send(uniqueData);
});

router.post("/", (req, res) => {
    const data = req.body;
    let existingItem = cart.find((item) => item.id === data.id);
    if (!existingItem) {
        cart.push(data);
        res.json(cart);
        console.log("Item  Present");
    } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        res.json(existingItem);
        console.log("Item Already Present");
    }
});

router.post("/quantity/:id", (req, res) => {
    let { id } = req.params;
    let { text } = req.body;
    let product = cart.find((item) => item.id === +id);
    text === "increment" ? product.quantity++ : product.quantity--;
    product.totalPrice = +(product.price * product.quantity).toFixed(2);
    console.log({ id: +id, qty: product.quantity });
    if (product.quantity === 0) {
        console.log("Filter");
        cart = cart.filter((item) => item.id !== product.id);
    }
    res.status(200).send("Product Quantity Updated");
});

router.delete("/:id", (req, res) => {
    cart = cart.filter((product) => +req.params.id !== product.id);
    res.json(cart);
});

module.exports = router;