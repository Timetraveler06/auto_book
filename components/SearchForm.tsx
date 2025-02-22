"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Search } from "lucide-react";

const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSubmit: (data: SearchFormValues) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const handleSubmit: SubmitHandler<SearchFormValues> = async (data) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full max-w-md">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Search</Button>
      </form>
    </Form>
  );
};

export default SearchForm;
