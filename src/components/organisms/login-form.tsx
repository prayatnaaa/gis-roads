import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type TLoginSchema } from "@/lib/login-types";
import { useNavigate } from "react-router-dom";
import { goLogin } from "@/actions/login";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values: TLoginSchema) => {
    console.log(values);
    try {
      const response = await goLogin({
        email: values.email,
        password: values.password,
      });

      if (!response.success) {
        setError("root", {
          type: "manual",
          message: "Something went wrong, please try again later",
        });
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: "Something went wrong, please try again later",
      });
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Login to see what you can do</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email of yours"
                {...register("email")}
                errorMsg={errors.email?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Set your password"
                {...register("password")}
                errorMsg={errors.password?.message}
              />
            </div>
            <Button
              className="mt-2 hover:cursor-pointer"
              disabled={isSubmitting}
            >
              Log in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
