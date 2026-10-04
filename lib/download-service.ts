import archiver from "archiver";

export interface ProjectArchiveData {
  title: string;
  slug: string;
  platform?: string;
  version: string;
  licenseKey: string;
  userEmail: string;
  bomJson?: string;
  wiringTableJson?: string;
  circuitSvg?: string | null;
  softwareReqsJson?: string;
  librariesJson?: string;
  buildInstructionsJson?: string;
  troubleshootingJson?: string;
  testingProcedureJson?: string;
  codeSnippets: Array<{ filename: string; code: string }>;
}

export function generateProjectArchive(data: ProjectArchiveData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk) => chunks.push(chunk));
    archive.on("end", () => resolve(Buffer.concat(chunks)));
    archive.on("error", (err) => reject(err));

    let bomItems: Array<{ component: string; qty: string; specs: string; estCost?: string }> = [];
    let wiringItems: Array<{ boardPin: string; componentPin: string; component: string; notes?: string }> = [];
    let softwareReqs: string[] = [];
    let libraries: Array<{ name: string; author: string; installMethod: string }> = [];
    let buildSteps: Array<{ step: number; title: string; instruction: string }> = [];
    let troubleshooting: Array<{ problem: string; cause: string; solution: string }> = [];

    try { bomItems = JSON.parse(data.bomJson || "[]"); } catch {}
    try { wiringItems = JSON.parse(data.wiringTableJson || "[]"); } catch {}
    try { softwareReqs = JSON.parse(data.softwareReqsJson || "[]"); } catch {}
    try { libraries = JSON.parse(data.librariesJson || "[]"); } catch {}
    try { buildSteps = JSON.parse(data.buildInstructionsJson || "[]"); } catch {}
    try { troubleshooting = JSON.parse(data.troubleshootingJson || "[]"); } catch {}

    // 1. Add Comprehensive Hardware README.md
    const readmeContent = `# ${data.title} (${data.version})
BRKExperiments — Hardware Engineering Lab Package
Platform: ${data.platform || "Arduino / ESP"}
------------------------------------------------------
License: Open Hardware (Free for Personal, Education & Commercial Prototyping)
Community: https://www.youtube.com/@BRKEXPERIMENTS
Instagram: https://www.instagram.com/BRKEXPERIMENTS

## 1. BILL OF MATERIALS (BOM)
${bomItems.map((b, i) => `${i + 1}. ${b.component} (Qty: ${b.qty}) - Specs: ${b.specs} [Est: ${b.estCost || "N/A"}]`).join("\n")}

## 2. PIN CONFIGURATION & WIRING TABLE
${wiringItems.map((w) => `- ${data.platform} [${w.boardPin}]  -->  ${w.component} [${w.componentPin}] (${w.notes || "Direct"})`).join("\n")}

## 3. SOFTWARE & LIBRARIES REQUIRED
${softwareReqs.map((s) => `- ${s}`).join("\n")}

Libraries to install via Arduino Library Manager:
${libraries.map((l) => `- ${l.name} by ${l.author} (${l.installMethod})`).join("\n")}

## 4. STEP-BY-STEP BUILD GUIDE
${buildSteps.map((s) => `### Step ${s.step}: ${s.title}\n${s.instruction}\n`).join("\n")}

## 5. TROUBLESHOOTING GUIDE
${troubleshooting.map((t) => `- PROBLEM: ${t.problem}\n  CAUSE: ${t.cause}\n  SOLUTION: ${t.solution}\n`).join("\n")}

Support & Video Tutorials: https://www.youtube.com/@BRKEXPERIMENTS
`;
    archive.append(readmeContent, { name: "README.md" });

    // 2. Add LICENSE.txt
    const licenseContent = `BRKEXPERIMENTS OPEN HARDWARE LICENSE
Version 1.0 - BRKExperiments Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this hardware package and accompanying software files, to build, modify,
study, distribute, and manufacture prototypes.

Project: ${data.title}
Platform: ${data.platform || "ESP32 / Arduino"}
Author: BRKExperiments (https://www.youtube.com/@BRKEXPERIMENTS)
`;
    archive.append(licenseContent, { name: "LICENSE.txt" });

    // 3. Add bill-of-materials.csv
    let bomCsv = "Component,Quantity,Specifications,EstimatedCost\n";
    for (const b of bomItems) {
      bomCsv += `"${b.component}","${b.qty}","${b.specs}","${b.estCost || ""}"\n`;
    }
    archive.append(bomCsv, { name: "bill-of-materials.csv" });

    // 4. Add wiring-connections.csv
    let wiringCsv = "BoardPin,Component,ComponentPin,Notes\n";
    for (const w of wiringItems) {
      wiringCsv += `"${w.boardPin}","${w.component}","${w.componentPin}","${w.notes || ""}"\n`;
    }
    archive.append(wiringCsv, { name: "wiring-connections.csv" });

    // 5. Add circuit-diagram.svg if present
    if (data.circuitSvg) {
      archive.append(data.circuitSvg, { name: "circuit-diagram.svg" });
    }

    // 6. Add Arduino .ino sketch code files
    for (const snippet of data.codeSnippets) {
      archive.append(snippet.code, { name: snippet.filename });
    }

    archive.finalize();
  });
}
