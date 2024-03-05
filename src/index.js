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

const PORT = process.env.PORT || 3001;

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);
app.use("/api/device", deviceRoute);
app.use("/api/data/tbl", dataTableHandlingRoute);
app.use("/api/data/clm", columnRoute);
app.use("/api/data/config", dataConfigRoute);
app.use("/api/data/feed", dataGatheringRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});