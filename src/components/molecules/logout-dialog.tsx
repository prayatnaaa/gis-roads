import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import React from "react";
import { boolean } from "zod";
import { useNavigate } from "react-router-dom";

export function LogoutDialog() {
  const [isOpen, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
        <h1 className="text-red-600 hover:font-semibold hover:cursor-pointer">
          Log out
        </h1>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${isOpen ? "block" : "hidden"}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you absolutely sure want to log out? you'll need to sign in
            after this
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("auth/login");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
