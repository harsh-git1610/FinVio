import InvoiceList from "@/components/invoiceList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";

async function getData(userId: string) {
   const data = await prisma.invoice.findMany({
      where: {
         user: {
            clerkId: userId,
         }
      },
      orderBy: {
         createdAt: "desc",
      },
   });
   return data;
}

export default async function InvoiceRoute() {
   const { userId } = await auth();
   const data = await getData(userId as string);
   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-2xl">Invoices</CardTitle>
                  <CardDescription>Manage your invoices</CardDescription>
               </div>
               <Link href="/dashboard/invoices/Create" className={buttonVariants()}>
                  <PlusIcon /> Create Invoice
               </Link>
            </div>
            <InvoiceList invoices={data} />
         </CardHeader>
      </Card>
   );
}