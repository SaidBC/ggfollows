"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmailStatus from "@/ui/(private)/settings/EmailStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AccountSettingsSection() {
  //   const session = useSession();
  //   if (session.status === "unauthenticated" || !session.data)
  //     return <>You must be logged in to see this page</>;

  const user = {
    name: "Razzouk",
    email: "razzouk@example.com",
    image: "https://example.com/avatar.png",
    id: "user_01",
    username: "razzouk_dev",
    role: "user",
    emailVerified: null,
  };
  return (
    <div>
      <div className="grid gap-2 my-4">
        <h1 className="font-bold text-3xl my-2 text-neutral-300">
          Account Settings
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b pb-4">
          <h3 className="font-bold text-sm">Profile</h3>
          <div>
            <Avatar className="h-8 w-8 rounded-lg ">
              <AvatarImage src={"/next.svg"} alt={user.username} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="secondary">Update Profile</Button>
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b pb-4">
          <h3 className="font-bold text-sm">Email</h3>
          <Input
            type="email"
            placeholder="Enter your email"
            defaultValue={user.email || ""}
            disabled
          />
          <Button variant="secondary">Update Email</Button>
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b pb-4">
          <h3 className="font-bold text-sm">Username</h3>
          <Input
            type="text"
            placeholder="Enter your email"
            defaultValue={user.username}
            disabled
          />
          <Button variant="secondary">Update Username</Button>
        </div>
        <EmailStatus verified={Boolean(user.emailVerified)} />
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 border-b pb-4">
          <h3 className="font-bold text-sm">Account tier </h3>
          <div>Free</div>
        </div>
      </div>
    </div>
  );
}
