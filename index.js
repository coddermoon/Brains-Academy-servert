const express = require('express');
const cors = require('cors')
// export all dependencies datta
const categories = require('./data/categories.json')
const courses = require('./data/courses.json')
const app = express()
app.use(cors())
const port = 5000

app.get('/',(req,res)=>{
    res.send('this is homepage')
})


// coursesw
app.get('/courses',(req,res)=>{
    res.send(courses)
})
// courses page
app.get('/categories',(req,res)=>{
    res.send(categories)
})

// filter course 

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    if (id === 'all') {
        res.send(courses);
    }
    else {
        const categoryCourses = news.filter(n => n.category_id === id);
        res.send(categoryCourses);
    }
})


app.listen(port,()=>{
    console.log('listening to Port ',port)
})

