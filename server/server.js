const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const cors = require('cors');
const prisma = new PrismaClient();
const userRoute = require('./routes/user.route');
const projectRoute = require('./routes/project.route');
const fieldRoute = require('./routes/field.route');
const fileRoute = require('./routes/file.route');
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use('/users', userRoute);
app.use('/projects', projectRoute);
app.use('/fields', fieldRoute);
app.use('/files', fileRoute);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
    }
);