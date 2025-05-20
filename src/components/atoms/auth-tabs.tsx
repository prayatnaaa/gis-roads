import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

const AuthTabs = () => {
  const location = useLocation();

  const value = location.pathname == "/auth/register" ? "signin" : "signup";
  return (
    <Tabs
      defaultValue={value}
      className="w-[500px] flex items-center hover:cursor-pointer"
    >
      <TabsList>
        <a href="register">
          <TabsTrigger value="signin">Sign up</TabsTrigger>
        </a>
        <a href="login">
          <TabsTrigger value="signup">Sign in</TabsTrigger>
        </a>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
