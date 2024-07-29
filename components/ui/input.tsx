import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  height?: "sm" | "md" | "lg";
}

const inputSizes = {
  sm: "h-10",
  md: "h-12",
  lg: "h-16",
  xl: "h-20",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, height = "md", type, ...props }, ref) => {
    return (
      <div className={cn("relative h-10 w-full", inputSizes[height])}>
        <input
          type={type}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            inputSizes[height],
          )}
          ref={ref}
          {...props}
        />
        {props.loading && (
          <Loader className="absolute right-2 top-2 text-gray-400 animate-spin" />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
