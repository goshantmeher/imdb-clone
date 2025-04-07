import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  ">
        <Tabs defaultValue="login" className="w-full mt-4">
          <DialogHeader className="mt-10">
            <TabsList className="w-full flex gap-2 h-12  ">
              <TabsTrigger
                value="login"
                className="data-[state=active]:font-bold"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-white"
              >
                Signup
              </TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login" className="pt-4">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="pt-4">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
