"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash} from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { sendWelcomeEmail } from "../sendEmail";


export const signUp = async( params: AuthCredentials ) =>{
    const { fullName, email, universityId, password, universityCard} = params;
    
    // Check for rate-limiting (already in your code)
    const ip = ((await headers()).get('x-forwarded-for') || "127.0.0.1");
    const { success } = await ratelimit.limit(ip);
    if(!success) return redirect('/too-fast');

    // Check if the user already exists (already in your code)
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
        return { success: false, error: 'User already exists!' };
    }

    // Hash the password and save the user (already in your code)
    const hashedPassword = await hash(password, 10);
    try {
        await db.insert(users).values({ fullName, email, universityId, password: hashedPassword, universityCard });

        // Send the welcome email to the new user
        await sendWelcomeEmail(email,fullName); // Sending the email

        return { success: true };
    } catch (error) {
        console.log(error, 'Sign Up Error');
        return { success: false, error: 'Sign Up Error' };
    }
};

export const signInWithCredientials = async ( params: Pick<AuthCredentials , 'email' | 'password'> ) => {

    const {email, password} = params;
    const ip = ((await headers()).get('x-forwarded-for') || "127.0.0.1");
    const { success } = await ratelimit.limit(ip);

    if(!success) return redirect('/too-fast');
    
    try {

        const result = await signIn('credentials',{
            email, password, redirect: false,
        });

        if(result?.error){
            return { success: false, error: result.error};
        }
        return {success: true};
        
    } catch (error) {
        console.log(error, 'Sign Inp Error');
        return { success: false, error:' Sign In Error '};
    }
}

export async function handleSignOut() {
    await signOut();
  }