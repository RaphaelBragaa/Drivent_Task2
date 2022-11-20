import { Router } from "express";

import { authenticateToken } from "@/middlewares";

import { getTicket, getTicketFromUser, postTicket,  } from "@/controllers/ticket-controller";

const ticketRouter = Router();

ticketRouter.all("/*", authenticateToken);
ticketRouter.get("/types", getTicket);
ticketRouter.get("/", getTicketFromUser);
ticketRouter.post("/", postTicket);

export { ticketRouter };
