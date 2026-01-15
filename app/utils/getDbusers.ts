import { prisma } from "@/app/utils/db"
import { currentUser } from "@clerk/nextjs/server"

export async function getOrCreateDbUser(clerkId: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (user) return user

  const clerkUser = await currentUser()
  if (!clerkUser) return null

  return prisma.user.create({
    data: {
      clerkId,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName ?? "",
      lastName: clerkUser.lastName ?? "",
    },
  })
}
