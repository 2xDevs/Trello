"use client";
import { Icons } from "@/components/Icons";
import { SignoutButton } from "@/components/SignoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { TabsTrigger } from "@/components/ui/tabs";
import { useTodoActions } from "@/hooks/useTodoActions";
import { cn } from "@/lib/utils";
import { TabProps } from "@/types/types";
import { signOut, useSession } from "next-auth/react";

export const Sidebar = ({
  TabsData,
  currentTab,
}: {
  TabsData: TabProps[];
  currentTab: string;
}) => {
   const session = useSession({
     required: true,
   });
  const { handleStatusChange } = useTodoActions();
  return (
    <>
      <div className="mb-4 w-full">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="capitalize">{session.data?.user?.name?.at(0)}</AvatarFallback>
          </Avatar>

          <span className="text-lg font-medium text-foreground md:text-xl">
            {session.data?.user?.name}
          </span>
        </div>
        <div className="g mt-2 flex items-center justify-between gap-2">
          <div className="flex gap-4">
            <Icons.Notification className="aspect-square h-6" />
            <Icons.Loading className="aspect-square h-6" />
            <Icons.DoubleArrowRight className="aspect-square h-6" />
          </div>
          <Button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="h-fit px-3 py-2 font-normal"
            variant={"ghost"}
          >
            Logout
          </Button>
        </div>
      </div>
      {TabsData.map((data, index) => (
        <TabsTrigger
          key={index}
          className={cn(
            currentTab == data.name ? "outline outline-1 outline-accent" : "",
            "w-full",
          )}
          value={data.name}
        >
          <div className="flex items-center gap-4">
            <data.icon />
            <p className="text-base capitalize">{data.name}</p>
          </div>
        </TabsTrigger>
      ))}
      <SheetTrigger asChild>
        <Button
          onClick={() => handleStatusChange("To do")}
          className="mt-4 flex h-fit w-full items-center gap-2 rounded-xl bg-[linear-gradient(180deg,_#4C38C2_0%,_#2F2188_100%)] py-3"
        >
          <p className="text-xl">Create New Task</p>
          <Icons.Plus
            color="#000"
            className="h-5 w-5 rounded-full bg-background text-black"
          />
        </Button>
      </SheetTrigger>

      <div className="flex flex-1 items-end">
        <Button
          className="flex h-fit items-center gap-1 px-3 py-2"
          variant={"ghost"}
        >
          <Icons.Download />
          <div>
            <p className="text-xl font-medium">Download the app</p>
            <p className="text-start font-normal">Get the full experience</p>
          </div>
        </Button>
      </div>
    </>
  );
};
