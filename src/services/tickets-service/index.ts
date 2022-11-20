import TicketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { TicketType, Ticket } from "@prisma/client";
//import httpStatus from "http-status";

async function pegarTickets(): Promise<TicketType[]> {
  const result = TicketRepository.FindManyTickets();

  return result;
}

async function pegarTicketUser(userId: number): Promise<Ticket> {
  const enrollmentFromUser = await enrollmentRepository.findWithAddressByUserId(userId);
  const { id } = enrollmentFromUser;
  
  if (!enrollmentFromUser) throw notFoundError;

  const result = TicketRepository.TicketUser(id);

  if (!result) throw notFoundError;

  return result;
}

async function criarTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  const enrollmentFromUser = await enrollmentRepository.findWithAddressByUserId(userId);
  const { id } = enrollmentFromUser;

  if (!enrollmentFromUser) throw notFoundError;

  const result = await TicketRepository.CreateTicket(id, ticketTypeId);

  return result;
}

const TicketService = {
  pegarTickets,
  pegarTicketUser,
  criarTicket
};

export default TicketService;

