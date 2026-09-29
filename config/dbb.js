import mongoose from 'mongoose';

function Connection() {
    const mongoURI = "mongodb+srv://tefere8241_db_user:y5NAXvY2xASD1m2X@cluster0.gqm2mlu.mongodb.net/";
    
    mongoose.connect(mongoURI)
    .then(() => console.log("connected"))
    .catch(err => console.log(err))
}


export default Connection;
