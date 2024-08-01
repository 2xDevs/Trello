"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { FeaturesDataProps } from "@/types/types";
import { ButtonWithIconData, FeaturesData, TabsData } from "@/config/Data";
import { Kanban } from "@/components/Kanban";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AddTodoModal } from "@/components/AddTodoModal";
import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { useTodoActions } from "@/hooks/useTodoActions";

export default function HomePage() {
  const { handleStatusChange } = useTodoActions();
  return (
    <>
      <Sheet>
        <div className="max-h-dvh w-full overflow-auto">
          <Tabs defaultValue="home" className="h-full text-foreground">
            <TabsList className="w-fit items-start gap-1 bg-background p-4">
              <Sidebar TabsData={TabsData} />
            </TabsList>

            <div className="flex max-h-dvh overflow-auto bg-muted pl-4 pr-8">
              <TabsContent className="flex flex-1 flex-col" value="home">
                <div className="flex justify-between pt-4">
                  <p className="text-5xl font-semibold">Good Morning, Joe</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">Help & feedback</span>
                    <Icons.Help />
                  </div>
                </div>

                <div className="flex gap-4 pt-8">
                  <FeatureSection FeaturesData={FeaturesData} />
                </div>

                <div className="my-4 flex items-center justify-between">
                  <div className="relative max-w-xs">
                    <Input
                      className="text-base"
                      type="search"
                      placeholder="Search"
                    />
                    <Icons.Search className="absolute right-3 top-1/2 z-20 h-5 w-5 -translate-y-1/2" />
                  </div>
                  <div className="flex flex-1 justify-end gap-2">
                    {ButtonWithIconData.map((data, index) => (
                      <ButtonWithIcon key={index} data={data} />
                    ))}

                    <SheetTrigger asChild>
                      <Button
                        onClick={() => handleStatusChange("To do")}
                        className="rounded-xl bg-[linear-gradient(180deg,_#4C38C2_0%,_#2F2188_100%)]"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-base">Create New</p>
                          <Icons.Plus
                            color="#000"
                            className="h-5 w-5 rounded-full bg-background text-black"
                          />
                        </div>
                      </Button>
                    </SheetTrigger>
                  </div>
                </div>

                <div className="sticky top-0 flex h-fit flex-1 gap-4 bg-muted bg-white pb-4">
                  <Kanban />
                </div>
              </TabsContent>
              <TabsContent value="boards"></TabsContent>
              <TabsContent value="settings"></TabsContent>
              <TabsContent value="teams"></TabsContent>
              <TabsContent value="analytics"></TabsContent>
            </div>
          </Tabs>
        </div>
        <AddTodoModal />
      </Sheet>
    </>
  );
}

const FeatureSection = ({
  FeaturesData,
}: {
  FeaturesData: FeaturesDataProps[];
}) => {
  return (
    <>
      {FeaturesData.map((data, index) => (
        <div
          key={index}
          className="flex flex-1 gap-4 rounded-md bg-background p-4"
        >
          <div className="self-center">
            <data.image />
          </div>
          <div className="text-muted-foreground">
            <p className="text-xl font-medium">{data.title}</p>
            <p className="text-start font-normal">{data.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};
