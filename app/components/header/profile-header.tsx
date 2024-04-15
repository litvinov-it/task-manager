"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ProfileHeader = () => {
  const { status, data: session } = useSession();
  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && (
        <div>
          <div>{session.user!.name}</div>
          <Link href="/api/auth/signout" className="ml-3">Sign Out</Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default ProfileHeader;
