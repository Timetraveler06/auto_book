"use server";
import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash} from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

 

export const signUp = async( params: AuthCredentials ) =>{
    const { fullName, email, universityId, password, universityCard} = params;
    const ip = ((await headers()).get('x-forwarded-for') || "127.0.0.1");

    //Check if user exits
    const existingUser  = await db 
        .select()
        .from(users)
        .where(eq(users.email , email))
        .limit(1);


    if( existingUser.length > 0 ){
        return { success: false, error:' User already exists! '}
    }

    const hashedPassword = await hash(password, 10 );
    try {
        await db.insert(users).values({
            fullName, email, universityId, password:hashedPassword, universityCard
        });

        await signInWithCredientials({email,password});

        return {success: true};
        
    } catch (error) {
        console.log(error, 'Sign Up Error');
        return { success: false, error:' Sign Up Error '};
        
    }
}

export const signInWithCredientials = async ( params: Pick<AuthCredentials , 'email' | 'password'> ) => {

    const {email, password} = params;

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