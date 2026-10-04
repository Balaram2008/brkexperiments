"use client";

import React, { useState } from "react";
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from "lucide-react";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface FolderTreeProps {
  folderTreeJson: string;
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(true);
  const isDirectory = !!node.children && node.children.length > 0;

  return (
    <div className="font-mono text-xs select-none">
      <div
        onClick={() => isDirectory && setOpen(!open)}
        style={{ paddingLeft: `${depth * 16}px` }}
        className={`flex items-center gap-1.5 py-1 rounded hover:bg-white/5 cursor-pointer text-neutral-300 transition-colors ${
          isDirectory ? "font-semibold text-white" : ""
        }`}
      >
        {isDirectory ? (
          open ? (
            <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-neutral-500" />
          )
        ) : (
          <span className="w-3.5" />
        )}

        {isDirectory ? (
          open ? (
            <FolderOpen className="h-3.5 w-3.5 text-primary-light" />
          ) : (
            <Folder className="h-3.5 w-3.5 text-primary-light" />
          )
        ) : (
          <FileText className="h-3.5 w-3.5 text-neutral-400" />
        )}

        <span>{node.name}</span>
      </div>

      {isDirectory && open && (
        <div className="border-l border-white/5 ml-3">
          {node.children!.map((child, idx) => (
            <TreeItem key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FolderTree({ folderTreeJson }: FolderTreeProps) {
  let rootNode: TreeNode | null = null;
  try {
    rootNode = JSON.parse(folderTreeJson);
  } catch {
    return null;
  }

  if (!rootNode) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5">
      <div className="border-b border-white/10 pb-3 mb-4 flex items-center justify-between text-xs font-mono text-neutral-400">
        <span className="uppercase tracking-wider text-white">Repository File Structure</span>
        <span className="text-primary-light">EXPANDED / TREE</span>
      </div>
      <div className="overflow-x-auto max-h-80 pr-2">
        <TreeItem node={rootNode} />
      </div>
    </div>
  );
}
