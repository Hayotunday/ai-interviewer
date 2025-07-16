"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";

const LogoutButton = () => {
  return (
    <Button
      onClick={signOut}
      type="button"
      className="!w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold !px-5 cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
