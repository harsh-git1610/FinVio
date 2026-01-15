import InvoiceList from "@/components/invoiceList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoiceRoute(){
   return(
    <Card>  
      <CardHeader>
         <div className="flex items-center justify-between">
            <div>
               <CardTitle className="text-2xl">Invoices</CardTitle>
               <CardDescription>Manage your invoices</CardDescription>
            </div>
            <Link href = "/dashboard/invoices/Create" className={buttonVariants()}>
            <PlusIcon/> Create Invoice
            </Link>
         </div>
         <InvoiceList/>
      </CardHeader>
    </Card>
    
    

   ); 
}