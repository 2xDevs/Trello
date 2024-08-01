"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Signin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState(true);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const HandleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && password) {
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: res.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        router.refresh();
        router.push("/");
      }
    }
  };
  return (
    <>
      <div className="flex h-dvh select-none justify-center bg-gradient-to-t from-primary to-white pt-20">
        <form
          onSubmit={HandleSignin}
          className="flex h-fit max-w-lg flex-col gap-6 rounded-md border bg-background p-10 text-center"
        >
          <h1 className="select-none text-3xl font-medium">
            Welcome to <span className="text-primary">Workflo</span>!
          </h1>
          <div className="flex min-w-96 max-w-sm flex-col gap-4">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative w-full">
              <Input
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type={eyeOpen ? "password" : "text"}
                placeholder="Passsword"
                required={true}
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
            <Button type="submit" className="w-full text-white">
              Login
            </Button>
          </div>
          <div>
            Don't have an account? Create a{" "}
            <Link className="text-blue-600" href={"/signup"}>
              new account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
