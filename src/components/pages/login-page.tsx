import AuthTabs from "../atoms/auth-tabs";
import { LoginForm } from "../organisms/login-form";

const Login = () => {
  return (
    <div className="w-full h-screen flex gap-4 flex-col items-center justify-center bg-gray-200">
      <AuthTabs />
      <LoginForm />
    </div>
  );
};

export default Login;
