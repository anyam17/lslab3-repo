const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

/* Database Connection Setup. */
mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true);
mongoose.connect(config.DATABASE);
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

/* Model importations. */
const { User } = require('./models/user');

/* Middleware Setup. */
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser());
app.use(express.static("client/build"));  // App setting for production.

/*********************************/
/***** ROUTES FOR USER . ******/
/*********************************/
app.get('/api/users', (req, res) => {
    User.find().sort({_id: 'desc'}).exec((err, data) => {
        if(err) return res.status(404).send(err);
        res.status(200).send(data);
    })
})

app.post('/api/user', (req, res) => {
    try {
        const user = new User(req.body);

        user.save((err, data) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                post: true,
                message: "User added successfully!",
                success: true
            })
        })
    } catch (e) {
        console.log(e);
    }
})

app.put('/api/user', (req, res) => {
    const id = req.query._id;

    User.findByIdAndUpdate(id, req.body, {new: true}, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: "User updated successfully!",
            success: true,
            data
        })
    })
})

app.delete('/api/user', (req, res) => {
    const id = req.query.id;
    User.findByIdAndDelete(id, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({message: "User Deleted successfully!", success: true})
    })
})





// App settings for production
if (process.env.NODE_ENV === "production") {
    const path = require("path");

    app.get("/*", (req, res) => {
        res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"))
    });
}

const port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log(`Server started successfully on port: ${port}`);
});
