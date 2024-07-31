import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

export const AddTodoModal = () => {
  return (
    <>
      <SheetContent className="min-w-[40%]">
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex gap-4">
            <SheetClose>
              <Icons.Close />
            </SheetClose>
            <Icons.Expand />
          </div>
          <div className="flex gap-4">
            <ButtonWithIcon
              data={{ variant: "secondary", label: "Share", icon: Icons.Share }}
            />
            <ButtonWithIcon
              data={{
                variant: "secondary",
                label: "Favourite",
                icon: Icons.Favorite,
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <Input
            placeholder="UnTitled"
            className="h-fit bg-transparent px-1 py-1 text-4xl font-extrabold placeholder:text-4xl placeholder:font-extrabold placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="flex min-w-32 items-center gap-4">
              <Icons.Loading />
              <p>Status</p>
            </label>
            <Input
              placeholder="Not Selected"
              className="h-fit bg-transparent py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex min-w-32 items-center gap-4">
              <Icons.Warning />
              <p>Priority</p>
            </label>
            <Input
              placeholder="Not selected"
              className="h-fit bg-transparent py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex min-w-32 items-center gap-4">
              <Icons.Calendar />
              <p>Deadline</p>
            </label>
            <Input
              placeholder="Not Selected"
              className="h-fit bg-transparent py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex min-w-32 items-center gap-4">
              <Icons.Description />
              <p>Description</p>
            </label>
            <Input
              placeholder="Not Selected"
              className="h-fit bg-transparent py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button className="w-fit pl-0" variant={"ghost"}>
            <div className="flex flex-row-reverse items-center gap-2 text-muted-foreground">
              <p className="text-base">{"Add new property"}</p>
              <div>
                <Icons.Plus color="#000" />
              </div>
            </div>
          </Button>
          <div className="h-0.5 bg-secondary"></div>
          <div className="mb-4">
            <Input
              placeholder="Start writing, or drag your own files here."
              className="h-fit bg-transparent px-1 py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </SheetContent>
    </>
  );
};
