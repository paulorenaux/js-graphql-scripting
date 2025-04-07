import fetch, { Headers } from 'node-fetch';
import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';
import 'dotenv/config';

// Ensure global fetch and Headers are defined
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
}

class GraphQLService {
    constructor() {
        this.tokenUrl = process.env.API_TOKEN_URL;
        this.graphqlUrl = process.env.API_GRAPHQL_ENDPOINT;
        this.clientId = process.env.API_CLIENT_ID;
        this.clientSecret = process.env.API_CLIENT_SECRET;
        this.username = process.env.API_USERNAME;
        this.password = process.env.API_PWD;
        this.searchParams = new URLSearchParams({
            grant_type: 'password',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            username: this.username,
            password: this.password
        });
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }

    // Function to get OAuth 2.0 token using Resource Owner Password Credentials
    async getToken() {
        try {
            const response = await axios.post(this.tokenUrl, this.searchParams, { headers: this.headers });
            return response.data.access_token;
        } catch (error) {
            console.error('Error fetching token:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    // Function to send GraphQL request
    async sendGraphQLRequest(query, variables) {
        try {
            const token = await this.getToken();

            const client = new GraphQLClient(this.graphqlUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return await client.request(query, variables);
        } catch (error) {
            console.error('Error sending GraphQL request:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

// Example usage
(async () => {
    const service = new GraphQLService();

    try {
        const response = await service.sendGraphQLRequest(query, variables);
    } catch (error) {
        console.error('Error:', error);
    }
})();
