const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require( 'dotenv');
const multer = require( 'multer');
const path = require( 'path');
const jwt = require( 'jsonwebtoken');
const bcrypt = require( 'bcrypt');

const authRoutes  =  require('./routes/auth.js') ;
const hodRoutes  =  require('./routes/hod.js') ;
const accreditationRoutes  =  require('./routes/accreditation.js') ;

const dapRoutes = require('./routes/dapRoutes');

const universityRoutes = require('./routes/universities.js');
const collegeRoutes = require('./routes/college.js');
const nucStaffRoutes = require('./routes/nucStaffRoute.js');

//const nucDocumentsRoute = require('./routes/nucDocuments.js');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));




// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/accreditation', accreditationRoutes);
app.use('/api/dap', dapRoutes);
app.use('/api', universityRoutes);
//app.use('/api/university', universityRoutes);
app.use('/api/college', collegeRoutes);

//app.use("/api/nuc_staffs", nucStaffRoutes); // Use API route
//app.use('/api/nuc_documents', nucDocumentsRoute);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch(err => console.log(err));