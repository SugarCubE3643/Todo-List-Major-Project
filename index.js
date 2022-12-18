// Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require('express');
const app = express();

// Setting the appropriate port on which the website will be served
const port = 8000;

// Binds and listens for connections on the specified host and port
app.listen(port, (err) => {
    if(err){ console.log(`Error in running the server: ${err}`); }

    console.log(`Server is running on port: ${port}`);
});