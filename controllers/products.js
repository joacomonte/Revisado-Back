const express = require('express');

const getProducts = (req, res) => {
    res.send('get all products')
}

const createProduct = (req, res) => {
    res.send("get all products")
}


const createProductPostman = (req, res) => {
    res.send("get all products")
}
const updateProduct = (req, res) => {
    res.send("get all products")
}
const deleteProduct= (req, res) => {
    res.send("get all products")
} 

module.exports = {
    getProducts,
    createProduct,
    createProductPostman,
    updateProduct,
    deleteProduct
}