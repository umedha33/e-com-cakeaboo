const port = process.env.PORT || 4000;
const express = require("express");
const { OpenAI } = require('openai');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGO_URI);

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage })

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Endpoint for generating images using OpenAI
app.post('/generateimage', async (req, res) => {
    try {
        const response = await openai.images.generate({
            prompt: req.body.prompt,
            n: 1,
            size: "512x512"
        });

        const imageUrl = response.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate image'
        });
    }
});

// Endpoint for Uploading Images
app.use('/images', express.static('upload/images'))
app.post("/uploadImages", upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'productgallery', maxCount: 10 }
]), (req, res) => {
    const mainImageUrl = req.files.mainImage ? `http://localhost:${port}/images/${req.files.mainImage[0].filename}` : null;
    const galleryImageUrls = req.files.productgallery ? req.files.productgallery.map(file => `http://localhost:${port}/images/${file.filename}`) : [];

    res.json({
        success: 1,
        mainImageUrl: mainImageUrl,
        galleryImageUrls: galleryImageUrls
    });
});

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
    const result = await Product.findOneAndDelete({
        id: req.body.id
    });

    if (result) {
        console.log("Product Removed:", result.title);
        res.json({
            success: true,
            title: result.title
        });
    } else {
        console.log("ID mismatched");
        console.log(result);
        res.status(404).json({
            success: false,
            message: "ID mismatched"
        });
    }
});

// Endpoint for Getting All Products
app.get('/allproducts', async (req, res) => {
    let allProducts = await Product.find({});
    console.log("All Products Fetched");
    // console.log("Sending all products:", allProducts);
    res.json({ allProducts });
})

// Endpoint for Getting One Product
app.get('/oneproduct', async (req, res) => {
    let oneProduct = await Product.findOne({ id: req.query.id });
    console.log("Product Fetched");
    res.json({ oneProduct });
})

// ===================================================

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    // console.log("Fetching User in Middleware", token);

    if (!token) {
        res.status(401).send({
            error: "Authenticate with valid token"
        })
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ error: "Authenticate using valid token" })
        }
    }
}

// ===================================================


// Endpoint for adding products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log(req.body, req.user);

    let userData = await Users.findOne({
        _id: req.user.id
    })

    const existingIDs = Object.keys(userData.cartData).map(id => parseInt(id)).filter(id => !isNaN(id));
    const newCartItemID = existingIDs.length > 0 ? Math.max(...existingIDs) + 1 : 1;

    const itemDetails = {
        ItemID: req.body.ItemID,
        CustomData: {
            customlayers: req.body.CustomData.customlayers,
            customtiers: req.body.CustomData.customtiers,
            customwriting: req.body.CustomData.customwriting,
            customcomment: req.body.CustomData.customcomment,
            customcolor: req.body.CustomData.customcolor,
            customflavor: req.body.CustomData.customflavor
        }
    };

    userData.cartData[newCartItemID] = itemDetails;

    await Users.findOneAndUpdate({
        _id: req.user.id
    }, { cartData: userData.cartData });

    res.send("Added to Cart")
})

// Endpoint for getting cart data
app.get('/getfromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({
            _id: req.user.id
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ cartData: cartData });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving cart data", error: error.toString() });
    }
});

// Endpoint for removing cart items
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        // Find the user and update
        await Users.findOneAndUpdate({
            _id: req.user.id
        }, {
            $unset: { [`cartData.${req.body.id}`]: "" }
        });

        // Respond to the client
        res.send("Item removed from cart");
    } catch (error) {
        // Handle possible errors
        console.error("Error removing item from cart:", error);
        res.status(500).send("An error occurred while removing the item from the cart");
    }
})


// ================================================================
// ================================================================


// Schema for User Accounts
const Users = mongoose.model('Users', {
    username: {
        type: String,
    },
    useremail: {
        type: String,
        unique: true,
    },
    userpassword: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

// Endpoint for user registeration 
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ useremail: req.body.useremail });
    if (check) {
        return res.status(400).json({
            success: false,
            error: "User Already Registered!"
        })
    }

    const user = new Users({
        username: req.body.username,
        useremail: req.body.useremail,
        userpassword: req.body.userpassword,
        cartData: { initialized: true },
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({
        success: true,
        token
    })
})

// Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({
        useremail: req.body.useremail
    });
    if (user) {
        const passwordCheck = req.body.userpassword === user.userpassword;
        if (passwordCheck) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({
                success: true,
                token
            });
        } else {
            res.json({
                success: false,
                error: "Wrong Password!"
            });
        }
    } else {
        res.json({
            success: false,
            error: "Wrong Email Adress!"
        });
    }
})


// ================================================================
// ================================================================


// Schema for orders
const Orders = mongoose.model('Orders', {
    orderID: {
        type: Number,
    },
    userid: {
        type: String,
    },
    orderOBJ: {
        type: Object,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliverDate: {
        type: Date,
    },
    orderStatus: {
        type: String,
        default: "Order Placed",
    },
    custName: {
        type: String,
    },
    custPhone: {
        type: String,
    },
    custEmail: {
        type: String,
    },
    custCity: {
        type: String,
    },
    custProvince: {
        type: String,
    },
    custPostal: {
        type: String,
    },
    custAddress: {
        type: String,
    },
    custAddNotes: {
        type: String,
    },
    checkoutAmount: {
        type: Number,
    },
})

// Endpoint for Adding Orders
app.post('/addorder', fetchUser, async (req, res) => {
    try {
        let lastOrder = await Orders.findOne().sort({ orderDate: -1 });
        let newOrderId = lastOrder ? parseInt(lastOrder.orderID) + 1 : 1;

        const { orderOBJ, deliverDate, custName, custPhone, custEmail, custCity, custProvince, custPostal, custAddress, custAddNotes, checkoutAmount } = req.body;

        // Constructing the new order object with the new order ID and user ID from the middleware
        const newOrder = new Orders({
            orderID: newOrderId,
            userid: req.user.id,
            orderOBJ: orderOBJ,
            orderDate: new Date(),
            deliverDate: deliverDate,
            orderStatus: "Order Placed",
            custName: custName,
            custPhone: custPhone,
            custEmail: custEmail,
            custCity: custCity,
            custProvince: custProvince,
            custPostal: custPostal,
            custAddress: custAddress,
            custAddNotes: custAddNotes,
            checkoutAmount: checkoutAmount
        });

        // Saving the order to the database
        await newOrder.save();

        // Sending success response back to client
        res.json({
            success: true,
            message: 'Order successfully added!',
            orderDetails: newOrder
        });
    } catch (error) {
        // Handle possible errors during save operation
        console.error("Failed to add order:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the order",
            error: error.toString()
        });
    }
});

