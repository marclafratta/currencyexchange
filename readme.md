# Currency Conversion API

## API Usage

The only method used in this API is GET. The API takes the currencies to be converted in the parameters of the get request and the amount and date as query parameters.

EX /convert/{base currency}/{to currency}/{date year-month-day}/{amount}

## Running Locally

After inststalling all dependencies with npm install, the server can be started with npm start. It will listen on port 8080.