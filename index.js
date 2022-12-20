const { MongoClient, ServerApiVersion } = require('mongodb');
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
        console.log(orderData);
        


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

