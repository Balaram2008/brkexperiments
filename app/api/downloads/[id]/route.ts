import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateProjectArchive } from "@/lib/download-service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idOrSlug = params.id;
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Hardware project not found" }, { status: 404 });
    }

    let codeSnippets: Array<{ filename: string; code: string }> = [];
    try {
      codeSnippets = JSON.parse(project.codeSnippetJson || "[]");
    } catch {}

    const licenseKey = "BRK-" + project.slug.slice(0, 4).toUpperCase() + "-OPEN-HW-" + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Generate authenticated zip archive buffer
    const zipBuffer = await generateProjectArchive({
      title: project.title,
      slug: project.slug,
      platform: project.platform,
      version: project.currentVersion,
      licenseKey,
      userEmail: "maker@brkexperiments.dev",
      bomJson: project.bomJson,
      wiringTableJson: project.wiringTableJson,
      circuitSvg: project.circuitSvg,
      softwareReqsJson: project.softwareReqsJson,
      librariesJson: project.librariesJson,
      buildInstructionsJson: project.buildInstructionsJson,
      troubleshootingJson: project.troubleshootingJson,
      testingProcedureJson: project.testingProcedureJson,
      codeSnippets,
    });

    const uint8Array = new Uint8Array(zipBuffer);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${project.downloadFileName || `${project.slug}-hardware-package.zip`}"`,
        "Content-Length": uint8Array.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error("Download generation error:", error);
    return NextResponse.json({ error: "Hardware package generation failed" }, { status: 500 });
  }
}
