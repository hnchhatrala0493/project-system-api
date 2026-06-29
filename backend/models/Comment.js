const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    bug: { type: mongoose.Schema.Types.ObjectId, ref: "Bug" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
