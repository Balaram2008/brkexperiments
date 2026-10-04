import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const category = await prisma.category.findUnique({
      where: { slug: body.categorySlug },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        platform: body.platform || "ESP32",
        shortDescription: body.shortDescription,
        description: body.description,
        categoryId: category.id,
        price: 0,
        discountPrice: 0,
        currency: "INR",
        thumbnail: body.thumbnail,
        gallery: JSON.stringify([body.thumbnail]),
        difficulty: body.difficulty || "Beginner",
        projectType: body.projectType || "Hardware Project",
        buildTime: body.buildTime || "1-2 Hours",
        estimatedCost: body.estimatedCost || "Free Access",
        youtubeUrl: body.youtubeUrl || "https://www.youtube.com/@BRKEXPERIMENTS",
        isExperiment: body.isExperiment || false,
        experimentTag: body.experimentTag || null,
        published: true,
        currentVersion: "1.0.0",
        architectureJson: JSON.stringify([]),
        bomJson: JSON.stringify(body.bom || []),
        wiringTableJson: JSON.stringify(body.wiring || []),
        softwareReqsJson: JSON.stringify(body.softwareReqs || ["Arduino IDE 2.x"]),
        librariesJson: JSON.stringify(body.libraries || []),
        buildInstructionsJson: JSON.stringify(body.buildInstructions || []),
        troubleshootingJson: JSON.stringify(body.troubleshooting || []),
        testingProcedureJson: JSON.stringify(body.testingProcedure || {}),
        applicationsJson: JSON.stringify(body.applications || []),
        codeSnippetJson: JSON.stringify(body.codeSnippets || []),
        faqJson: JSON.stringify(body.faq || []),
        changelogJson: JSON.stringify([]),
        downloadFileName: `${body.slug}-hardware-package.zip`,
      },
    });

    return NextResponse.json({ project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
