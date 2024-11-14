import { loginSchema } from '~/utils/schemas'
import db from '~/utils/db'



export default defineEventHandler(async (event) => {

    const { password, email } = await readValidatedBody(event, (body) => loginSchema.parse(body))

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User not exist'
        })
    }

    if (!existingUser.hashedPassword) {

        const connectedAccount = await db.oauthAccount.findFirst({
            where: {
                userId: existingUser.id
            }
        })

        if (connectedAccount) {
            const oAuthProvider = connectedAccount.providerId
            throw createError({
                statusCode: 400,
                statusMessage: `Account connected with ${oAuthProvider}. Please continue with ${oAuthProvider} to login`
            })
        }

    }

    if(existingUser.hashedPassword){

        const isPasswordCorrect = await verifyPassword(existingUser.hashedPassword, password);

        if(!isPasswordCorrect){
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid Credentials'
            })
        }


    }

    const transformedUser = sanitizeUser(existingUser);

    if (transformedUser) {
        await setUserSession(event, {
            user: transformedUser
        })
    }

    return transformedUser;

})



