const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');//this is used at app.use


const app = express();
/*listen used to creat server as at port , here the port is 3000.
 and another argument is call back function
*/
//middleware
//whenever we vist to the deflt page we will throw a res from sever
app.use(express.json());//this is used to add with json
//we are wrriting in json form to add a product or anyything so to just write key value pair
//use :-
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/products', productRoute)


app.get('/', (req, res) => {
    res.send("hello node api. this is updated");//this is the res

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

