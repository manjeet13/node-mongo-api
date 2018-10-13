/**
 * @author : Manjeet Kumar
 * @description : define the post routes to fetch all the posts related to a user and to
 */

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

module.exports = router;