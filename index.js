const bodyParser = require('body-parser');
const express = require('express');
const routerProducts = require('./router/routerProducts');
const arrorMiddleware = require('./middleware/errorHandle');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/products', routerProducts);
app.use(arrorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
