const express = require('express');
const app = express();
const PORT = 3000;

// Enable JSON parsing middleware (essential for processing API requests)
app.use(express.json());

// Define a basic route for HTTP GET requests
app.get('/', (req, res) => {
    res.send('Hello World! Your Express server is working.');
});

// Start the server and listen on the assigned port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
