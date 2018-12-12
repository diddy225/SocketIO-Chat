# SocketIO-Chat App

**Part 1:**

1. Create a Message model (in models folder)
 * sender: string
 * message: string

2. Create an API POST route
 * this route creates a new message (use req.body) )(in the routes folder)

Should be able to create new messages with POSTMAN

3. Add post request to front end that sends sender and message

Should be able to create new messages by clicking the Send button

4. Create a GET route that gets all messages (in the routes folder)

5. Make a GET request to get all messages to the front end and console log them.

6. Make a render function. Render all messages from the db on load. Add all messages that come in over the socket.

**Part 2:**

1. Create a Chat Model
  * messages - an array with objectIds from messages collection. 
  * userNames - an array of the 2 users in this chat

2. When a user initiates a chat with another user, check to see if a `Chat` document exists between those 2 users, if so, retrieve that `Chat` history and load it to the page, otherwise create a new `Chat` document. 

*Hint:* Think about what this entails (HTTP request (GET, POST, etc) to send the new chat info, API routes to handle the database interaction, DB Models, etc)

3. When a user adds a new message, add that message to the `Chat` between those 2 users.

4. Display only the messages from the user with whom you are currently engaged in a chat. 
