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
            console.log("sdas1", event);
            const response = await docClient.scan(params).promise();
            return { statusCode: 200, body: JSON.stringify(response.Items) };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            console.log("sdas2", event);
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
            console.log("sdas3", event);
            await docClient.put(params).promise();
            return { statusCode: 201, body: "" };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            console.log("sdas4", event);
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
            console.log("sdas5", event);
            return { statusCode: 200, body: JSON.stringify(response.Item) };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            console.log("sdas6", event);
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
            console.log("sdas7", event);
            await docClient.delete(params).promise();
            return { statusCode: 200, body: "" };
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            console.log("sdas8", event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFvQztBQUNwQyxLQUFLO0FBQ0wsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNwRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0FBR2xELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLFFBQWEsRUFBRSxFQUFnQixFQUFFO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRTFCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7UUFDdEYsSUFBSTtZQUNBLE1BQU0sTUFBTSxHQUFHO2dCQUNYLFNBQVMsRUFBRSxVQUFVO2FBQ3hCLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUUzQixNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDcEU7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVB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O0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG4vL0FXU1xuY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuY29uc3QgZG9jQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgfHwgJyc7XG5jb25zdCBQUklNQVJZX0tFWSA9IHByb2Nlc3MuZW52LlBSSU1BUllfS0VZIHx8ICcnO1xuXG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55ID0ge30pOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnNvbGUubG9nKFwic2Rhc1wiLCBldmVudClcblxuICAgIGlmIChldmVudC5wYXRoID09PSBcIi9ib29rc1wiICYmIGV2ZW50LnJlc291cmNlID09PSBcIi9ib29rc1wiICYmIGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkYXMxXCIsIGV2ZW50KVxuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRvY0NsaWVudC5zY2FuKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjAwLCBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5JdGVtcykgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkR5bmFtb0RCIGVycm9yOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RhczJcIiwgZXZlbnQpXG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IGVyciB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZXZlbnQucGF0aCA9PT0gXCIvYm9va3NcIiAmJiBldmVudC5yZXNvdXJjZSA9PT0gXCIvYm9va3NcIiAmJiBldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgICBpZiAoIWV2ZW50LmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICAgICAgICAgIGJvZHk6IFwiaW52YWxpZCByZXF1ZXN0LCB5b3UgYXJlIG1pc3NpbmcgdGhlIHBhcmFtZXRlciBib2R5XCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpdGVtID0gdHlwZW9mIGV2ZW50LmJvZHkgPT0gXCJvYmplY3RcIiA/IGV2ZW50LmJvZHkgOiBKU09OLnBhcnNlKGV2ZW50LmJvZHkpO1xuICAgICAgICBpdGVtW1BSSU1BUllfS0VZXSA9IHV1aWR2NCgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIEl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RhczNcIiwgZXZlbnQpXG4gICAgICAgICAgICBhd2FpdCBkb2NDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjAxLCBib2R5OiBcIlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEeW5hbW9EQiBlcnJvcjogXCIsIGVycik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkYXM0XCIsIGV2ZW50KVxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNTAwLCBib2R5OiBlcnIgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGV2ZW50LnBhdGggPT09IFwiL2Jvb2tcIiAmJiBldmVudC5yZXNvdXJjZSA9PT0gXCIve2lkfVwiICYmIGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgaWYgKCFldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICAgICAgICAgIGJvZHk6IFwiRXJyb3I6IFlvdSBhcmUgbWlzc2luZyB0aGUgcGF0aCBwYXJhbWV0ZXIgaWRcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIEtleToge1xuICAgICAgICAgICAgICAgICAgICBbUFJJTUFSWV9LRVldOiBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMuaWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRvY0NsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkYXM1XCIsIGV2ZW50KVxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjAwLCBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5JdGVtKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRHluYW1vREIgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZGFzNlwiLCBldmVudClcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IDUwMCwgYm9keTogZXJyIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbHNlIGlmIChldmVudC5wYXRoID09PSBcIi9ib29rXCIgJiYgZXZlbnQucmVzb3VyY2UgPT09IFwiL3tpZH1cIiAmJiBldmVudC5odHRwTWV0aG9kID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIGlmICghZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgICAgICAgICBib2R5OiBcIkVycm9yOiBZb3UgYXJlIG1pc3NpbmcgdGhlIHBhdGggcGFyYW1ldGVyIGlkXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICBLZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgW1BSSU1BUllfS0VZXTogZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLmlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZGFzN1wiLCBldmVudClcbiAgICAgICAgICAgIGF3YWl0IGRvY0NsaWVudC5kZWxldGUocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiAyMDAsIGJvZHk6IFwiXCIgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkR5bmFtb0RCIGVycm9yOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RhczhcIiwgZXZlbnQpXG4gICAgICAgICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IGVyciB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZXZlbnQucmVzb3VyY2UgPT09IFwiL2Jvb2tcIiAmJiBldmVudC5yZXNvdXJjZSA9PT0gXCIve2lkfVwiICYmIGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUEFUQ0hcIikge1xuICAgICAgICAvLyB0cnkge1xuXG4gICAgICAgIC8vICAgICBhd2FpdCBkb2NDbGllbnQudXBkYXRlKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjA0LCBib2R5OiBcIlwiIH07XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJEeW5hbW9EQiBlcnJvcjogXCIsIGVycik7XG4gICAgICAgIC8vICAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IGVyciB9O1xuICAgICAgICAvLyB9XG4gICAgfVxufSJdfQ==