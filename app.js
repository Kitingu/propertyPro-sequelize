import express from "express";
import logger from "morgan";
import userRoutes from "./routes/user";
import { handlers } from "./middlewares/error-handler";
import propertyRoutes from "./routes/property-routes";
import config from './config'
const { handle404, handle500, methodNotAllowed } = handlers;
// Set up the express app
const app = express();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v2/", userRoutes);
app.use('/api/v2/',propertyRoutes);

// handle 404 error
app.use(handle404);

// handle 405
app.use(methodNotAllowed);

// handle 500
app.use(handle500);

const PORT = config.appConfig.port || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

export default app;
