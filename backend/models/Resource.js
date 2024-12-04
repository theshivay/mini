const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
ResourceSchema.index({ owner: 1 }); // Optimize queries by owner

module.exports = mongoose.model("Resource", ResourceSchema);
