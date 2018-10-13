const request 	= require('request');
//get models
var User 	= require('./models/user');
var Post 	= require('./models/post');
var Comment = require('./models/comment');


module.exports = class DbService {
	
	initialize() {
		this._error;
		this._message;
	}

	/**
	 * @author : Manjeet Kumar
	 * @param {string} url : remote url for json data
	 * @description : this method fetches all the users from remote and maps them to mongo db
	 */
	fetchUsers(url) {
		return new Promise((resolve, reject)=> {
			request(url, (error, response, body)=> {
			if(error) {
        		console.log('error:', error); // Print the error if one occurred
        		reject(error);
		    } else if (response && response.statusCode==200) {
		        //console.log('body:', JSON.parse(body));
		        let data = JSON.parse(body)
		        data.map((userObj)=> {
		            User.create(userObj, (err, newUser)=> {
		                if(err) {
		                    console.log('something went wrong: ', err);
		                } else {
		                    console.log('added new user: ');
		                }
		            })
		        })
		        resolve(true);
				}
			})
		})
		
	}


	/**
	 * @author : Manjeet Kumar
	 * @param {string} url : remote url for json data
	 * @description : this method fetches all the posts from remote and maps them to mongo db
	 */
	fetchPosts(url) {
		return new Promise((resolve, reject)=> {
			request('https://jsonplaceholder.typicode.com/posts', (error, response, body)=> {
		        if(error) {
		            console.log('error:', error); // Print the error if one occurred
		            reject(err);
		        } else if(response && response.statusCode == 200) {
		            //console.log('body:', JSON.parse(body));
		            let data = JSON.parse(body)
		            data.map((jsonObj)=> {
		                Post.create(jsonObj, (err, newPost)=> {
		                    if(err) {
		                        console.log('something went wrong: ', err);
		                        reject(err);
		                    } else {
		                        console.log('added new post: ');
		                        User.findOne({"id": newPost["userId"]}, (err, user)=> {
		                        	user.posts.push(newPost);
		                        	user.save();
		                        	console.log('user with post: ', user);
		                        })
		                    }
						})
						resolve(true);
		            })
		        }
		    })
		})
	}


	/**
	 * @author : Manjeet Kumar
	 * @param {string} url : remote url for json data
	 * @description : this method fetches all the comments from remote and store them to mongo db
	 */
	fetchComments(url) {
		return new Promise((resolve, reject)=> {
			request('https://jsonplaceholder.typicode.com/comments', (error, response, body)=> {
		        if(error) {
		            console.log('error:', error); // Print the error if one occurred
		            reject(err);
		        } else if(response && response.statusCode == 200) {
		            //console.log('body:', JSON.parse(body));
		            let data = JSON.parse(body)
		            data.map((jsonObj)=> {
		                Comment.create(jsonObj, (err, newComment)=> {
		                    if(err) {
		                        console.log('something went wrong: ', err);
		                        reject(err);
		                    } else {
		                        console.log('added new comment: ');
		                        Post.findOne({"id": newComment["postId"]}, (err, post)=> {
		                        	post.comments.push(newComment);
		                        	post.save();
		                        	console.log('post with comment: ', post);
		                        })
		                    }
						})
						resolve(true);
		            })
		        }
		    })
		})
	}


	/**
	 * @author : Manjeet Kumar
	 * @description : this method fetches all the users from the mongo db and returns the json response
	 */
	getAllUsers() {
		return new Promise((resolve, reject)=> {
			
			User.find()
			.populate("posts")
			.exec((err, res)=> {
				if(err) {
					reject(err);
				}
				//console.log(res);
				let data = JSON.stringify(res);
				resolve(JSON.parse(data));
			})
		})
		
	}

	/**
	 * @author : Manjeet Kumar
	 * @param {string} userId : id of the user for which posts are to be fetched
	 * @description : this method fetches all the posts with populated comments of a particular user from the database
	 */
	getAllPostsByUserId(userId) {
		return new Promise((resolve, reject)=> {
			
			User.find({"id": userId})
			.populate({
				path: "posts",
				populate: {
					path: "comments",
					model: "Comment"
				}
			})
			.exec((err, res)=> {
				if(err) {
					reject(err);
				}
				//console.log(res);
				let data = JSON.stringify(res);
				let jsonData = JSON.parse(data);
				resolve(jsonData[0].posts);
			})
		})
		
	}

	/**
	 * @author : Manjeet Kumar
	 * @param {string} userId : user id of the user who details are to be fetched
	 * @description : this method queries all the user data including his populated posts and comments array from the db
	 */
	getUserById(userId) {
		
		return new Promise((resolve, reject)=> {
			User.find({"id":userId})
			.populate({
				path: "posts",
				populate: {
					path: "comments",
					model: "Comment"
				}
			})
			.exec((err, res)=> {
				if(err) {
					reject(err);
				}
				//console.log(res);
				let data = JSON.stringify(res);
				resolve(JSON.parse(data));
			})
		})
	}


	/**
	 * @author : Manjeet Kumar
	 * @param {*} userId : id of the user whose avatar is to be updated
	 * @param {*} newUrl : link to the new avatar
	 * @description : updates the user avatar
	 */
	findUserAndUpdateAvatar(userId, newUrl) {
		return new Promise((resolve, reject)=> {
			User.find({"id": userId}, async (err, user)=> {
				
				if(err) {
					reject(err);
				}
				else {
					let userStr = JSON.stringify(user[0]);
					let userJSON = JSON.parse(userStr);
					console.log('user: ', userJSON);
					//check if that attribute exists
					if(userJSON.avatar) {
						console.log('i am here');
						userJSON["avatar"] = newUrl;
					} else {
						console.log('i am where i should be');
						User.updateOne()
						await User.updateOne(
							{"_id": "5bc1bf15729f10029a32e212"},
							{$set: {"avatar": newUrl}}, (err, raw)=> {
								if(err) {
									console.log(err);
								}
								console.log('raw: ', raw);
							}
						)
						let data = JSON.stringify(user);
						let jsonData = JSON.parse(data);
	
						resolve(jsonData);
					}
					
				}
				
			})
		})
		
	}

	setError(err) {
		this._error = err;
	}

	getError() {
		return this._error;
	}

	setMessage(msg) {
		this._message = msg;
	}

	getMessage() {
		return this._message;
	}
}