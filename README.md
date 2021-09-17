# test-SubscribeApp-JS-Nodejs-Express-MongoDB

Hello! This is subscribtion service. There are users who can subscribe and unsubscibe, when 2 users subscribed to each other they become friends.
Terminology:

User
A user in the system can follow other users. must have a name,
surname, date of registration, age.

Connection, follow
One-way communication (subscription) of one user with another.

Follower
User who subscribed to another user. Should be known
who is subscribed to the user and to whom, in turn, he is subscribed. Subscription
can be canceled.

Friends
We consider that users are friends if they mutually follow each other on
friend.

Technologies:
● Javascript
● Node.js
● Express
● MongoDB

Tutorial for use:

FOR RUN APP YOU NEED:
type in the project console: NODE_ENV=tarasov(or yours) npm run start

If app was started you can see:

![image](https://github.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/blob/main/image.png)

For comfortable use service you can use Postman - https://www.postman.com/downloads/

Service paths:
- POST http://localhost:7000/api/users/ - add user
- GET http://localhost:7000/api/users/ - get all users
- GET http://localhost:7000/api/users/:userId - get user by id
- GET http://localhost:7000/api/users/friendscount/:userId - get user friendscount by id
- GET http://localhost:7000/api/users/popular - get first 3 popular users by followers count
- DELETE http://localhost:7000/api/users/subscribe/:userId - unsubscribe
- PUT http://localhost:7000/api/users/subscribe/:userId - subscribe

----------------------------------------------------------------------------------------------
POST: Add user tutorial (path: http://localhost:7000/api/users/)

Open Postman and choose HTTP methot to POST, type path, then choose body to raw and type JSON\
![image](https://raw.githubusercontent.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/main/image.png)
Type json: \
Example:\
{
    "name": "Mark",\
    "surname": "Stark",\
    "age": 20\
}\
Response:\
{
    "message": "success",\
    "data": {\
        "_id": "61447e0142029969ae935ee2",\
        "name": "Mark",\
        "surname": "Stark",\
        "age": 20,\
        "date": "2021-09-17 14:37:37",\
        "friend": [],\
        "follower": [],\
        "subscribed": [],\
        "createdAt": "2021-09-17 14:37:37",\
        "updatedAt": "2021-09-17 14:37:37"\
    }
}
----------------------------------------------------------------------------------------------
GET: Get all users tutorial (path: http://localhost:7000/api/users/)

Open Postman and choose HTTP methot to GET, type path, and send request
![image](https://github.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/blob/main/getallscreen.png)
Response:\
{
    "message": "success",\
    "data": [\
            {\
            "_id": "61447e0142029969ae935ee2",\
            "name": "Mark",\
            "surname": "Stark",\
            "age": 20,\
            "date": "2021-09-17 14:37:37",\
            "friend": [],\
            "follower": [],\
            "subscribed": [],\
            "createdAt": "2021-09-17 14:37:37",\
            "updatedAt": "2021-09-17 14:37:37"\
        },\
        {\
            "_id": "6144817942029969ae935ee5",\
            "name": "Ivan",\
            "surname": "Key",\
            "age": 20,\
            "date": "2021-09-17 14:52:25",\
            "friend": [],\
            "follower": [],\
            "subscribed": [],\
            "createdAt": "2021-09-17 14:52:25",\
            "updatedAt": "2021-09-17 14:52:25"\
        }\
    ]\
}
----------------------------------------------------------------------------------------------
GET: Get user by id tutorial (path: http://localhost:7000/api/users/:id)

Open Postman and choose HTTP methot to GET, type path with user id, and send request
![image](https://github.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/blob/main/getuserbyidscreen.png)
Response:\
{\
    "message": "success",\
    "data": {\
        "_id": "6144817942029969ae935ee5",\
        "name": "Ivan",\
        "surname": "Key",\
        "age": 20,\
        "date": "2021-09-17 14:52:25",\
        "friend": [],\
        "follower": [],\
        "subscribed": [],\
        "createdAt": "2021-09-17 14:52:25",\
        "updatedAt": "2021-09-17 14:52:25"\
    }\
}
----------------------------------------------------------------------------------------------
GET: Get user friends count by id (path: http://localhost:7000/api/users/friendscount/:Id)

Open Postman and choose HTTP methot to GET, type path with user id, and send request
![image](https://github.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/blob/main/getfriendscountscreen.png)
Response:\
{\
    "message": "success",\
    "data": {\
        "userId": "6144817942029969ae935ee5",\
        "friends": [],\
        "count": 0\
    }\
}
----------------------------------------------------------------------------------------------
GET: Get first 3 popular users by followers count (path: http://localhost:7000/api/users/popular)

Open Postman and choose HTTP methot to GET, type path, and send request
![image](https://github.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/blob/main/getpopularscreen.png)
Response:\
{\
    "message": "success",\
    "data": [\
        {\
            "id": "6143c400dc127c7effc2e335",\
            "followers": [\
                "6143c3fcdc127c7effc2e333",\
                "6143c4e95d02035995bdf84e",\
                "6143c4ea5d02035995bdf850",\
                "6143c4eb5d02035995bdf852",\
                "6143c4eb5d02035995bdf854"\
            ]\
        },\
        {\
            "id": "6143c3fcdc127c7effc2e333",\
            "followers": [\
                "6143c4e95d02035995bdf84e"\
            ]\
        },\
        {\
            "id": "6143c4e95d02035995bdf84e",\
            "followers": [\
                "6143c3fcdc127c7effc2e333"\
            ]\
        }\
    ]\
}
----------------------------------------------------------------------------------------------
PUT: Subscribe (path: http://localhost:7000/api/users/subscribe/:id)

Open Postman and choose HTTP methot to PUT, TYPE PATH WITH USER ID WHO WANTS SUBSCRIBE, then choose body - raw to JSON, type body with user id who do you want to follow, then send request\
For example: 
My id - 6143c3fcdc127c7effc2e333\
User ID to which I want to subscribe - 6143c4e95d02035995bdf84e\

Type path with my id as params - http://localhost:7000/api/users/subscribe/6143c3fcdc127c7effc2e333\
Type JSON whith field: "subscribed":\
{\
    "subscribed": "6143c4e95d02035995bdf84e" - User ID to which I want to subscribe\
}

![image](https://github.com/Tarasofff/test-SubscribeApp-JS-Nodejs-Express-MongoDB/blob/main/subscreen.png)
Response: \
{\
    "message": "subscribed"\
}
----------------------------------------------------------------------------------------------
DELETE: Unsubscribe (path: http://localhost:7000/api/users/subscribe/:userId)

Open Postman and choose HTTP method to DELETE TYPE PATH WITH USER ID WHO WANTS UNSUBSCRIBE, then choose body - raw to JSON, type body with user id who do you want to unsubscribe, then send request
For example: 
My id - 6143c3fcdc127c7effc2e333\
User ID to which I want to unsubscribe - 6143c4e95d02035995bdf84e\

Type path with my id as params - http://localhost:7000/api/users/subscribe/6143c3fcdc127c7effc2e333\
Type JSON whith field: "unsubscribed":\
{\
    "unsubscribed": "6143c4e95d02035995bdf84e" - User ID to which I want to subscribe\
}
Response: \
{\
    "message": "unsubscribed"\
}

Thank you for the attention!

