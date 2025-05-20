type LoginProps = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  status?: number;
  message: string;
  token?: string;
};

export const goLogin = async ({
  email,
  password,
}: LoginProps): Promise<LoginResult> => {
  const formData = new FormData();

  try {
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      return { success: false, message: "Something went wrong" };
    }

    const data = await response.json();

    return {
      success: true,
      status: data.meta.code,
      message: data.meta.message,
      token: data.meta.token,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error as string };
  }
};
