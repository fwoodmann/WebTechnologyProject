const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const port = 3000,
  express = require("express"),
  app = express();

app.get("/", homeController.logPort).listen(port, () => {
  console.log(`The Express.js server has started and is listening!on port number: ${port}`);
});

app.use(homeController.logRequestPaths);

app.post("/sign_up", homeController.userSignUpProcessor);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);