# This is the backend for the website

1. Inside the Sever folder 'npm install'
2. you can run the backend using "npm run dev" command
3. Then,
    * Register a user using POST request to 'http://localhost:3500/auth/signup', send in body
      {
          "username": "demo",
          "email": "demo@gmail.com",
          "password": "123",
          "isAdmin": false
      }
    
    * Login using POST request to - 'http://localhost:3500/auth/login', send in body
      {
        "email" : "demo@gmail.com",
        "password" : "123"
      }
    
    *Both Register and Login will return you a JWT token, copy that token and set in Headers
      a key value pair like below, Bearer prefix is a must with a space to token

      Authorization : Bearer <token>

4. Register as a admin and add, delete, update products
5. As a User now you can add products cart

## Frontend will be DEVELOPED SOON ##