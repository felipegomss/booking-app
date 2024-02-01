"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Menu from "./menu";

export default function Header() {
  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="p-5 flex justify-between items-center">
          <h1>booking.now</h1>
          <Menu />
        </CardContent>
      </Card>
    </header>
  );
}
