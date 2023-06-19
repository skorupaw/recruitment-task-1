import React from "react"

export const Search = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>((props, ref) => {
  return (
    <div className="py-4">
      <input
        type="text"
        ref={ref}
        placeholder="🔍 Search..."
        className="border-2 border-solid border-neutral-200 shadow-md rounded-full px-6 py-2 w-full"
        {...props}
      />
    </div>
  )
})
