# This is the backend for the website

1. Create a .env file inside the Server Folder and add these

NODE_ENV=development
DATABASE_URI=mongodb+srv://sirajpreena311:rqNQyYB37mT2TpBK@ecommerce-cluster.ceijtfm.mongodb.net/tsp_db?retryWrites=true&w=majority&appName=Ecommerce-Cluster
JWT_SECRET=2e1f3e9429a4b3ee15f453aa206adcdaf016dba08c7ee830c66bf59991664e6e6c622dd519ff2edad0ef7551f643b0c4b71c42113e4f239019c4f3598313ad19

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