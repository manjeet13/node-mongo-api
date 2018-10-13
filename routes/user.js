const express = require('express');
const util = require('../util');

var utilObj = new util();
var router = express.Router({mergeParams: true});


//get all the users' data
router.get('/', async (req, res)=> {
    console.log('request reached users');
    let data = await utilObj.getAllUsers().then((dbResponse)=> {
        return dbResponse;
    }).catch((err)=> {
        console.log('err: ', err);
    })

    data.forEach((user)=> {
        user.posts.forEach((post)=> {
            console.log('post: ', post);
        })
    })
    //console.log('data: ', data);
    res.json(data);
});


//get a single user data by his "id"
router.get('/:id', async (req, res)=> {
    let userId = req.params.id;
    let data = await utilObj.getUserById(userId).then((dbResponse)=> {
        return dbResponse;
    }).catch((err)=> console.log("err: ", err));
    //console.log(data);
    res.json(data);
});


//update avatar route
router.post('/:id/changeAvatar', async (req, res)=> {
    let newUrl = req.body.url;
    let data = await utilObj.findUserAndUpdateAvatar(req.params.id, newUrl).then((dbResponse)=> {
        return dbResponse;
    }).catch((err)=> {
        console.log('err: ', err);
    });

    //return updated user json
    res.json(data);
})

module.exports = router;