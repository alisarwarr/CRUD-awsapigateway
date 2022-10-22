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
        event.path === "/book"
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


        type Params = {
            TableName: string | undefined,
            Key: string | {},
            ExpressionAttributeValues: any,
            ExpressionAttributeNames: any,
            UpdateExpression: string,
            ReturnValues: string
        }
        const editedItem: any = typeof event.body == "object" ? event.body : JSON.parse(event.body);
        let params: Params = {
            TableName: process.env.TABLE_NAME,
            Key: {
                id: event.queryStringParameters.id
            },
            ExpressionAttributeValues: {},
            ExpressionAttributeNames: {},
            UpdateExpression: "",
            ReturnValues: "UPDATED_NEW"
        };
        let prefix = "set ";
        let attributes = Object.keys(editedItem);
        for (let i = 0; i < attributes.length; i++) {
            let attribute = attributes[i];
            if (attribute !== "id") {
                params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
                params["ExpressionAttributeValues"][":" + attribute] = editedItem[attribute];
                params["ExpressionAttributeNames"]["#" + attribute] = attribute;
                prefix = ", ";
            }
        }


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