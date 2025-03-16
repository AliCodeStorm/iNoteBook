const mongooseConnection = require('./db');
mongooseConnection();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/auth');
const notesRoutes=require('./routes/notes');
// app.use('/',(req,res)=>{
//   res.send('hallo');
// }) 
app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); 
})