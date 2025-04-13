import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { MessagesList } from "./MessagesList";
import { Input } from "../ui/input";
import { useCreateMessage } from "../../services/useCreateMessage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  message: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;
export const Chat = ({ selectedUser }: { selectedUser: string }) => {
  const form = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const { sendMessage, loading } = useCreateMessage();

  const onSubmit = async (data: FormSchema) => {
    sendMessage(selectedUser, data.message);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col flex-1 h-full p-4"
      >
        <MessagesList />
        <footer className="flex items-center gap-3">
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    name="message"
                    placeholder="Type your message here..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={loading}>
            <Send />
          </Button>
        </footer>
      </form>
    </Form>
  );
};
