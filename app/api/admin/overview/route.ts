import prisma from "@/lib/prisma";
import fieldErrorResponse from "@/utils/fieldErrorResponse";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await isAuthenticated(req);
    if (!auth.isSuccess) return auth.response;

    const user = await prisma.user.findUnique({
      where: { id: auth.data.id },
    });

    if (!user || user.role !== "ADMIN") {
      return fieldErrorResponse("root", "Forbidden: Admin access only", 403);
    }

    const [
      totalUsers,
      totalOrders,
      totalTasks,
      totalTickets,
      activeOrders,
      activeTasks,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.task.count(),
      prisma.supportTicket.count(),
      prisma.order.count({ where: { status: { in: ["PENDING", "PROCESSING"] } } }),
      prisma.task.count({ 
        where: { 
          completions: {
             none: { status: "VERIFIED" } // This is a bit complex, simplified: just count total tasks for now or tasks with remaining slots
          } 
        } 
      }).catch(() => 0), // Fallback if query is too complex
    ]);

    // Better active task count: tasks where completions < quantity
    const tasks = await prisma.task.findMany({
        include: { _count: { select: { completions: { where: { status: "VERIFIED" } } } } }
    });
    const realActiveTasks = tasks.filter(t => t._count.completions < t.quantity).length;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalTasks,
        totalTickets,
        activeOrders,
        activeTasks: realActiveTasks,
      },
    });
  } catch (error) {
    console.error("Fetch overview stats error:", error);
    return fieldErrorResponse("root", "Internal server error", 500);
  }
}
