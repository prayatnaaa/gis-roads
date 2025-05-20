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
import { registerSchema, type TRegisterSchema } from "@/lib/register-types";
import { goRegister } from "@/actions/register";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: TRegisterSchema) => {
    try {
      const response = await goRegister({
        name: values.name,
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
      navigate("/auth/login");
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
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Register to see what you can do</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of yours"
                {...register("name")}
                errorMsg={errors.name?.message}
              />
            </div>
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
                type="password"
                id="password"
                placeholder="Set your password"
                {...register("password")}
                errorMsg={errors.password?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-pass">Confirm password</Label>
              <Input
                type="password"
                id="confirm-pass"
                placeholder="Confirm your password"
                {...register("confirmPass")}
                errorMsg={errors.confirmPass?.message}
              />
            </div>
            <Button
              className="mt-2 hover:cursor-pointer"
              disabled={isSubmitting}
            >
              Create
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
