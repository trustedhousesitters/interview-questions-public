# Pet Listing App

This repository contains a basic React application, with a listing page for pets which is currently empty.

Mock service worker (MSW) is set up to intercept API calls, allowing us to simulate server responses without needing a real backend. Currently there is 1 api endpoint available at `/api/pets` which returns a randomised list of pets. Please note that this endpoint is not queryable outside of the app as MSW patches the browser to intercept requests.

Hitting the `/api/pets` endpoint will return a list of pets in the following format:

```json
[
  {
    "id": 0,
    "name": "Fluffy",
    "type": "Dog",
    "age": 3,
    "feeds": 6
  },
  {
    "id": 1,
    "name": "Whiskers",
    "type": "Cat",
    "age": 2,
    "feeds": 2
  }
]
```

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
