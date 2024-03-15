import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const Search = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => {
  return (
    <div className="py-4 relative">
      <input
        type="text"
        ref={ref}
        placeholder="Search"
        className="px-12 py-3 rounded-xl shadow-sm w-full text-neutral-600 active:border-none focus:border-none focus-visible:border-none"
        {...props}
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-neutral-800 absolute top-1/2 left-4 -translate-y-1/2" />
    </div>
  );
});
