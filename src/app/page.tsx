"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { ButtonWithIconProps, FeaturesDataProps } from "@/types/types";
import {
  ButtonWithIconData,
  FeaturesData,
  StatusNavbarData,
  TabsData,
} from "@/config/Data";

export default function HomePage() {
  return (
    <>
      <div className="h-screen w-screen">
        <Tabs defaultValue="home" className="h-full text-foreground">
          <TabsList className="w-fit items-start gap-1 p-4">
            <Sidebar TabsData={TabsData} />
          </TabsList>

          <div className="flex p-4 pr-8">
            <TabsContent className="flex flex-1 flex-col" value="home">
              <div className="flex justify-between">
                <p className="text-5xl font-semibold">Good Morning, Joe</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">Help & feedback</span>
                  <Icons.Help />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <FeatureSection FeaturesData={FeaturesData} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="relative max-w-xs">
                  <Input
                    className="text-base"
                    type="search"
                    placeholder="Search"
                  />
                  <Icons.Search className="absolute right-3 top-1/2 z-20 h-5 w-5 -translate-y-1/2" />
                </div>
                <div className="flex flex-1 justify-end gap-2">
                  <ButtonWithIcon ButtonWithIconsData={ButtonWithIconData} />
                  <Button className="rounded-xl bg-[linear-gradient(180deg,_#4C38C2_0%,_#2F2188_100%)]">
                    <div className="flex items-center gap-2">
                      <p className="text-base">Create New</p>
                      <Icons.Plus className="h-5 w-5 rounded-full bg-background text-black" />
                    </div>
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-1 gap-4 bg-gray-400 p-4">
                <StatusNavbar titles={StatusNavbarData} />
              </div>
            </TabsContent>
            <TabsContent value="boards"></TabsContent>
            <TabsContent value="settings"></TabsContent>
            <TabsContent value="teams"></TabsContent>
            <TabsContent value="analytics"></TabsContent>
          </div>
        </Tabs>
      </div>
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

const ButtonWithIcon = ({
  ButtonWithIconsData,
}: {
  ButtonWithIconsData: ButtonWithIconProps[];
}) => {
  return (
    <>
      {ButtonWithIconsData.map((data, index) => (
        <Button key={index} variant={data.variant}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <p className="text-base">{data.label}</p>
            <div>
              <data.icon />
            </div>
          </div>
        </Button>
      ))}
    </>
  );
};

const StatusNavbar = ({ titles }: { titles: string[] }) => {
  return (
    <>
      {titles.map((title, index) => (
        <div key={index} className="flex-1">
          <div className="flex justify-between">
            <p className="text-xl">{title}</p>
            <Icons.StatusMenu />
          </div>
        </div>
      ))}
    </>
  );
};
