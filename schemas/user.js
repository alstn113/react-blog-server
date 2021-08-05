const mongoose, { Schema } = require('mongoose');
const { Types: { ObjectId } } = Schema;
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  user: {
    type: ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);




