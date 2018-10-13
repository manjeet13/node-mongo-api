# node-mongo-api
simple node api.
It includes two things:
1. A service that fetches json data from remote and inserts into mongo database (including joins between user/posts/comments collections).
2. Defines API end points for fetching user details, posts, comments from the mongo database

### To run the project:

#### clone it and run npm install to install all the dependencies from the project root path.

#### run the mongo server from a different terminal tab via "sudo mongod" 

#### type "node service.js" from the project folder. This will fetch users from the remote and insert them to mongo database under the "master" db name

#### type "node server.js" to run the express server on PORT 3000

#### testing
go to the browser and hit the url: http://localhost:3000/users to get all the users' data
http://localhost:3000/users/<user_id> to get the data of a particular user with populated posts and comments arrays
http://localhost:3000/users/<user_id>/posts to get all the posts with populated comments for a particular user
http://localhost:3000/users/<user_id>/changeAvatar to update/add avatar of a particular user
