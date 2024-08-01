import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetContent, SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/store/store";
import { useState } from "react";

export const AddTodoModal = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const todo = useAppSelector((state) => state.todo.value);
  return (
    <>
      <SheetContent className={fullScreen ? "min-w-full" : "min-w-[40%]"}>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex gap-4">
            <SheetClose>
              <Icons.Close onClick={() => setFullScreen(false)} />
            </SheetClose>
            <Icons.Expand onClick={() => setFullScreen(!fullScreen)} />
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
            value={todo.title}
            placeholder="UnTitled"
            className="h-fit truncate bg-transparent px-1 py-1 text-4xl font-extrabold placeholder:text-4xl placeholder:font-extrabold placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <label
              htmlFor="status"
              className="flex min-w-32 items-center gap-4"
            >
              <Icons.Loading />
              <p>Status</p>
            </label>
            <Select defaultValue={todo.status}>
              <SelectTrigger className="w-[180px] py-1 text-base focus:ring-0 focus:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="To do">To do</SelectItem>
                  <SelectItem value="In progress">In progress</SelectItem>
                  <SelectItem value="Under review">Under review</SelectItem>
                  <SelectItem value="Finished">Finished</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <label
              htmlFor="priority"
              className="flex min-w-32 items-center gap-4"
            >
              <Icons.Warning />
              <p>Priority</p>
            </label>
            <Select defaultValue={todo.priority}>
              <SelectTrigger className="w-[180px] py-1 text-base focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-accent">
                <SelectValue placeholder="Not Selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <label
              htmlFor="deadline"
              className="flex min-w-32 items-center gap-4"
            >
              <Icons.Calendar />
              <p>Deadline</p>
            </label>
            <Input
              value={todo.deadline}
              id="deadline"
              placeholder="Not Selected"
              className="h-fit truncate bg-transparent py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex gap-4">
            <label
              htmlFor="description"
              className="flex min-w-32 items-center gap-4"
            >
              <Icons.Description />
              <p>Description</p>
            </label>
            <Input
              value={todo.description}
              id="description"
              placeholder="Not Selected"
              className="h-fit truncate bg-transparent py-1 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
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
          <div className="h-1/2">
            <Textarea
              placeholder="Start writing, or drag your own files here."
              className="h-full bg-transparent px-2 py-2 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </SheetContent>
    </>
  );
};
