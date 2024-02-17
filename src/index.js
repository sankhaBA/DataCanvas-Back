const app = require('./app');
const verifyToken = require('./middlewares/verifyJWT');

// Routes
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const projectRoute = require('./routes/projectRoute');
const deviceRoute = require('./routes/deviceRoute');
const dataConfigRoute = require('./routes/dataConfigRoute');
const dataTableHandlingRoute = require('./routes/dataTableHandlingRoute');
const columnRoute = require('./routes/columnRoute');

const PORT = process.env.PORT || 3001;

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/device', verifyToken, deviceRoute);
app.use('/api/data/tbl', dataTableHandlingRoute);
app.use('/api/data/clm', columnRoute);
app.use('/api/data/config', dataConfigRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

