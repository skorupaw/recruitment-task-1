import { cn } from "@/lib/utils";
import { Button } from "@/ui/primitives/button";
import { Input } from "@/ui/primitives/input";
import { X } from "lucide-react";
import React, { useState, useCallback } from "react";

export function Search({
  ref,
  onChange,
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [query, setQuery] = useState(props.value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value !== query) {
        setQuery(value);
        onChange?.(e);
      }
    },
    [query, onChange],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [onChange]);

  return (
    <div className="relative inline-flex w-full">
      <Input
        {...props}
        type="search"
        ref={ref}
        value={query}
        onChange={handleChange}
        className={cn(
          "w-full pr-8 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
          className,
        )}
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 size-6 -translate-y-1/2 transform"
        >
          <X className="size-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
}
