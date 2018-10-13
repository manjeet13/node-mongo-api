const express = require('express');
const util = require('./../util');

var router = express.Router({mergeParams: true});
var utilObj = new util();


router.get('/', async (req, res)=> {
    console.log('request reached users');
    let data = await utilObj.getAllPostsByUserId(req.params.id).then((dbResponse)=> {
        return dbResponse;
    }).catch((err)=> {
        console.log('err: ', err);
    })

    res.json(data);
});

router.get('/posts/:post_id', async (req, res)=> {
    let userId = req.params.id;
    let postId = req.params.post_id;
    let data = await utilObj.getPostById(userId, postId).then((dbResponse)=> {
        return dbResponse;
    }).catch((err)=> console.log("err: ", err));
    console.log(data);
});

module.exports = router;