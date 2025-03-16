const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook';

const mongooseConnection = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
    }
};

module.exports = mongooseConnection;
