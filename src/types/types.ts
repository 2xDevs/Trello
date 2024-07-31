import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { UniqueIdentifier } from "@dnd-kit/core";

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
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  onAddItem?: () => void;
};