// Endpoint for getting order data - customer's end
app.get('/getorderscust', fetchUser, async (req, res) => {
    try {
        const userOrders = await Orders.find({
            userid: req.user.id
        });

        if (!userOrders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.json({
            success: true,
            userOrders: userOrders
        });

    } catch (error) {
        console.error("Failed to retrieve user orders:", error);
        res.status(500).json({
            message: "An error occurred while retrieving order data",
            error: error.toString()
        });
    }
});

// Endpoint fot getting all orders
app.get('/allorders', async (req, res) => {
    let allOrders = await Orders.find({});
    console.log("All Orders Fetched");
    // console.log("Sending all products:", allOrders);
    res.json({ allOrders });
})

// Endpoint for Updating Order Status
app.post('/updateOrderStatus', async (req, res) => {
    const { orderID, newStatus } = req.body;

    if (!orderID || !newStatus) {
        return res.status(400).json({ success: false, message: "Missing order ID or new status" });
    }

    try {
        const updatedOrder = await Orders.findOneAndUpdate(
            { orderID: orderID },
            { $set: { orderStatus: newStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated successfully", updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update order status", error: error.toString() });
    }
});


// Schema for coupons
const Coupons = mongoose.model('Coupons', {
    couponID: {
        type: Number,
    },
    couponTitle: {
        type: String,
    },
    // couponCategory: {
    //     type: String,
    // },
    couponStartDate: {
        type: Date,
    },
    couponEndDate: {
        type: Date,
    },
    couponPrice: {
        type: Number,
    },
    couponCode: {
        type: String,
    },
})

// Endpoint for Adding Coupons
app.post('/addcoupon', async (req, res) => {
    const { title, startdate, enddate, price, code } = req.body;

    // Find the next couponID if needed
    const nextID = async () => {
        const lastCoupon = await Coupons.findOne({}).sort({ couponID: -1 });
        return lastCoupon ? lastCoupon.couponID + 1 : 1;
    };

    try {
        const coupon = await Coupons.findOneAndUpdate(
            { couponCode: code },
            {
                couponID: await nextID(),
                couponTitle: title,
                // couponCategory: category,
                couponStartDate: startdate,
                couponEndDate: enddate,
                couponPrice: price,
                couponCode: code
            },
            {
                new: true,
                upsert: true
            }
        );

        console.log("Coupon processed:", coupon);
        res.json({
            success: true,
            message: "Coupon has been added / updated successfully.",
            title: title
        });
    } catch (error) {
        console.error("Error processing coupon:", error);
        res.status(500).json({ success: false, message: "Failed to process coupon" });
    }
});

// Endpoint for Getting All coupons
app.get('/allcoupons', async (req, res) => {
    let allCoupons = await Coupons.find({});
    console.log("All Coupons Fetched");
    // console.log("Sending all coupons:", allCoupons);
    res.json({ allCoupons });
})

// Endpoint for Deleting coupons
app.post('/removecoupon', async (req, res) => {
    const { id } = req.body;
    const result = await Coupons.findOneAndDelete({ couponID: id });

    if (result) {
        // console.log("Coupon Removed:", result.title);
        res.json({
            success: true,
            title: result.title
        });
    } else {
        // console.log("No matching document found for ID:", id);
        res.status(404).json({
            success: false,
            message: "No matching coupon found"
        });
    }
});

// Endpoint for Getting One Coupon
app.get('/onecoupon', async (req, res) => {
    // console.log(`apu eka: `, req.query.couponCode)
    let oneCoupon = await Coupons.findOne({ couponCode: req.query.couponCode });
    console.log("Coupon Fetched");
    console.log(`Coupon Details: `, oneCoupon);
    res.json({ oneCoupon });
})


// =================================================================================
// =================================================================================

// Schema for Chats
const Chats = mongoose.model('Chats', {
    chatName: {
        type: String,
    },
    chatUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

// Schema for Messages
const Messages = mongoose.model('Messages', {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    messageContent: {
        type: String,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats'
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

// Endpoint for creating chats
app.post('/api/chat', fetchUser, async (req, res) => {
    const { userId } = req.body;
    console.log(req.user.id);

    if (!userId) {
        console.log("User ID not received");
        return res.status(400).send({ error: error.message });
    }

    var isChat = await Chats.find({
        $and: [
            { chatUsers: { $elemMatch: { $eq: req.user.id } } },
            { chatUsers: { $elemMatch: { $eq: userId } } },
        ]
    }).populate('chatUsers', '-userpassword -cartData')
        .populate('latestMessage');

    isChat = await Users.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'username useremail',
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            chatUsers: [req.user.id, userId],
        };

        try {
            const createdChat = await Chats.create(chatData);
            const FullChat = await Chats.findOne({ _id: createdChat._id }).populate('chatUsers', '-userpassword -cartData')

            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }

    }
});

// Endpoint for fetching all chats
app.get('/api/chat', fetchUser, async (req, res) => {
    try {
        Chats.find({
            chatUsers: { $elemMatch: { $eq: req.user.id } }
        }).populate('chatUsers', '-userpassword -cartData')
            .populate('latestMessage')
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await Users.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'username useremail',
                });
                res.status(200).send(results);
            })
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


















// =================================================================================
// =================================================================================




app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port)
    } else {
        console.log("Error : " + error)
    }
})

