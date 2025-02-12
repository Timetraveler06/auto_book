"use server"
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash,salt} from "bcryptjs";
import { eq } from "drizzle-orm";

 

const signUp = async(params:AuthCredentials) =>{
    const { fullName, email, universityId, password, universityCard} = params;


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
            fullName, email, universityId, password, universityCard
        })
        
    } catch (error) {
        console.log(error, 'Sign Up Error');
        return { success: false, error:' Sign Up Error '}
        
    }
}