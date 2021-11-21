const express = require('express');
const app = express();
const cors = require('cors');
const recipes = require('./router/recipes')

app.use(
    cors( {
      origin: ["http://localhost:3000", "http://192.168.1.234:3000",
       "https://dianas-kitchenette.netlify.app"]
    })
  );
app.use(express.json());


app.use('/', recipes)


app.listen(process.env.PORT || 8080, () => console.log('server is up and running!'));