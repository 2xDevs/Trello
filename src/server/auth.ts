import {
  getServerSession,
  RequestInternal,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongoose";
import User from "@/db/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        fullname: {
          lable: "Fullname",
          type: "text",
          placeholder: "Full name",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        mode: { label: "Mode", type: "text" },
      },
      // TODO: User credentials type from next-aut
      async authorize(
        credentials:
          | Record<"email" | "fullname" | "password" | "mode", string>
          | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">,
      ): Promise<User | null> {
        await connectToDatabase();

        if (credentials?.mode === "signup") {
          const existingUser = await User.findOne({ email: credentials.email });
          if (existingUser) {
            throw new Error("User exists already!");
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 13);
          const newUser = await User.create({
            fullname: credentials.fullname,
            email: credentials.email,
            password: hashedPassword,
          });

          if (newUser) {
            return {
              id: newUser._id.toString(),
              email: credentials.email,
              name: credentials.fullname,
            };
          } else {
            throw new Error("Could not create user!");
          }
        } else {
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("No user found with the entered email");
          }
          const isValid = await bcrypt.compare(
            credentials?.password!,
            user.password,
          );
          if (!isValid) {
            throw new Error("Password is Incorrect");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullname,
          };
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectToDatabase) as Adapter,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    newUser: "/auth/new-user",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *import { User } from 'db/schema';
import { User } from 'db/schema';

 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
