require("@babel/register");
const chalk = require("chalk");
const dotenv = require("dotenv");
const cluster = require("cluster");
const numCores = require("os").cpus().length;
const app = require("./app");
const port = process.env.APP_PORT || 3000;

process.on("uncaughtException", (uncaughtExc) => {
  console.log("uncaughtException Err::", uncaughtExc);
  console.log("uncaughtException Stack::", JSON.stringify(uncaughtExc.stack));
  process.exit(1);
});

const workers = [];
const setupWorkerProcesses = () => {
  console.log(`Master cluster setting up ${numCores} workers`);

  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());

    workers[i].on("message", function (message) {
      console.log(message);
    });
  }

  cluster.on("online", function (worker) {
    console.log(`Worker ${worker.process.pid} is listening`);
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
    workers.push(cluster.fork());
    workers[workers.length - 1].on("message", function (message) {
      console.log(message);
    });
  });
};

const setUpExpress = () => {
  dotenv.config({ path: ".env" });

  const server = app.listen(port, () => {
    console.log(`App running on port ${chalk.greenBright(port)}...`);
  });

  app.on("error", (appErr, appCtx) => {
    console.error("app error", appErr.stack);
    console.error("on url", appCtx.req.url);
    console.error("with headers", appCtx.req.headers);
  });

  process.on("unhandledRejection", (err) => {
    console.log(chalk.bgRed("UNHANDLED REJECTION! 💥 Shutting down..."));
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
      console.log("💥 Process terminated!");
    });
  });
};

const setupServer = (isClusterRequired) => {
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    setUpExpress();
  }
};

if (process.env.NODE_ENV === "production") {
  setupServer(true);
} else {
  setupServer(false);
}
