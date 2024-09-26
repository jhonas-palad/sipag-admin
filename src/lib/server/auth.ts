import { fetchData } from "../fetch";

export const verifyToken = async (token: string) => {
  if (!token) {
    return false;
  }
  try {
    await fetchData("/api/v1/auth/verify", {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};
