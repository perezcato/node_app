/* eslint-disable linebreak-style */
import express from 'express';

const bookrouter = express.Router();
const books = [
  {
    title: 'Art of war',
    author: 'Victor Hugo',
    genre: 'Strategy',
    read: false,
  },
];


bookrouter.route('/').get((req, res) => {
  res.render('books',
    {
      title: 'Library',
      nav: [
        { name: 'Books', link: '/books' },
        { name: 'Author', link: '/author' },
      ],
      books,
    });
});


export default bookrouter;
