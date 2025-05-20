import type { UserProps } from "@/lib/user-types";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

type RegisterResult = {
  success: boolean;
  status?: number;
  message: string;
  user?: UserProps;
};

export const goRegister = async ({
  name,
  email,
  password,
}: RegisterProps): Promise<RegisterResult> => {
  const formData = new FormData();

  try {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`${process.env.VITE_API_BASE_URL}/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return { success: false, message: "Something went wrong" };
    }

    const data = await response.json();

    return {
      success: true,
      status: data.meta.code,
      message: data.meta.message,
      user: data.meta.data,
    };
  } catch (error) {
    return { success: false, message: error as string };
  }
};
