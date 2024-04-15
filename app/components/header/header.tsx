import Link from "next/link";
import React from "react";
import ProfileHeader from "./profile-header";

const Header = () => {
  return (
    <header className="my-4 w-full flex items-center justify-center">
      <ProfileHeader />
      <Link href={"/issues"} className="btn btn-ghost text-2xl">
        Задачи
      </Link>
    </header>
  );
};

export default Header;
