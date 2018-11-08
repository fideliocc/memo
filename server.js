const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require('./routes/api/profile');
const superusers = require('./routes/api/admin/users')
const superposts = require('./routes/api/admin/posts')


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* DB Config */
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Using Routes
app.use("/api/users", users);
app.use('/api/profile', profile);
app.use("/api/posts", posts);
app.use("/api/admin/users", superusers);  // Admin auth route!!!
app.use("/api/admin/posts", superposts);  // Admin posts route!!!

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Any route use the static folder /index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// App listens on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
