import mongoose from "mongoose";

const fannModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photo: {
    type: String, // base64 encoded ucun string qebul edir
    default: '',
  },
  price: {
    type: String,
  },
  distance: {
    type: String,
  },
  catagory: {
    type: String,
  },
}, {
  timestamps: true
});

const FannModel = mongoose.model("fann", fannModel);

export default FannModel;
