const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute =require('./routes/product.route.js');


const app = express();
/*listen used to creat server as at port , here the port is 3000.
 and another argument is call back function
*/

//middleware

//whenever we vist to the deflt page we will throw a res from sever
app.use(express.json());//this is used to add with json

//we are wrriting in json form to add a product or anyything so to just write key value pair
//use :-
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api/products',productRoutes)



app.get('/', (req, res) => {
    res.send("hello node api. this is updated");//this is the res

})
//used to get list of objects at client side without id

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});//Product with capital P is where from data is obtaining and
        res.status(200).json(products);         //and the smaal p where we storing and showing at sever 

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
/*✅ Key Notes:
Term	Meaning
Product	Mongoose model – used to interact with MongoDB

products	Variable holding the data fetched from DB

res.json()	Sends a JSON response to the client

res.status(200)	Sets the HTTP status code*/

//used to get the items throgh id 
app.get('/api/products/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }
    catch {
        res.status(500).json({ message: error.message })
    }
})
//use to add product
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
})

// to update the Product we use PUT method
app.put("/api/products/:id",async (req,res)=>{
    try{
        const {id}=req.params;
       const product= await Product.findByIdAndUpdate(id,req.body);
       if(!product)// checks whetther product exist or not 
        {
        return res.status(404).json({message:"Product not found"});

       }
       const upadatedProduct= await Product.findById(id);//this will to check product is updated or not

       res.status(200).json(upadatedProduct);

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

})
//Delet product using delete method
app.delete('/api/products/:id',async (req,res)=>{
    try {
        const {id}=req.params;
      const product=  await Product.findByIdAndDelete(id);
      if(!product)// checks whetther product exist or not 
        {
        return res.status(404).json({message:"product not find"});

      }
      res.status(200).json({message:"Deleted succesfully"});//to confirm product is deleted
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

mongoose.connect("mongodb+srv://manushdesai4:manush123@backenddb.ntidaxg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Backenddb")
    .then(() => {
        console.log("connection succesful");
        app.listen(3000, () => {
            console.log("server is nrunning to port 3000");
        }) //so the database is connected and then the sever is run so we shifted it
    })
    .catch(() => {
        console.log("failed");
    })

