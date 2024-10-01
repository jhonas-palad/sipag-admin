import { FetchError } from "@/lib/errors/fetch-error";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.API_SERVER_DEV
    : process.env.API_SERVER_PROD;

export const fetchData = async (slug: string, init?: RequestInit) => {
  const url = new URL(slug, BASE_URL);
  let data;
  let response;
  try {
    response = await fetch(url, init);
    let notOk = false;
    if (!response.ok) {
      notOk = true;
    }
    try {
      data = await response.json();
    } catch (err) {
      if (notOk) {
        throw response;
      }
    }
    if (notOk) {
      throw response;
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new FetchError(
        "fetchError",
        error.message,
        response?.status as number,
      );
    }
    throw new FetchError(
      "fetchError",
      data
        ? (data as Record<string, string>)
        : response?.statusText
          ? response?.statusText
          : ((error as Error)?.message ?? "An error occured"),
      response?.status as number,
    );
  }
};
