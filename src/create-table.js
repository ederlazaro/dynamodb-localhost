// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export default class {
  async deleteTable() {
    const params = {
      TableName: "logKeynua",
    };
    try {
      await dynamodb.deleteTable(params).promise();
      console.log("Tabla eliminada");
    } catch (error) {
      console.log("No existe la tabla");
    }
  }

  async createTable() {
    const params = {
      TableName: "logKeynua",
      KeySchema: [
        // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        {
          // Required HASH type attribute
          AttributeName: "logKey",
          KeyType: "HASH",
        },
        {
          // Optional RANGE key type for HASH + RANGE tables
          AttributeName: "logSort",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        // The names and types of all primary and index key attributes only
        {
          AttributeName: "logKey",
          AttributeType: "S", // (S | N | B) for string, number, binary
        },
        {
          AttributeName: "logSort",
          AttributeType: "N", // (S | N | B) for string, number, binary
        },
        // ... more attributes ...
      ],
      ProvisionedThroughput: {
        // required provisioned throughput for the table
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };
    try {
      await dynamodb.createTable(params).promise();
      console.log("Table Created");
    } catch (error) {
      console.error("Error existente");
    }
  }

  async putItems(items) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      try {
        await dynamodb.putItem(element).promise();
        console.log("Item " + index + " agregado.");
      } catch (error) {
        console.error("Error", error);
      }
    }
  }
}
