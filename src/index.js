const app = require('./app');
const verifyToken = require('./middlewares/verifyJWT');

// Routes
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const projectRoute = require('./routes/projectRoute');
const deviceRoute = require('./routes/deviceRoute');
const dataTableHandlingRoute = require('./routes/dataTableHandlingRoute');

const PORT = process.env.PORT || 3001;

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/device', verifyToken, deviceRoute);
app.use('/api/data/tbl', dataTableHandlingRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

