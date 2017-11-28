const   express     = require('express'),
        app         = express(),
        db          = require('./server/models/db'),
        cors        = require('cors'),
        bodyParser  = require('body-parser'),
        authRoutes  = require('./server/routes/auth');

// 🔥 Connecting to the database
db.connect(process.env.DB_URL);
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('The pinterest clone is coming up soon!');
});

app.use('/auth', authRoutes);

// 🌎 Listen to PORT
app.listen(process.env.PORT || 3000, () => {
   console.log(`The server is running on port: ${process.env.PORT}` );
});