"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [eyeOpen, setEyeOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  useEffect(() => {
    const { fullname, email, password } = formData;
    // Check if all fields are filled
    if (fullname && email && password) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [formData]);

  const handleChange = (e: { target: { value: any; name: any } }) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const response = await res.json();
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      const data = await res.json();
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
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
      <div className="flex h-dvh justify-center bg-gradient-to-t from-primary to-white pt-20">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex h-fit max-w-lg flex-col gap-6 rounded-md border bg-background p-10 text-center"
        >
          <h1 className="text-3xl font-medium">
            Welcome to <span className="text-primary">Workflo</span>!
          </h1>
          <div className="flex min-w-96 max-w-sm flex-col gap-4">
            <Input
              id="fullname"
              name="fullname"
              type="text"
              required={true}
              placeholder="Full name"
              value={formData.fullname}
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              type="email"
              required={true}
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative w-full">
              <Input
                id="password"
                name="password"
                type={eyeOpen ? "password" : "text"}
                required={true}
                placeholder="Passsword"
                value={formData.password}
                onChange={handleChange}
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
              type="submit"
              className={`w-full text-white ${isButtonEnabled ? "" : "cursor-not-allowed bg-red-400"}`}
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
        </form>
      </div>
    </>
  );
};
