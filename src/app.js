const fs = require('fs');
const express = require('express');
const app = express();


// Importing products from products.json file
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/product.json`)
);


// Middlewares
app.use(express.json());

// Write PATCH endpoint to buy a product for the client here
// Endpoint /api/v1/products/:id
app.patch('/api/v1/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find((product) => product.id === productId);
    if(!product){
        res.status(404).json({
            status: "failed",
            message: "Product not found!",
        });
    }else if(product.quantity > 0){
        product.quantity--;
        res.status(200).json({
            status: 'success',
            message: `Thank you for purchasing ${product.name}`,
            product,
        });
    }else{
        res.status(404).json({
            status: 'success',
            message: `${product.name}, Out of stock!`,
        });
    }
});



module.exports = app;
