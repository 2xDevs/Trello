"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Signup = () => {
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState(true);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const HandleSignup = async () => {
    if (name && email && password) {
      const res = await signIn("credentials", {
        redirect: false,
        fullname: name,
        email: email,
        password: password,
        mode: "signup",
      });
      console.log(res);
      router.push("/");
    }
  };
  return (
    <>
      <div className="flex h-dvh justify-center bg-gradient-to-t from-primary to-white pt-20">
        <div className="flex h-fit max-w-lg flex-col gap-6 rounded-md border bg-background p-10 text-center">
          <h1 className="text-3xl font-medium">
            Welcome to <span className="text-primary">Workflo</span>!
          </h1>
          <div className="flex min-w-96 max-w-sm flex-col gap-4">
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative w-full">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={eyeOpen ? "password" : "text"}
                placeholder="Passsword"
              />
              {eyeOpen ? (
                <Icons.EyeOpen
                  onClick={() => setEyeOpen(false)}
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                />
              ) : (
                <Icons.EyeNone
                  onClick={() => setEyeOpen(true)}
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                />
              )}
            </div>
            <Button
              onClick={HandleSignup}
              className={`w-full text-white ${name && email && password ? "bg-red-600" : ""}`}
            >
              Sign up
            </Button>
          </div>
          <div>
            Already have an account?{" "}
            <Link className="text-blue-600" href={"/signin"}>
              Log in.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
