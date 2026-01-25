
import CreateInvoice from "@/components/CreateInvoice";
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function EditInvoice({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) return redirect("/login");

    const invoice = await prisma.invoice.findFirst({
        where: {
            id,
            user: {
                clerkId: userId
            }
        },
    });

    if (!invoice) return notFound();

    return (
        <CreateInvoice invoice={invoice} />
    );
}
