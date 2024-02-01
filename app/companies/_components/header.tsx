"use client";
import Menu from "@/app/_components/menu";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="z-50 flex justify-between absolute top-4 left-4 right-4">
      <Link href={"/"}>
        <Button variant="outline" size="icon" className="size-8">
          <ChevronLeftIcon size={18} />
        </Button>
      </Link>
      <Menu />
    </div>
  );
}
