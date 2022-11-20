import { prisma } from "@/config";
import { CreatePaymentParams } from "@/protocols";

async function FindPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function CreatePayment(createPaymentParams: CreatePaymentParams) {
  return prisma.payment.create({
    data: createPaymentParams,
  });
}

const PaymentRepository = {
  FindPayment,
  CreatePayment
};

export default PaymentRepository;
