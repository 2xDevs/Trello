import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/DBConnect";
import { getServerSession } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials) throw new Error("Enter Credentials");
        try {
          const foundUser = await User.findOne({
            email: credentials?.email,
          });

          if (!foundUser) {
            throw new Error("User Doesnt Exist!");
          } else {
            const match = await bcrypt.compare(
              credentials?.password,
              foundUser.password,
            );

            if (!match) {
              throw new Error("User Credentials are Invalid!");
            } else {
              console.log("Good Pass");
              //   delete foundUser.password;
              return {
                id: foundUser._id.toString(),
                name: foundUser.fullname,
                email: foundUser.email,
              };
            }
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
export const getServerAuthSession = () => getServerSession(authOptions);
