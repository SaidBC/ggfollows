"use client";

import { User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Coins, UserCog, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserTableProps {
  users: User[];
  onUpdateRole: (user: User) => void;
  onAdjustPoints: (user: User) => void;
}

export default function UserTable({ users, onUpdateRole, onAdjustPoints }: UserTableProps) {
  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-border/10 hover:bg-transparent">
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">User / Identity</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Role</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Points</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-border/10 hover:bg-white/5 transition-colors group">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-white/10 group-hover:border-secondary/30 transition-colors shadow-lg">
                    <AvatarImage src={user.image || ""} alt={user.username || ""} />
                    <AvatarFallback className="bg-secondary/10 text-secondary text-xs font-black uppercase">
                      {(user.username || user.email || "U").substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-foreground tracking-tight underline decoration-secondary/30 underline-offset-2">
                        {user.username || "Guest"}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold opacity-60 flex items-center gap-1">
                        <Mail className="h-2.5 w-2.5" />
                        {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="outline" className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-0 border",
                  user.role === "ADMIN" 
                    ? "bg-secondary/10 text-secondary border-secondary/20 shadow-[0_0_10px_rgba(255,107,0,0.1)]" 
                    : "bg-white/5 text-muted-foreground border-white/10"
                )}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1.5 font-black text-xs italic tracking-tighter text-foreground">
                    <div className="flex items-center justify-center p-1 rounded-md bg-secondary/10 text-secondary">
                        <Coins className="h-3 w-3" />
                    </div>
                    {user.points.toLocaleString()}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5 rounded-lg active:scale-95 transition-transform">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card/90 backdrop-blur-xl border-border/20 rounded-xl">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Manage User</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem onClick={() => onUpdateRole(user)} className="text-xs focus:bg-white/5">
                      <UserCog className="mr-2 h-3.5 w-3.5" /> Change Role
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAdjustPoints(user)} className="text-xs text-secondary focus:bg-secondary/10 focus:text-secondary">
                      <Coins className="mr-2 h-3.5 w-3.5" /> Adjust Points
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
