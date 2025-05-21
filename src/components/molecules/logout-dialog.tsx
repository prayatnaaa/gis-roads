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

export function LogoutDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <h1 className="text-red-700 hover:font-semibold hover:cursor-pointer">
          Log out
        </h1>
      </AlertDialogTrigger>
      <AlertDialogContent>
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
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
