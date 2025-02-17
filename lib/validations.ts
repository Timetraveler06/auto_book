import { title } from "process";
import { z } from "zod";

export const signUpSchema = z.object({
    fullName:z.string().min(3),
    email: z.string().email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("Univerity Card is required"),
    password: z.string().min(8),
    
});

export const signInSchema = z.object({
    email: z.string().email(), 
    password: z.string().min(8),
    
});

export const bookSchema = z.object({
    title: z.string().trim().min(2).max(100),
    author: z.string().trim().min(2).max(100),
    genre: z.string().trim().min(2).max(50),
    rating: z.number().min(1).max(5),
    totalCopies: z.coerce.number().int().positive().lte(10000),


})