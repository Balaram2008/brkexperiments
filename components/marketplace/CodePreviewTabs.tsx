"use client";

import React, { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";

interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

interface CodePreviewProps {
  codeSnippetJson: string;
}

export function CodePreviewTabs({ codeSnippetJson }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  let snippets: CodeSnippet[] = [];
  try {
    snippets = JSON.parse(codeSnippetJson);
  } catch {
    return null;
  }

  if (!snippets || snippets.length === 0) return null;

  const current = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0B0B0D] overflow-hidden">
      {/* File Tabs header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {snippets.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === idx
                  ? "bg-white/10 text-white font-medium border border-white/10"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
              }`}
            >
              <FileCode className="h-3.5 w-3.5 text-primary-light" />
              <span>{s.filename.split("/").pop()}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-mono">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="font-mono">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code viewport with line numbers */}
      <div className="p-4 overflow-x-auto bg-[#08080A]">
        <pre className="text-xs font-mono text-neutral-300 leading-relaxed">
          <code>
            {current.code.split("\n").map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-neutral-600 select-none text-right font-mono text-[11px]">
                  {idx + 1}
                </span>
                <span className="table-cell">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      <div className="border-t border-white/5 bg-black/30 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <span>FILE: {current.filename}</span>
        <span className="uppercase text-primary-light">LANG: {current.language}</span>
      </div>
    </div>
  );
}
