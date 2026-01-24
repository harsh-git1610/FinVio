import CreateInvoice from "@/components/CreateInvoice";
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";

export default async function CreateInvoiceRoute() {
    const { userId } = await auth();

    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId as string,
        },
    });

    return (
        <CreateInvoice
            firstName={user?.firstName as string}
            lastName={user?.lastName as string}
            address={user?.address as string}
            email={user?.email as string}
            businessName={user?.businessName as string}
        />
    );
}