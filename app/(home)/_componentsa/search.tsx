import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

export default function Search() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Qual serviço gostaria de agendar hoje?" />
      <Button size="icon">
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}
