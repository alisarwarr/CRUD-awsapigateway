"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
//AWS
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';
exports.handler = async (event = {}) => {
    console.log("sdas", event);
    if (event.path === "/books" && event.resource === "/books" && event.httpMethod === "GET") {
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
    else if (event.path === "/books" && event.resource === "/books" && event.httpMethod === "POST") {
        if (!event.body) {
            return {
                statusCode: 400,
                body: "invalid request, you are missing the parameter body"
            };
        }
        const item = typeof event.body == "object" ? event.body : JSON.parse(event.body);
        item[PRIMARY_KEY] = uuid_1.v4();
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
    else if (event.path === "/book" && event.resource === "/{id}" && event.httpMethod === "GET") {
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
                    [PRIMARY_KEY]: event.queryStringParameters.id
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
    else if (event.path === "/book" && event.resource === "/{id}" && event.httpMethod === "DELETE") {
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
                    [PRIMARY_KEY]: event.queryStringParameters.id
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
    else if (event.resource === "/book" && event.resource === "/{id}" && event.httpMethod === "PATCH") {
        // try {
        //     await docClient.update(params).promise();
        //     return { statusCode: 204, body: "" };
        // }
        // catch (err) {
        //     console.log("DynamoDB error: ", err);
        //     return { statusCode: 500, body: err };
        // }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFvQztBQUNwQyxLQUFLO0FBQ0wsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNwRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0FBR2xELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLFFBQWEsRUFBRSxFQUFnQixFQUFFO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRTFCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7UUFDdEYsSUFBSTtZQUNBLE1BQU0sTUFBTSxHQUFHO2dCQUNYLFNBQVMsRUFBRSxVQUFVO2FBQ3hCLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDcEU7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ3pDO0tBQ0o7U0FFSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1FBQzVGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUscURBQXFEO2FBQzlELENBQUM7U0FDTDtRQUVELE1BQU0sSUFBSSxHQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQztRQUU3QixJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQztZQUVGLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDeEM7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ3pDO0tBQ0o7U0FFSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1FBQ3pGLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRSxFQUFFO1lBQ2pDLE9BQU87Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLDhDQUE4QzthQUN2RCxDQUFDO1NBQ0w7UUFFRCxJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLEdBQUcsRUFBRTtvQkFDRCxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2lCQUNoRDthQUNKLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbkU7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ3pDO0tBQ0o7U0FFSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQzVGLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRSxFQUFFO1lBQ2pDLE9BQU87Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLDhDQUE4QzthQUN2RCxDQUFDO1NBQ0w7UUFFRCxJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLEdBQUcsRUFBRTtvQkFDRCxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2lCQUNoRDthQUNKLENBQUM7WUFFRixNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxHQUFHLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUN6QztLQUNKO1NBRUksSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRTtRQUMvRixRQUFRO1FBRVIsZ0RBQWdEO1FBQ2hELDRDQUE0QztRQUM1QyxJQUFJO1FBQ0osZ0JBQWdCO1FBQ2hCLDRDQUE0QztRQUM1Qyw2Q0FBNkM7UUFDN0MsSUFBSTtLQUNQO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG4vL0FXU1xuY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuY29uc3QgZG9jQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgfHwgJyc7XG5jb25zdCBQUklNQVJZX0tFWSA9IHByb2Nlc3MuZW52LlBSSU1BUllfS0VZIHx8ICcnO1xuXG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55ID0ge30pOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnNvbGUubG9nKFwic2Rhc1wiLCBldmVudClcblxuICAgIGlmIChldmVudC5wYXRoID09PSBcIi9ib29rc1wiICYmIGV2ZW50LnJlc291cmNlID09PSBcIi9ib29rc1wiICYmIGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jQ2xpZW50LnNjYW4ocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiAyMDAsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLkl0ZW1zKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRHluYW1vREIgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNTAwLCBib2R5OiBlcnIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGV2ZW50LnBhdGggPT09IFwiL2Jvb2tzXCIgJiYgZXZlbnQucmVzb3VyY2UgPT09IFwiL2Jvb2tzXCIgJiYgZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgaWYgKCFldmVudC5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgICAgICAgICBib2R5OiBcImludmFsaWQgcmVxdWVzdCwgeW91IGFyZSBtaXNzaW5nIHRoZSBwYXJhbWV0ZXIgYm9keVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IHR5cGVvZiBldmVudC5ib2R5ID09IFwib2JqZWN0XCIgPyBldmVudC5ib2R5IDogSlNPTi5wYXJzZShldmVudC5ib2R5KTtcbiAgICAgICAgaXRlbVtQUklNQVJZX0tFWV0gPSB1dWlkdjQoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICBJdGVtOiBpdGVtXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBhd2FpdCBkb2NDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjAxLCBib2R5OiBcIlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEeW5hbW9EQiBlcnJvcjogXCIsIGVycik7XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IGVyciB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZXZlbnQucGF0aCA9PT0gXCIvYm9va1wiICYmIGV2ZW50LnJlc291cmNlID09PSBcIi97aWR9XCIgJiYgZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJHRVRcIikge1xuICAgICAgICBpZiAoIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgICAgICAgICAgYm9keTogXCJFcnJvcjogWW91IGFyZSBtaXNzaW5nIHRoZSBwYXRoIHBhcmFtZXRlciBpZFwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgS2V5OiB7XG4gICAgICAgICAgICAgICAgICAgIFtQUklNQVJZX0tFWV06IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jQ2xpZW50LmdldChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IDIwMCwgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuSXRlbSkgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkR5bmFtb0RCIGVycm9yOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IDUwMCwgYm9keTogZXJyIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbHNlIGlmIChldmVudC5wYXRoID09PSBcIi9ib29rXCIgJiYgZXZlbnQucmVzb3VyY2UgPT09IFwiL3tpZH1cIiAmJiBldmVudC5odHRwTWV0aG9kID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIGlmICghZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgICAgICAgICBib2R5OiBcIkVycm9yOiBZb3UgYXJlIG1pc3NpbmcgdGhlIHBhdGggcGFyYW1ldGVyIGlkXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICBLZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgW1BSSU1BUllfS0VZXTogZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLmlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgYXdhaXQgZG9jQ2xpZW50LmRlbGV0ZShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IDIwMCwgYm9keTogXCJcIiB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRHluYW1vREIgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNTAwLCBib2R5OiBlcnIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGV2ZW50LnJlc291cmNlID09PSBcIi9ib29rXCIgJiYgZXZlbnQucmVzb3VyY2UgPT09IFwiL3tpZH1cIiAmJiBldmVudC5odHRwTWV0aG9kID09PSBcIlBBVENIXCIpIHtcbiAgICAgICAgLy8gdHJ5IHtcblxuICAgICAgICAvLyAgICAgYXdhaXQgZG9jQ2xpZW50LnVwZGF0ZShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgLy8gICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IDIwNCwgYm9keTogXCJcIiB9O1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiRHluYW1vREIgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNTAwLCBib2R5OiBlcnIgfTtcbiAgICAgICAgLy8gfVxuICAgIH1cbn0iXX0=