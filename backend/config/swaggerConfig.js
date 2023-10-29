// --------------->>>>>>>> Swagger <<<<<<<<-------------------
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config()
const BACKEND_DEPLOYED_URL=process.env.BACKEND_DEPLOYED_URL||"http://localhost:8080/"
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Vetspot Backend",
        version: "1.0.0",
        description:
          "The Veterinary System Website is a comprehensive solution designed to streamline and optimize the operations of a veterinary clinic. It offers features such as patient management, appointment scheduling, billing and invoicing, inventory management, and reporting and analytics.",
      },
      servers: [
        {
          url:BACKEND_DEPLOYED_URL ,
        },
      ],
    },
    apis: ["./docs/*.js"],
  };
  const specs = swaggerJsDoc(options);

  module.exports = specs;