import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutDialog } from "./logout-dialog";

import { Avatar } from "@/components/atoms/avatar";
import { SettingsIcon } from "lucide-react";

export function UserAvatarDialog() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <SettingsIcon className="h-6 w-6 hover:cursor-pointer" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={10} className="w-56">
        <DropdownMenuLabel className="font-semibold">
          Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuItem className="hover:cursor-pointer">
          <LogoutDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
