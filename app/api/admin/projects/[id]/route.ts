import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { category: true, technologies: { include: { technology: true } } },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    let categoryId = undefined;
    if (body.categorySlug) {
      const cat = await prisma.category.findUnique({ where: { slug: body.categorySlug } });
      if (cat) categoryId = cat.id;
    }

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        platform: body.platform,
        difficulty: body.difficulty,
        buildTime: body.buildTime,
        estimatedCost: body.estimatedCost,
        youtubeUrl: body.youtubeUrl,
        shortDescription: body.shortDescription,
        description: body.description,
        thumbnail: body.thumbnail,
        published: body.published !== undefined ? body.published : true,
        isExperiment: body.isExperiment !== undefined ? body.isExperiment : false,
        experimentTag: body.experimentTag,
        ...(categoryId ? { categoryId } : {}),
        ...(body.bomJson ? { bomJson: body.bomJson } : {}),
        ...(body.wiringTableJson ? { wiringTableJson: body.wiringTableJson } : {}),
        ...(body.codeSnippetJson ? { codeSnippetJson: body.codeSnippetJson } : {}),
        ...(body.circuitSvg !== undefined ? { circuitSvg: body.circuitSvg } : {}),
        ...(body.buildInstructionsJson ? { buildInstructionsJson: body.buildInstructionsJson } : {}),
        ...(body.troubleshootingJson ? { troubleshootingJson: body.troubleshootingJson } : {}),
        ...(body.testingProcedureJson ? { testingProcedureJson: body.testingProcedureJson } : {}),
        ...(body.applicationsJson ? { applicationsJson: body.applicationsJson } : {}),
        ...(body.faqJson ? { faqJson: body.faqJson } : {}),
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        published: body.published,
      },
    });
    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.projectTechnology.deleteMany({ where: { projectId: params.id } });
    await prisma.orderItem.deleteMany({ where: { projectId: params.id } });
    await prisma.entitlement.deleteMany({ where: { projectId: params.id } });
    await prisma.favorite.deleteMany({ where: { projectId: params.id } });
    await prisma.review.deleteMany({ where: { projectId: params.id } });
    await prisma.downloadLog.deleteMany({ where: { projectId: params.id } });

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
