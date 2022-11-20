import { prisma } from "@/config";
//import { TicketType } from "@prisma/client";
//import { QueryResult } from "pg";

async function FindManyTickets() {
  return prisma.ticketType.findMany();
}

async function TicketUser(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function CreateTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      status: "RESERVED",
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function FindTicketId(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
    include: {
      Enrollment: true,
    },
  });
}

function UpdateTicketStatus(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: {
      status: "PAID",
    },
    include: {
      TicketType: true,
    },
  });
}

const TicketRepository = { 
  FindManyTickets,
  TicketUser,
  CreateTicket,
  FindTicketId,
  UpdateTicketStatus
};

export default TicketRepository;
