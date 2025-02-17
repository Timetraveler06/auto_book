"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { z, ZodType } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";


//Create a Generic Interfce 
 interface Props extends Partial<Book>{
 
    type?: "CREATE" | "UPDATE";
 }


const BookForm = ({ type, ...book}: Props) => {

    
    const router = useRouter();

    const form = useForm<z.infer<typeof bookSchema>>({

        resolver:zodResolver(bookSchema),
        defaultValues:{
            title: '',
            description:'',
            author:'',
            genre:'',
            rating: 1,
            totalCopies: 1,
            coverUrl:'',
            coverColor:'',
            videoUrl:'',
            summary:'',
        }  
    });

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {}
  return  (
    
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name={"title"} 
                        render={({ field }) => ( 

                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-notmal text-dark-500">
                                Book Title
                            </FormLabel>
                            <FormControl>
                               <Input 
                                    required 
                                    placeholder="Book Title"
                                    {...field}
                                  className="book-form-input" /> 
                            
                            </FormControl>
                          
                            <FormMessage />
                        </FormItem>
                        )}
                    />  
                
            </form>
        </Form>
        
  )
  
}

export default BookForm