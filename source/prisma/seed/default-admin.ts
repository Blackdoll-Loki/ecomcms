import { $Enums } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";
import { environment } from "~/.server/shared/constants/environment.constants";
import { hashPassword } from "~/.server/shared/utils/auth.util";

export const createDefaultAdmin = async(prisma: PrismaClient) =>{
  console.log("Seeding default admin")
  const user = await prisma.user.findFirst({where:{email: environment.users.admin.email}})

  if(user){
    console.log("Default admin already exist")
    return;
  }
  console.log("Creating default admin")
  await prisma.user.create({
    data: {
      fullname: 'Default admin',
      email: environment.users.admin.email,
      password: await hashPassword(environment.users.admin.password),
      role: $Enums.AdminRole.ADMIN //@FIXME: Crypt password
    }
  })
}