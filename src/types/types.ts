import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";

export type TabProps = {
  name: string;
  icon: React.ComponentType;
};

export type FeaturesDataProps = {
  title: string;
  description: string;
  image: React.ComponentType;
};

export type ButtonWithIconProps = {
  label: string;
  variant: NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
  icon: React.ComponentType;
};

export type ColumnProps = {
  cards: CardType[];
  status: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

export type DropIndicatorProps = {
  beforeId: string | null;
  status: string;
};

export type ColumnType = "To do" | "In progress" | "Under review" | "Finished";
export type PriorityType = "Low" | "Medium" | "Urgent";

export type CardType = {
  id?: string;
  title: string | "Untitled";
  description?: string;
  content?: string;
  deadline?: string;
  created?: Date;
  status: ColumnType;
  priority?: PriorityType;
};

export type CardProps = CardType & {
  handleDragStart: Function;
};
