//AWS
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';


exports.handler = async (event: any = {}): Promise<any> => {

    if (
        event.path === "/books"
     && event.resource === "/books"
     && event.httpMethod === "GET"
    ) {
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

    else if (
        event.path === "/books"
     && event.resource === "/books"
     && event.httpMethod === "POST"
    ) {
        if (!event.body) {
            return {
                statusCode: 400,
                body: "invalid request, you are missing the parameter body"
            };
        }

        const item = typeof event.body == "object" ? event.body : JSON.parse(event.body);

        try {
            const params = {
                TableName: TABLE_NAME,
                Item: item
            };

            await docClient.put(params).promise();
            return { statusCode: 201, body: "" };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return { statusCode: 500, body: err };
        }
    }

    else if (
        event.path === "/book"
     && event.resource === "/{id}"
     && event.httpMethod === "GET"
    ) {
        if (!event.queryStringParameters.id) {
            return {
                statusCode: 400,
                body: "Error: You are missing the path parameter id"
            };
        }

        try {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    id: event.queryStringParameters.id
                }
            };

            const response = await docClient.get(params).promise();
            return { statusCode: 200, body: JSON.stringify(response.Item) };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            console.log("sdas6", event)
            return { statusCode: 500, body: err };
        }
    }

    else if (
        event.path === "/book"
     && event.resource === "/{id}"
     && event.httpMethod === "DELETE"
    ) {
        if (!event.queryStringParameters.id) {
            return {
                statusCode: 400,
                body: "Error: You are missing the path parameter id"
            };
        }

        try {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    id: event.queryStringParameters.id
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

    else if (
        event.resource === "/book"
     && event.resource === "/{id}"
     && event.httpMethod === "PATCH"
    ) {
        if (!event.body) {
            return {
                statusCode: 400,
                body: "invalid request, you are missing the parameter body",
            };
        }

        if (!event.queryStringParameters.id) {
            return {
                statusCode: 400,
                body: "invalid request, you are missing the path parameter id",
            };
        }

        const editedItem = typeof event.body == "object" ? event.body : JSON.parse(event.body);
        const editedItemProperties = Object.keys(editedItem);
        if (!editedItem || editedItemProperties.length < 1) {
            return { statusCode: 400, body: "invalid request, no arguments provided" };
        }

        const firstProperty = editedItemProperties.splice(0, 1);
        const params: any = {
            TableName: TABLE_NAME,
            Key: {
                id: event.queryStringParameters.id,
            },
            UpdateExpression: `set ${firstProperty} = :${firstProperty}`,
            ExpressionAttributeValues: {},
            ReturnValues: "UPDATED_NEW",
        };
        params.ExpressionAttributeValues[`:${firstProperty}`] =
            editedItem[`${firstProperty}`];

        editedItemProperties.forEach((property) => {
            params.UpdateExpression += `, ${property} = :${property}`;
            params.ExpressionAttributeValues[`:${property}`] = editedItem[property];
        });


        try {
            await docClient.update(params).promise();
            return { statusCode: 204, body: "" };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return { statusCode: 500, body: err };
        }
    }
}