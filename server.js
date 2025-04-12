const express = require("express");
const bodyParser= require("body-parser");
const MongoClient=require('mongodb').MongoClient;
const mongodb=require('./database/connect');
const passport=require("passport");
const session=require("express-session");
const GitHubStrategy= require("passport-github2").Strategy;
const dotenv=require('dotenv');
const cors=require('cors');



process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

const app = express();

const port=process.env.PORT || 3000; 

app.use(bodyParser.json())
.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-with, Content.Type, Accept, Z-key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({origin: '*'}))
.use('/', require("./routes"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done)
{
    return done(null, profile);
}
));

passport.serializeUser((user, done)=>{
    done(null,user);
});
passport.deserializeUser((user, done)=>{
    done(null,user);
});
app.get('/', (req, res)=>{
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});
app.get('/github/callback' , passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req,res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err,mongodb) =>
  {
      if (err)
      {
          console.log(err);
      }
      else
      {
          app.listen(port);
          console.log(`Connected to DB and listening on ${port}`);
      }
  }); 