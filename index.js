const express = require('express');
const app = express();
const cors = require('cors');
const recipes = require('./router/recipes');;
const users = require('./router/users')

app.use(
    cors( {
      origin: ["http://localhost:3000", "http://192.168.1.234:3000",
       "https://dianas-kitchenette.netlify.app", "http://90.231.157.5"],
        credentials: true,
    })
  );
app.use(express.json());


app.use('/', recipes);
app.use('/users/', users);


app.listen(process.env.PORT || 80, () => console.log('server is up and running!'));
