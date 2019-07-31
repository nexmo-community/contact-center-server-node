![Nexmo](app/assets/images/nexmo.png)

# Build Your Own Contact Center (Node.js version)

This is one of the components required for Nexmo's ["Contact Center Use Case"](https://developer.nexmo.com/client-sdk/in-app-voice/contact-center-overview).

To get started, you can use this server as a basis for your application's backend. You can run it locally or deploy it to Heroku as described below.

## Start Locally

### Nexmo Account

To be able to use this application you'll need to [Sign up for a Nexmo account](https://dashboard.nexmo.com/sign-up).

### Mongo Database

Set up a database and make note of the service address. It usually starts with `mongodb://` on port `27017`. You'll need to add this to the environment file.

### Environment File

Create an environment file by copying the example file, `.example.env` to `.env`, and editing it with your own configuration. Omitting environment variables will cause the application to use default values. As Nexmo needs to be able to access the server to provide NCCOs, default values will prevent you from making calls.

```
APP_URL=http://url-for-the-server.com
PORT=4000
MOBILE_API_KEY=a-random-url-key-here
MONGO_URL=mongodb://localaddress:27017/database-name
```

### Start it!

```js
npm run dev
```

## Deploy with Heroku

This application is configured to deploy to Heroku. 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)