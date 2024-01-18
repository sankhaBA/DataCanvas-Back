const app = require('./app');
const verifyToken = require('./middlewares/verifyJWT');

// Routes
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const projectRoute = require('./routes/projectRoute');

const PORT = process.env.PORT || 3001;

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/project', verifyToken, projectRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

