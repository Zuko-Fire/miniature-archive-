import { cn } from "../lib/cn";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full bg-dark-800 border border-dark-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-purple transition",
        className
      )}
      {...props}
    />
  );
}