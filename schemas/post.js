const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const {
  Types: { ObjectId },
} = Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  user: {
    _id: ObjectId,
    username: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
