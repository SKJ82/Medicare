# Overview of the project:
 A REST API for fulfilling the requirement of medical amenities like ventilators.
 Clients can register as either buyers or sellers and save a record of all their information, developed using all the CRUD operations in Node.js.
 
 - It uses MongoDB Atlas database and mongoose library to store the details of users, their demands and supplies. 
 - A mail sending services with nodemailer and nodemailer-smtp-transport was implemented for, for following actions:-
   - A welcome mail is sent to clients as soon as they register on medicare.
   - A notification mail is sent to all the sellers about the demand of ventilators as soon as a buyer updates his ventilator requirements.
   - A notification mail is sent to all the buyers about the availability of ventilators as soon as the seller updates his supplies.
- The secure registration and login system with proper authentication was created with bcryptjs and json webtokens.

The http endpoints created are:
1. `/user/signup` : request type -POST
           description: It is used to register user on medicare as buyers or sellers.
           Required:It requires the details like : "category","name","email", "password","phone_no".
           Returns:An auth token for the registered client.
2. `/user/login` :request type -POST
                description: It is used to login the user on medicare as buyers or sellers.
                Required:It requires the details like : "email", "password".
                Returns:An auth token for the registered client.
3. `/buyer/requirements` :request type -GET
                description: It is used to return the list of all the registered sellers who can currently supply ventilators.
                Required:It requires the Bearer auth token of the logged in client.
                Returns:json data of all the sellers with ventilator supply more than the required amount.

4.  `/buyer/update` : request type -PATCH
                description: It is used to update the details of the buyer.
                Required:It requires the Bearer auth token of the logged in client along with the data to be updated.
                Returns:json data of the updated user.

5.  `/buyer/delete` : request type -DELETE
              description: It is used to delete the account of the current buyer.
              Required:It requires the Bearer auth token of the logged in client along with the data to be updated.
              Returns:json data of the deleted user.
  
6. `/seller/` :request type -GET
                description: It is used to return the list of all the sellers present.
                Required:It requires the Bearer auth token of the logged in client along with the data to be updated.
                Returns:json data of all the sellers.
        
7.  `/seller/update` : request type -PATCH
                description: It is used to update the details of the seller.
                Required:It requires the Bearer auth token of the logged in client along with the data to be updated.
                Returns:json data of the updated user.

8.  `/seller/delete` : request type -DELETE
              description: It is used to delete the account of the current seller.
              Required:It requires the Bearer auth token of the logged in client along with the data to be updated.
              Returns:json data of the deleted user.
