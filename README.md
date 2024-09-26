# Exchange rates backend app

A backend for a currency converter and exchange rates app.
Using [SWOP](https://swop.cx) open source API for getting exchage rates.
The app was developed using basic free subscription.

- Convert one currency to another with a desired amount
- See exchage rates of pupular currencies against a selected currency to convert from

This backend app is done with `Nestjs` framework and `typescript` language

## Frontend

You will need to run frontend app locally.
Visit [https://github.com/vladis-c/exchange-rates-fe](https://github.com/vladis-c/exchange-rates-fe) to check the instructions on how to set it up on your machine

## Run the app

0. Add `.env` file:

- Add `SWOP_API_KEY`
- Add `SWOP_URL`

```
SWOP_API_KEY=<YOUR_KEY>
SWOP_URL='https://swop.cx/rest'
```

1. Clone the repository:

```bash
git clone https://github.com/vladis-c/exchange-rates-be.git
```

2. Navigate to the project folder:

```bash
cd exchange-rates-be
```

3. Install dependenciesL

- Install `yarn` if you do not have it on your machine:

```bash
npm i -g yarn
```

- Then install the dependencies:

```bash
yarn
```

4. Run server:

- to watch the changes

```bash
yarn start:dev
```

- or to start the server without watch

```bash
yarn start
```

- The server will be running on [http://localhost:8000](http://localhost:8000)

## Tests

The can be found in `__tests__` folder in the root of the app.

0. Make sure all dependencies are installed:

```bash
yarn
```

1. Run tests:

```bash
yarn test
```

2. Run individual tests:

```bash
npx jest -t <NAME_OF_THE_TEST>
```
