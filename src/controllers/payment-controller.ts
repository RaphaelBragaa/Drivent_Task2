import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payment-service";
import { CreatePayment } from "@/protocols";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  if(!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result = await paymentsService.getPayment(userId, Number(ticketId));
    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body as CreatePayment;

  if (!ticketId || !cardData) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  } 

  try {
    const result = await paymentsService.postPayment(userId, { ticketId, cardData });

    return res.status(httpStatus.OK).send(result);
  } catch(error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
