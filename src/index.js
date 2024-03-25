const app = require("./app");
const verifyToken = require("./middlewares/verifyJWT");

// Import associations
require("./associations/associations");

// Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");
const deviceRoute = require("./routes/deviceRoute");
const dataConfigRoute = require("./routes/dataConfigRoute");
const dataTableHandlingRoute = require("./routes/dataTableHandlingRoute");
const columnRoute = require("./routes/columnRoute");
const dataGatheringRoute = require("./routes/dataGatheringRoute");
const dataRetrievalRoute = require("./routes/dataRetrievalRoute");

const PORT = process.env.PORT || 3001;

app.use("/api/user", userRoute);
app.use("/api/auth", verifyToken, authRoute);
app.use("/api/project", verifyToken, projectRoute);
app.use("/api/device", verifyToken, deviceRoute);
app.use("/api/data/tbl", verifyToken, dataTableHandlingRoute);
app.use("/api/data/clm", verifyToken, columnRoute);
app.use("/api/data/config", verifyToken, dataConfigRoute);
app.use("/api/data/feed", dataGatheringRoute); // JWT middleware is not needed because data sent through this route is public
app.use("/api/data/get", verifyToken, dataRetrievalRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});