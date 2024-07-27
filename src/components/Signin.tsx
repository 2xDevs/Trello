"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export const Signin = () => {
  const [eyeOpen, setEyeOpen] = useState(true);
  return (
    <>
      <div className="from-primary flex h-dvh select-none justify-center bg-gradient-to-t to-white pt-20">
        <div className="bg-background flex h-fit max-w-lg flex-col gap-6 rounded-md border p-10 text-center">
          <h1 className="select-none text-3xl font-medium">
            Welcome to <span className="text-primary">Workflo</span>!
          </h1>
          <div className="flex min-w-96 max-w-sm flex-col gap-4">
            <Input type="email" placeholder="Your email" required />
            <div className="relative w-full">
              <Input
                type={eyeOpen ? "password" : "text"}
                placeholder="Passsword"
                required
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
            <Button className="w-full text-white">Login</Button>
          </div>
          <div>
            Don't have an account? Create a{" "}
            <Link className="text-blue-600" href={"/signup"}>
              new account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
