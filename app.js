import open from 'open';
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';



const app = express();
const port = 3000;
const debugApp = debug('app');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.listen(port, () => {
  debugApp(chalk.green('app started'));
  open(`http://localhost:${port}`);
});
