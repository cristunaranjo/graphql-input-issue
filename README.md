# GraphQL Input Issue Repository

This is a simple GraphQL API built with Apollo Server 4 to demonstrate type validation behavior. The server defines a UserInput type and a mutation to update a user, expecting a single object. This repo is designed to replicate and test how Apollo Server handles invalid input, such as an array passed to a non-array argument.

## Running the Server

Install dependencies running the following command:

```bash
npm install
```

Start the Server Run the following command in your terminal:

```bash
node index.js
```

You should see a message like:

```text
🚀 Server ready at http://localhost:4000/
```

Access the Apollo Sandbox Open your browser and navigate to <http://localhost:4000/>. This loads the Apollo Sandbox, a web-based GraphQL IDE for testing queries and mutations.

## Testing the Mutation

The server exposes a updateUser mutation that expects a single UserInput object. To test how it handles an invalid input (an array instead of an object), use the following steps:

Open Apollo Sandbox Go to <http://localhost:4000/> in your browser.

Run the Mutation In the Apollo Sandbox, enter the following mutation:

```graphql
mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
        firstName
        lastName
        businessPhone
        email
        jobTitle
    }
}
```

Provide the Variables In the "Variables" section of Apollo Sandbox (usually at the bottom), paste this JSON payload:

```json
{
    "user": [
        {
            "firstName": "test",
            "lastName": "test",
            "businessPhone": "test",
            "email": "test@email.com",
            "jobTitle": "test"
        },
        {
            "firstName": "test",
            "lastName": "test",
            "businessPhone": "test",
            "email": "test@email.com",
            "jobTitle": "test"
        },
        {
            "firstName": "test",
            "lastName": "test",
            "businessPhone": "test",
            "email": "test@email.com",
            "jobTitle": "test"
        }
    ]
}
```

Execute the Mutation Click the "Run" or "Play" button in Apollo Sandbox.

_Expected Behavior_

The mutation expects a single UserInput object, but the provided payload is an array of objects. Apollo Server’s type validation rejects the request before executing the resolver, returning a single error message indicating a type mismatch.

_Current Behavior_

Apollo Server returns an error per element of the array:

```text
"GraphQLError: Field \"2\" is not defined by type \"UserInput\".",
```
