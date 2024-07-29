import { Icons } from "@/components/Icons";
import {
  ButtonWithIconProps,
  FeaturesDataProps,
  TabProps,
} from "@/types/types";

export const TabsData: TabProps[] = [
  { name: "home", icon: Icons.Home },
  { name: "boards", icon: Icons.Board },
  { name: "settings", icon: Icons.Settings },
  { name: "teams", icon: Icons.Teams },
  { name: "analytics", icon: Icons.Analytics },
];

export const FeaturesData: FeaturesDataProps[] = [
  {
    image: Icons.Introduction,
    title: "Introducing Tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    image: Icons.Sharing,
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    image: Icons.Access,
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

export const ButtonWithIconData: ButtonWithIconProps[] = [
  {
    label: "Calendar",
    variant: "ghost",
    icon: Icons.Calendar,
  },
  {
    label: "Automation",
    variant: "ghost",
    icon: Icons.Ai,
  },
  {
    label: "Filter",
    variant: "ghost",
    icon: Icons.Filter,
  },
  {
    label: "Share",
    variant: "ghost",
    icon: Icons.Share,
  },
];

export const StatusNavbarData: string[] = [
  "Todo",
  "In progress",
  "Under review",
  "Finished",
];
