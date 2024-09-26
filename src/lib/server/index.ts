import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchData } from "@/lib/fetch";
import { FetchError } from "@/lib/errors/fetch-error";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
export const secureFetch = async (
  slug: string,
  stringifyError: boolean = false,
  init?: RequestInit,
) => {
  const session = await auth();
  const initOptions = {
    ...init,
    signal: undefined,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session?.token ?? ""}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await fetchData(slug, initOptions);
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      if (err.status === 401) {
        redirect("/sign-in");
      }
      if (stringifyError) {
        throw Error(JSON.stringify((err as FetchError).details));
      }
    }

    throw err;
  }
};
