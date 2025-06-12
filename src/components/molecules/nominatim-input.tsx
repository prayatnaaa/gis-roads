import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type NominatimInputProps = {
  onSearch: (q: string) => void;
};

export function NominatimInput({ onSearch }: NominatimInputProps) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 z-10"
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  );
}
