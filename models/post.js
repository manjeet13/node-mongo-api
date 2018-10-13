/**
 * @author : Manjeet Kumar
 * @description : define the post collection schema
 */

const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.Number,
        ref: "User"
    },
    id: Number,
    title: String,
    body: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})


module.exports = mongoose.model("Post", postSchema);