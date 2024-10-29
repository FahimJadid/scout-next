"use client";

import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <section
      role="search"
      className="relative w-full h-14 flex flex-col bg-white"
    >
      <div className="relative h-14 z-10 rounded-md">
        <Input
          disabled={isPending}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
            if (e.key === "Escape") inputRef?.current?.blur();
          }}
          ref={inputRef}
          className="absolute inset-0 h-full"
        />
        <Button
          disabled={isPending}
          onClick={handleSearch}
          size="sm"
          className="absolute right-0 inset-y-0 h-full rounded-l-none bg-teal-500 hover:bg-teal-600"
        >
          {isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </Button>
      </div>
    </section>
  );
};

export default SearchBar;
