/* eslint-disable linebreak-style */
import express from 'express';
import { MongoClient } from 'mongodb';

const adminRouter = express.Router();

const books = [
  {
    title: 'Art of war',
    author: 'Victor Hugo',
    genre: 'Strategy',
    read: false,
  },
];


adminRouter.route('/').get((req, res) => {
  const url = 'mongodb://localhost:27017';
  const dbname = 'libraryApp';

  (async function query() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbname);
      const response = await db.collection('books').insertMany(books);
      res.json(response);
    } catch (err) {
      console.log(err.stack);
    }
    client.close();
  }());
});

export default adminRouter;
