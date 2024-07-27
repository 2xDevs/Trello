"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export const Signup = () => {
  const [eyeOpen, setEyeOpen] = useState(true);
  return (
    <>
      <div className="from-primary flex h-dvh justify-center bg-gradient-to-t to-white pt-20">
        <div className="bg-background flex h-fit max-w-lg flex-col gap-6 rounded-md border p-10 text-center">
          <h1 className="text-3xl font-medium">
            Welcome to <span className="text-primary">Workflo</span>!
          </h1>
          <div className="flex min-w-96 max-w-sm flex-col gap-4">
            <Input type="text" placeholder="Full name" />
            <Input type="email" placeholder="Your email" />
            <div className="relative w-full">
              <Input
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
            <Button className="w-full text-white">Sign up</Button>
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
