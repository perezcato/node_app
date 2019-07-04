/* eslint-disable linebreak-style */
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import bookrouter from './src/routes/bookrouter';

const app = express();
const port = process.env.PORT;

const debugApp = debug('app');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use('/books/', bookrouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Library',
      nav: [
        { name: 'Books', link: '/books' },
        { name: 'Author', link: '/author' },
      ],
    });
});

app.listen(port, () => {
  debugApp(chalk.green('app started'));
});
