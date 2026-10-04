import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawProjectId = body.projectId;
    const projectId = Array.isArray(rawProjectId) ? rawProjectId[0] : rawProjectId;
    const { userId, rating, title, comment } = body;

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ id: userId }, { email: "builder@brkexperiments.dev" }],
      },
    });

    if (!user) {
      user = await prisma.user.findFirst();
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        projectId,
        userId: user.id,
        rating,
        title,
        comment,
        verifiedPurchase: true,
      },
      include: {
        user: true,
      },
    });

    const allReviews = await prisma.review.findMany({ where: { projectId } });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.project.update({
      where: { id: projectId },
      data: {
        rating: Math.round(avg * 10) / 10,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json({ review });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to post review" }, { status: 500 });
  }
}
