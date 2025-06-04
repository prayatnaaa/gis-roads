import { RegisterForm } from "../organisms/register-form";
import AuthTabs from "../atoms/auth-tabs";

const Register = () => {
  return (
    <div className="w-full h-screen flex gap-4 flex-col items-center justify-center bg-accent">
      <AuthTabs />
      <RegisterForm />
    </div>
  );
};

export default Register;
