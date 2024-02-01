"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function UserName() {
  const { data } = useSession();

  return (
    <h2 className="text-xl font-bold">
      Olá{data?.user ? `, ${data.user.name}` : ""}!
    </h2>
  );
}
