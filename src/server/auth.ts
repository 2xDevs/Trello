// import {
//   getServerSession,
//   RequestInternal,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "@/db/User";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { Adapter } from "next-auth/adapters";
// import { env } from "@/env";
// import clientPromise from "@/lib/MongoDbClinet";
// import { dbConnect } from "@/lib/DBConnect";

// interface User {
//   id: string;
//   email: string;
//   name: string;
// }

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     session: ({ token, session }: any) => {
//       session.user.id = token.sub;
//       return session;
//     },
//   },
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         fullname: {
//           lable: "Fullname",
//           type: "text",
//           placeholder: "Full name",
//         },
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "Your email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//         mode: { label: "Mode", type: "text" },
//       },
//       // TODO: User credentials type from next-aut
//       async authorize(
//         credentials:
//           | Record<"email" | "fullname" | "password" | "mode", string>
//           | undefined,
//         req: Pick<RequestInternal, "body" | "query" | "headers" | "method">,
//       ): Promise<User | null> {
//         await dbConnect();
//         if (credentials?.mode === "signup") {
//           const existingUser = await User.findOne({ email: credentials.email });
//           if (existingUser) {
//             throw new Error("User exists already!");
//           }

//           const hashedPassword = await bcrypt.hash(credentials.password, 13);
//           const newUser = await User.create({
//             fullname: credentials.fullname,
//             email: credentials.email,
//             password: hashedPassword,
//           });

//           if (newUser) {
//             console.log("user succesfully created");
//             return {
//               id: newUser._id.toString(),
//               email: credentials.email,
//               name: credentials.fullname,
//             };
//           } else {
//             throw new Error("Could not create user!");
//           }
//         }
//         if (credentials?.mode === "signin") {
//           const user = await User.findOne({ email: credentials?.email });
//           console.log(user);
//           if (!user) {
//             throw new Error("No user found with the entered email");
//           }
//           const isValid = await bcrypt.compare(
//             credentials?.password!,
//             user.password,
//           );
//           if (!isValid) {
//             throw new Error("Password is Incorrect");
//           }
//           console.log("user succesfully loggedin");
//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.fullname,
//           };
//         }
//         return null;
//       },
//     }),
//     /**
//      * ...add more providers here.
//      *
//      * Most other providers require a bit more work than the Discord provider. For example, the
//      * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//      * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//      *
//      * @see https://next-auth.js.org/providers/github
//      */
//   ],
//   secret: env.NEXTAUTH_SECRET,
//   adapter: MongoDBAdapter(clientPromise) as Adapter,
//   pages: {
//     signIn: "/signin",
//     signOut: "/signout",
//     newUser: "/signup",
//   },
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *import { User } from 'db/schema';
// import { User } from 'db/schema';

//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = () => getServerSession(authOptions);
