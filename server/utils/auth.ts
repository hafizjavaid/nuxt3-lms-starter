import type { User } from '@prisma/client'


export const sanitizeUser = (user: User) => {
    if (!user || !user.hashedPassword) return null


    // @ts-ignore
    delete user.hashedPassword;

    return user; 
}