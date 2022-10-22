//AWS
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';


exports.handler = async (event: any = {}): Promise<any> => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: "invalid request, you are missing the parameter body",
        };
    }



    if (event.resource === "/books" && event.httpMethod === "GET") {
        try {
            const params = {
                TableName: TABLE_NAME
            };

            const response = await docClient.scan(params).promise();
            return { statusCode: 200, body: JSON.stringify(response.Items) };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return { statusCode: 500, body: err };
        }
    }

    else if (event.resource === "/books" && event.httpMethod === "POST") {
        try {
            const params = {
                TableName: TABLE_NAME,
                Item: event.pathParameters
            };

            await docClient.put(params).promise();
            return { statusCode: 201, body: "" };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return { statusCode: 500, body: err };
        }
    }

    else if (event.resource === "/book" && event.httpMethod === "GET") {
        try {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: event.pathParameters.id
                }
            };

            const response = await docClient.get(params).promise();
            return { statusCode: 200, body: JSON.stringify(response.Item) };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return { statusCode: 500, body: err };
        }
    }

    else if (event.resource === "/book" && event.httpMethod === "DELETE") {
        try {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: event.pathParameters.id
                }
            };

            await docClient.delete(params).promise();
            return { statusCode: 200, body: "" };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return { statusCode: 500, body: err };
        }
    }

    else if (event.resource === "/book" && event.httpMethod === "PATCH") {
        // try {

        //     await docClient.update(params).promise();
        //     return { statusCode: 204, body: "" };
        // }
        // catch (err) {
        //     console.log("DynamoDB error: ", err);
        //     return { statusCode: 500, body: err };
        // }
    }
}