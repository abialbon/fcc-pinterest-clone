const   express     = require('express'),
        app         = express(),
        path        = require('path'),
        jwt         = require('jsonwebtoken'),
        db          = require('./server/models/db'),
        cors        = require('cors'),
        bodyParser  = require('body-parser'),
        authRoutes  = require('./server/routes/auth'),
        pinRoutes   = require('./server/routes/pin');

// 🔥 Connecting to the database
db.connect(process.env.DB_URL);
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'server/static')));
app.use(express.static(path.join(__dirname, 'client/dist')));

// Middleware that sets req.userID to the user's ID if authorization token is present and valid
app.use((req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, payload) => {
            if (!err) {
                req.userID = payload.user_id;
            }
        })
    }
    next();
});

app.use('/auth', authRoutes);
app.use('/api', pinRoutes);
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname,'/server/static/index.html'));
});

// 🌎 Listen to PORT
app.listen(process.env.PORT || 3000, () => {
   console.log(`The server is running on port: ${process.env.PORT}` );
});