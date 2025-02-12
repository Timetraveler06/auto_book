import NextAuth from "next-auth"
 import CredentialProvider from 'next-auth/providers/credentials';
import { db } from "./database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "./database/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
    session:{
        strategy:"jwt",
    }, 
  providers: [
    CredentialProvider({
        async authorize(credientials){
            if(!credientials?.email ||!credientials?.password ){
                return null;
            }

            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, credientials.email.toString()))
                .limit(1)
        }
    })
  ],
})