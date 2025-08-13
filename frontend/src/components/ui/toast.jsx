import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Toast = React.forwardRef(
  (
    {
      id,
      title,
      description,
      variant = "default",
      action,
      open,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 5000);

      return () => clearTimeout(timer);
    }, [onOpenChange]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
          {
            "border bg-background text-foreground": variant === "default",
            "border-destructive bg-destructive text-destructive-foreground":
              variant === "destructive",
          }
        )}
        {...props}
      >
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {action}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-6 w-6 rounded-md p-0 opacity-70 hover:opacity-100"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast };
