const express = require('express');
const cors = require('cors')

const app = express()
app.use(cors())
const port = 5000

app.get('/',(req,res)=>{
    res.send('this is homepage')
})

app.listen(port,()=>{
    console.log('listening to Port ',port)
})

