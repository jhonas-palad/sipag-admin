import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInSchemaT } from "@/schema/user";
import { fetchData } from "./fetch";
import { FetchError } from "@/lib/errors/fetch-error";
import { PhotoSchemaT } from "@/schema/photo";
import { UserSchemaT } from "@/schema/user";

declare module "next-auth" {
  interface Session {
    user: UserSchemaT;
    token: string;
  }
  interface User {
    is_staff: boolean;
    is_active: boolean;
    token?: string;
    photo: PhotoSchemaT;
    last_login: string;
    date_joined: string;
    groups: string[];
    user_permissions: string[];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      authorize: async ({ email, password }) => {
        return await signInFromApi({
          email: email as string,
          password: password as string,
        });
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({ user }) {
      return user.is_staff;
    },
    session({ session, token }) {
      if (token) {
        //@ts-ignore
        session.user = token.user;
        session.token = token.accessToken as string;
      }
      return session;
    },

    jwt({ user, token }) {
      if (user) {
        token.accessToken = user.token;

        delete user.token;
        token.user = user;
      }
      return token;
    },
  },
  trustHost: true,
});

export const signInFromApi = async (credentials: SignInSchemaT) => {
  const authSigninEndpoint = "/api/v1/auth/signin";
  try {
    const user = await fetchData(authSigninEndpoint, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = user.token;
    return { ...user.user, token };
  } catch (err) {
    console.error("AuthError", err, credentials);
    if (err instanceof FetchError) {
      if (err.details.status >= 400 && err.details.status <= 403) {
        return null;
      }
    }
    throw err;
  }
};

// export async function getUserDetails(pk: string){
//   fetchData('/api/auth')
// }
