const express = require("express");
const bodyParser= require("body-parser");
const MongoClient=require('mongodb').MongoClient;
const mongodb=require('./database/connect');

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

app.use(bodyParser.json());
app.use((req,res,next) => 
    {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader
        (
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-with, Content.Type, Accept, Z-key'
        )
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    }
);

app.use('/', require("./routes"));

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