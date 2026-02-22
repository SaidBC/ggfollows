import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  title: string;
  description?: string;
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
  className?: string;
}

export default function AdminHeader({ title, description, icon: Icon, className }: AdminHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 mb-8 animate-fade-down", className)}>
      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-secondary/10 text-secondary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-secondary/20">
          <Icon size={24} stroke={2.5} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight uppercase italic drop-shadow-sm">
            {title}
          </h1>
          {description && (
            <p className="text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase opacity-70">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
