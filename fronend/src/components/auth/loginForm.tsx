import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { LoginFormSchema } from "@/utils/schemas/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { startTransition, useActionState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { loginApi } from "@/api/user/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducer/user";

function LoginForm() {
  const formSchema = LoginFormSchema();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginAction = async (
    _prevState: unknown,
    data: z.infer<typeof formSchema>
  ) => {
    const { email, password } = data;
    const result = await loginApi(email, password);
    if (!result.success && result.status !== 200) {
      return {
        errors: {
          email: null,
          password: null,
          error: result.message,
        },
      };
    }
    if (result.success) {
      const user = result.data;
      dispatch(setUser(user));
    }

    return {
      error: null,
      email: null,
      password: null,
    };
  };

  const [state, formAction, pending] = useActionState(loginAction, {
    errors: {
      email: null,
      password: null,
      error: null,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Login to your accout</DialogTitle>
        <DialogDescription>
          Enter your username and password to login.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4  w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email here" {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password here"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormMessage>
                {!pending && state.errors && state.errors.error && (
                  <p className="text-red-500">{state.errors.error}</p>
                )}
              </FormMessage>
              <Button
                type="submit"
                className="w-full bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800"
                disabled={pending}
              >
                {!pending && "Login"}
                {pending && (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default LoginForm;
