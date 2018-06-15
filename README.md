# The Flashcard Api

This is a sample api to use for testing your React 5k1llz.

## To Run

```
npm install
npm start
```

## Some Starter Paths

To get you started, you can get all the sets by doing this:

```
GET http://localhost:5003/api/sets
```

That will give you a picture of the nature of the data. The api supports creating new sets and deleting sets. The api also supports creating cards, deleting cards, and marking cards as correct and incorrect. For examples of all these operations, see the curl examples in the `curls` directory.

## Sample Data

Everything is stored in memory (for simplicity's sake). This app comes with sample data, hard-coded into `api-routes.js`. Feel free to remove or substitute your own.

## But I Don't Like How You Did X In Your Free Api

Go write your own and build a React app on top of that.
