import { Payment } from "@prisma/client";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { CreatePayment } from "@/protocols";

async function getPayment(userId: number, ticketId: number): Promise<Payment> {
  const ticket = await ticketRepository.FindTicketId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  const result = await paymentRepository.FindPayment(ticketId);

  return result;
}

async function postPayment(userId: number, { ticketId, cardData }: CreatePayment): Promise<Payment> {
  const ticket = await ticketRepository.FindTicketId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  } 
  const UpdatedTicket = await ticketRepository.UpdateTicketStatus(ticketId);
  const InsertPayment = {
    ticketId,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.slice(-4),
    value: UpdatedTicket.TicketType.price,
  };
  const result = await paymentRepository.CreatePayment(InsertPayment);
  return result;
}

const paymentsService = {
  getPayment,
  postPayment
};

export default paymentsService;
