"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function main() {
  const router = useRouter();

  useEffect(() => {
    router.push('/issues');
  }, []);
  
  return null
}
