import mongoose from "mongoose";

const tiktokModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
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

const TiktokModel = mongoose.model("tiktok", tiktokModel);

export default TiktokModel;
