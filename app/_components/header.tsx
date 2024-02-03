"use client";

import React from "react";
import Menu from "./menu";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="p-5 flex justify-between items-center">
          <Link href={"/"}>booking.now</Link>
          <Menu />
        </CardContent>
      </Card>
    </header>
  );
}
