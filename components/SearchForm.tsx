"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

// Define the props interface
interface SearchFormProps {
  schema: ZodType<{ query: string }>;
  defaultValues: { query: string };
  onSubmit: (data: { query: string }) => Promise<void>;
}

const SearchForm: React.FC<SearchFormProps> = ({ schema, defaultValues, onSubmit }) => {
  const form = useForm<{ query: string }>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<{ query: string }> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search..."
                  className="pl-10 text-white" // Space for search icon
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
};

export default SearchForm;
