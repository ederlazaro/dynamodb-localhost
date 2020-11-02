// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
});

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
});

// filtros
const params = {
  TableName: "logKeynua",
  ProjectionExpression:
    "#lk, #ls, country, documentRef, logType, #token, finishedAt",
  KeyConditionExpression: "#lk = :logKey and #ls >= :logSort",
  ExpressionAttributeNames: {
    "#lk": "logKey",
    "#ls": "logSort",
    "#token": "token",
  },
  ExpressionAttributeValues: {
    ":logKey": { S: "PE-45400037-StartKeynua" },
    ":logSort": { N: "12345678" },
  },
};

dynamodb.query(params, function (err, data) {
  if (err) {
    console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    data.Items.forEach(function (item) {
      console.log(item);
    });
  }
});

// try {
//   const data = await dynamodb.query(params).promise();
//   console.log("Query succeeded.");
//     data.Items.forEach(function (item) {
//       console.log(item);
//     });
// } catch (error) {
//   console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
// }