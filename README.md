
# Vetspot 





## Introduction

The Veterinary System Website is a comprehensive solution designed to streamline and optimize the operations of a veterinary clinic. It offers features such as patient management, appointment scheduling, billing and invoicing, inventory management, and reporting and analytics. With a user-friendly interface, this system aims to enhance efficiency and effectiveness in veterinary care. Refer to the documentation for installation and usage instructions. Contributions from the community are welcome. 

## TECHSTACK USED
**HTML** | **CSS** | **Javascript** | **MongoDB** | **Socket.io** | **Node.js** | **React.js**    

## API Reference

#### All Route Detail

| Method | Route     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/user/register` | **User-Register**|
| `POST` | `/user/login` | **User-Login**|
| `GET` | `/user/logout` | **User-Logout**|
| `POST` | `/doctor/register` | **Doctor-Register**|
| `POST` | `/appointment/create` | **Book-Appointment**|
| `POST` | `/appointment/create` | **Book-Appointment**|


## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- **port** : this is a port of website server
- mongoUrl: this is the connection string of your MongoDB Atlas database.

- **GMAIL_EMAIL**, **GMAIL_PASSWORD** : the email and password given to nodemailer to send/receive the email. Please put a real email and password here because you will receive the messages sent from the contact us form on this email.

- **ADMIN_EMAIL**, **ADMIN_PASSWORD** : the email and password used to log into the admin panel using AdminBro. You can put any email and password here.

- **redis_url** : Use a secure and unique method to generate the Redis URL for secure connection and data storage.


## Technology

The application is built with:

- Node.js version 12.16.3
- MongoDB version 4.2.0
- Express version 4.16.1
- Bootstrap version 4.4.1
- FontAwesome version 5.13.0
- Nodemailer: used to send emails from the contact us form
- Socket.io version 4.6.1 

