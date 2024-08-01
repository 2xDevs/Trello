"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const SignoutButton = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className="h-fit px-3 py-2 font-normal"
      variant={"ghost"}
    >
      Logout
    </Button>
  );
};
