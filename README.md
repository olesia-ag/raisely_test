Using the front-end framework of your choice, create a basic signup form that asks for a user’s first name, last name, email address and password. Your form should make a POST request to https://api.raisely.com/v3/signup with a JSON payload, with the following shape:

{ "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a", "data": { "firstName": "the user's first name", "lastName": "the user's last name", "email": "the user's email address", "password": "the user's password" } }
{"campaignUuid":"46aa3270-d2ee-11ea-a9f0-e9a68ccff42a","data":{"firstName":"Olesia","lastName":"Guidi","email":"olgarbuzova@gmail.com","password":"fghjkllk"}}
{
"campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
"data": {
"firstName": "Olesia",
"lastName": "Guidi",
"email": "olesiaguidi@gmail.com",
"password": "12345678"
}
}
You'll also need to asynchronously validate the email address. If you make a POST request to https://api.raisely.com/v3/check-user with the body

{ "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a", "data": { "email": "the user's email address", } }
You'll receive either a:

{ "data": { "status": "OK", } }
Or

{ "data": { "status": "EXISTS", } }
Your form should consider a status of EXISTS as an invalid value and prompt the user to choose a new email address.

You can use the email address test@test.com as an example of an invalid address.

Consider the user experience when adding this, and try prompting the user before submit.

When you’re building your form think about things like validation, error handling and user experience. Feel free to use any libraries or packages that you'd usually use. We think this should take you an hour or two.

Your form, and the source code, will need to be publicly accessible, so we'd recommend using CodeSandbox or a similar service, but we'll also accept a hosted page with a link to the source repository.
