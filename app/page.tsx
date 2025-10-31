"use client";

import SignUPFunnel from "@/components/signup/SignUpFunnel";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <SignUPFunnel />;
}
