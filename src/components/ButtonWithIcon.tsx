import { Button } from "@/components/ui/button";
import { ButtonWithIconProps } from "@/types/types";

export const ButtonWithIcon = ({ data }: { data: ButtonWithIconProps }) => {
  return (
    <>
      <Button variant={data.variant}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <p className="text-base">{data.label}</p>
          <div>
            <data.icon />
          </div>
        </div>
      </Button>
    </>
  );
};
