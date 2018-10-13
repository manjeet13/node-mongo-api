const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.Number,
        ref: "Post"
    },
    id: Number,
    name: String,
    email: String,
    body: String
})


module.exports = mongoose.model("Comment",commentSchema);