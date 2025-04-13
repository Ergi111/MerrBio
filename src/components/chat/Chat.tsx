import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { MessagesList } from "./MessagesList";
import { Input } from "../ui/input";
import { useCreateMessage } from "../../services/useCreateMessage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/useAuth";
import { IUser } from "../../types/user";

const formSchema = z.object({
  message: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const Chat = ({ selectedUser }: { selectedUser: IUser }) => {
  const { currentUser } = useAuth();
  const form = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const { sendMessage, loading } = useCreateMessage();
  const getConversationId = (uid1: string, uid2: string) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };
  const onSubmit = async (data: FormSchema) => {
    sendMessage(selectedUser.id, data.message);
    form.reset({
      message: "",
    });
  };
  console.log("Chat selectedUser:", selectedUser);
  const conversationId = getConversationId(
    currentUser?.id as string,
    selectedUser.id
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col flex-1 h-full pl-4 pb-4 justify-between"
      >
        <MessagesList
          conversationId={conversationId}
          selectedUser={selectedUser}
        />
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
