const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://ecomcakeadmin:KJSbY147cPWxMzPB@cluster0.unjvjpt.mongodb.net/ecom-cakeaboo");

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Endpoint for Uploading Images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    flavor: {
        type: String,
        required: true
    },
    layercount: {
        type: Number,
        required: true
    },
    tiercount: {
        type: Number,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    mainimage: {
        type: String,
        required: true
    },
    productgallery: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Endpoint for Adding Products
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        subcategory: req.body.subcategory,
        flavor: req.body.flavor,
        layercount: req.body.layercount,
        tiercount: req.body.tiercount,
        shape: req.body.shape,
        color: req.body.color,
        mainimage: req.body.mainimage,
        productgallery: req.body.productgallery,
        price: req.body.price,
    });
    console.log(product);
    await product.save();
    console.log("Product Saved");
    res.json({
        success: true,
        title: req.body.title,
    })
})

// Endpoint for Deleting Products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id
    });
    console.log("Product Removed");
    res.json({
        success: true,
        title: req.body.title
    })
})

// Endpoint for Getting All Products
app.get('/allproducts', async (req, res) => {
    let allProducts = await Product.find({});
    console.log("All Products Fetched");
    res.json({ allProducts });
})





app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port)
    } else {
        console.log("Error : " + error)
    }
})

