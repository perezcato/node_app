/* eslint-disable linebreak-style */
import express from 'express';
import sql from 'mssql';

const bookrouter = express.Router();

bookrouter.route('/').get((req, res) => {
  (async function query() {
    const request = new sql.Request();
    const results = await request.query('select * from books');
    res.render('books',
      {
        title: 'Library',
        nav: [
          { name: 'Books', link: '/books' },
          { name: 'Author', link: '/author' },
        ],
        books: results.recordset,
      });
  }());
});


bookrouter.route('/:id')
  .all((req, res, next) => {
    (async function query() {
      const bookId = req.params.id;
      const request = new sql.Request();
      const result = await request.input('bookId', sql.Int, bookId).query('select * from books where id = @bookId');
      [req.book] = result.recordset;
      next();
    }());
  })
  .get((req, res) => {
    res.render('book',
      {
        title: 'Library',
        nav: [
          { name: 'Books', link: '/books' },
          { name: 'Author', link: '/author' },
        ],
        book: req.book,
      });
  });

export default bookrouter;
