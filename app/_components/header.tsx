import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="p-5 flex justify-between items-center">
          <h1>booking.now</h1>
          <Button variant="outline" size="icon" className="size-8">
            <MenuIcon size={18} />
          </Button>
        </CardContent>
      </Card>
    </header>
  );
}
