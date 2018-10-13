/**
 * @author : Manjeet Kumar
 * @description : define the comment collection schema
 */

const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    id: Number,
    postId: {
        type: mongoose.Schema.Types.Number,
        ref: "Post"
    },
    name: String,
    email: String,
    body: String
})


module.exports = mongoose.model("Comment",commentSchema);