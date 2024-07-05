const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const ProductRoute = require('./routes/product.route.js')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


app.get('/',(req,res)=>{
    console.log("Node app");
    res.send("Node app");
})

app.use('/api/products',ProductRoute);

// app.get('/api/product/:id',)

// app.post('/api/products',async(req,res)=>{
//     // console.log(req.body);
//     // res.send(req.body)

//     try {

//         const prod  = await Product.create(req.body);
//         res.status(200).json(prod);
        
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })

// app.put('/api/product/:id',async (req,res)=>{
//     try {
//         const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
//         if (!prod) {
//             return res.status(404).json({ message: "Product not found" });
//         }
        
//         res.status(200).json(prod);



//     } catch (error) {
//         res.status(500).json({message:"Product not found"});
//     }
// })

// app.delete('/api/product/:id',async (req,res)=>{
//     try {
//         const prod = await Product.findByIdAndDelete(req.params.id);
//         res.status(200).json(prod);

//     } catch (error) {
//         res.status(500).json({message:"Product not found"});
//     }
// })



mongoose.connect("mongodb+srv://sushantkolhe18:nd0keI4thSeb1zbU@backenddb.zbisfw4.mongodb.net/")
.then(()=>{
   console.log("Connected to database!");
})
.catch(()=>{
    console.log("Database connection failed!");

})