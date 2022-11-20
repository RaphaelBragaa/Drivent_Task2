import { AuthenticatedRequest } from "@/middlewares";
import TicketService from "@/services/tickets-service";

import { Response } from "express";
import httpStatus from "http-status";

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  try{
    const result = await TicketService.pegarTickets();
    if(!result) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(result.map(value => value));
  } catch(error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function getTicketFromUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try{
    const result = await TicketService.pegarTicketUser(userId);
    if(!result) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(result);
  } catch(error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId  } = req.body as TicketId;

  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try{
    const result = await TicketService.criarTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(result);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export type TicketId = { ticketTypeId: number | undefined }
