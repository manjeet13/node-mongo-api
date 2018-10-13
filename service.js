const util = require('./util');
const mongoose      = require("mongoose");
const config = require('./config');

mongoose.connect(config.dbUrl, { useNewUrlParser: config.useNewUrlParser });

var utilObj = new util();

/**
 * @author : Manjeet Kumar
 * @description : fetches data from url and stores into mongo db
 */
async function getUsers() {
    
    
    await utilObj.fetchUsers('https://jsonplaceholder.typicode.com/users').catch(err=> console.log('err: ', err));

    await utilObj.fetchPosts('https://jsonplaceholder.typicode.com/posts').catch(err=> console.log('err: ', err));
    await utilObj.fetchComments('https://jsonplaceholder.typicode.com/comments').catch(err=> console.log('err: ', err));
}


getUsers().catch(err=> console.log("err: ", err));