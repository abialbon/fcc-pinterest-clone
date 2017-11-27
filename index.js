const    express    = require('express'),
         app        = express(),
         db         = require('./server/models/db');

// 🔥 Connecting to the database
db.connect(process.env.DB_URL);

app.get('/', (req, res) => {
   res.send('The pinterest clone is coming up soon!');
});

// 🌎 Listen to PORT
app.listen(process.env.PORT || 3000, () => {
   console.log(`The server is running on port: ${process.env.PORT}` );
});