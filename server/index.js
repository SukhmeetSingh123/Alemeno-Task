const connectToMongo=require('./db');
var cors=require('cors')
const express = require('express')
connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./Routes/authRoutes'))
app.use('/api/courses',require('./Routes/coursesRoutes'))

app.listen(port, () => {
  console.log(`Alemeno Backened listening on port ${port}`)
})