const   express     = require('express'),
        app         = express();

app.get('/', (req, res) => {
   res.send('The pinterest clone is coming up soon!');
});

app.listen(process.env.PORT, () => {
   console.log(`The server is running on port: ${process.env.PORT}` );
});