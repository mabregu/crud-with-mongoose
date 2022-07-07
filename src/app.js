const express = require('express');
const app = express();

const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/usersRoutes');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api', mainRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, async () => {
    try {
        console.log(`Server is listening on port http://localhost:${PORT}/api`);
    } catch (error) {
        console.error(error);
    }
});