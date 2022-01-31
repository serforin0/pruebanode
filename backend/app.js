const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');


const config = require('./config/config.json')
const app = express();

app.use(bodyParser.json());

app.use(cors());

// graphql
app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    })
)

// app.listen(4000, () => console.log('Server on por 4000'));
const URI = `mongodb+srv://${config.user}:${config.password}@cluster0.ppt3d.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
mongoose.connect(
    URI,{
        useUnifiedTopology: true, 
        useNewUrlParser: true
        // useCreateIndex: true
    }
).then(() => {
    app.listen(4000, console.log("connected to port 4000."))
}).catch((err) => console.log(err))