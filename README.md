# Setup

This is a project that runs on nodeja, so installing node and npm is required.  
The following dependencies are needed: `node-fetch`,  `axios`, `graphql-request`, `dotenv`.

# Running the project

execute `node index.js`.

# Example usage

Can also be found in `index.js`.

```js
// Example usage
(async () => {
    const service = new GraphQLService();
    query = gql`(your query here)`
    variables = { attrName: "value"}
    try {
        const response = await service.sendGraphQLRequest(query, variables);
        // add assertions on response here
    } catch (error) {
        console.error('Error:', error);
    }
})();
```
