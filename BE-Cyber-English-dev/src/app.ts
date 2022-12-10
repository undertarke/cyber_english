import "reflect-metadata";
import cors from "cors";
import bodyParser from "body-parser";

import express from "express";
import { container, singleton } from "tsyringe";
import VocabularyRouter from "./router/vocabularies";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import ReadingRouter from "./router/reading";
import UserRouter from "./router/users";
import MultipleChoiceRouter from "./router/multipleChoice";
import ListeningComprehension from "./router/listeningComprehension";
import UnitRouter from "./router/unit";
import FlashCardRouter from "./router/flashCard";
import LoggerService from "./config/logger";
import UserService from "./services/user.service";
const path = require("path");

@singleton()
class AppRouter {
  appRouter = express();
  private logger: LoggerService = container.resolve(LoggerService);
  private nameSpace = "App";
  constructor(
    private vocabulary: VocabularyRouter,
    private listening: ListeningComprehension,
    private reading: ReadingRouter,
    private user: UserRouter,
    private multipleChoice: MultipleChoiceRouter,
    private unit: UnitRouter,
    private flashCard: FlashCardRouter,
    private userSev: UserService,


  ) {
    this.appRouter = express();
    /** Parse the body of the request */
    this.appRouter.use(cors());
    this.appRouter.use(bodyParser.urlencoded({ extended: false }));
    this.appRouter.use(bodyParser.json({ limit: "50mb" }));
    /** Routes go here */
    this.appRouter.use(
      "/api/swagger",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    // this.appRouter.get("/api/swagger", swaggerUi.setup(swaggerDocument));

    /** Error handling */
    this.appRouter.use((req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
      this.logger.request(ip, req.originalUrl, req.method, req.body);
      next();
    });

    // static
    const publicPathDirectory = path.join(__dirname, "../public");
    this.appRouter.use("/assets", express.static(publicPathDirectory));

    this.appRouter.use("/api/vocabulary", this.vocabulary.router);
    this.appRouter.use("/api/listening", this.listening.router);
    this.appRouter.use("/api/reading", this.reading.router);
    this.appRouter.use("/api/multiple-choice", this.multipleChoice.router);
    this.appRouter.use("/api/flash-card", this.flashCard.router);
    this.appRouter.use("/api/unit", this.unit.router);
    this.appRouter.use("/api/user", this.user.router);

    //
    this.appRouter.post("/update-users/", (req, res) => {
      const { id, email, check, date } = req.body;
      this.userSev.getUserEmail(id, email, check, date).then(result => {

        res.send(result);

      });
    })
  }

  log = (data: any, message: string = "") => {
    this.logger.info(this.nameSpace, message, data);
  };
}

export default AppRouter;
