const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors')
require('dotenv').config()
// export all dependencies datta
const categories = require('./data/categories.json')
const courses = require('./data/courses.json')
const blogs = require('./data/blogs.json')
const app = express()
app.use(express.json())
app.use(cors())

/**
 *  === === payment method ===
 * 
 * 
 */

const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.storeId
const store_passwd = process.env.storePass
const is_live = false 

// database connections

const uri = process.env.DB_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async (req, res) => {

    try{

     app.post('/orders',async(req,res) => {

        const orderData = req.body
     

        const data = {
            total_amount: orderData.price,
            currency: orderData.currency,
            tran_id: new ObjectId().toString(), // use unique tran_id for each api call
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: orderData.name,
            cus_email: orderData.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({url:GatewayPageURL})
            
        });
        


     } )   

    }finally{

    }

    
}

run().catch(console.dir);


const port = process.env.PORT|| 5000

app.get('/',(req,res)=>{
    res.send('this is homepage')
})


// coursesw
app.get('/courses',(req,res)=>{
    res.send(courses)
})
// blogs
app.get('/blogs',(req,res)=>{
    res.send(blogs)
})
// courses page
app.get('/categories',(req,res)=>{
    res.send(categories)
})

// filter course 

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    if (id=== "all") {
        res.send(courses)
    }
    const selectedCourse = courses.filter(course=> id=== course.category_id)
    
    res.send(selectedCourse)
 
})

// find specific courses

app.get('/course/:id',(req,res)=>{
    const id = req.params.id;
    const singleCourseWithId =  courses.find(course=> id=== course.id)
    res.send(singleCourseWithId)
})




app.listen(port,()=>{
    console.log('listening to Port ',port)
})

