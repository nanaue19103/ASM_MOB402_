const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars');
const { extname } = require('path');

const app = express()
const port = 3030

app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resourse\\views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');

app.use('/users',userRouter.router);
app.use('/products',productRouter.router);
app.use('/admins',adminRouter.router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})