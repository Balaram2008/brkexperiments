"use client";

import React, { useState } from "react";
import { Receipt, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";

const orders = [
  {
    id: "BRK-2026-90412",
    date: "Sep 18, 2026",
    item: "Smart Vision Analytics Engine",
    amount: 1899,
    method: "MOCK_INSTANT",
    status: "COMPLETED",
    license: "BRK-SVA-COMMERCIAL-9A82-41C2-88B1",
  },
  {
    id: "BRK-2026-88124",
    date: "Aug 29, 2026",
    item: "Autonomous Web Research Agent",
    amount: 1499,
    method: "CARD / STRIPE",
    status: "COMPLETED",
    license: "BRK-AGNT-PERSONAL-3F71-98B2-CC45",
  },
];

export default function PurchasesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Purchase History & Invoices</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Review transaction receipts and view commercial tax invoices.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 font-mono uppercase text-neutral-400">
              <tr>
                <th className="p-3.5 pl-5">Order ID</th>
                <th className="p-3.5">Project</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-5 font-mono font-semibold text-white">{o.id}</td>
                  <td className="p-3.5 font-medium">{o.item}</td>
                  <td className="p-3.5 font-mono text-neutral-500">{o.date}</td>
                  <td className="p-3.5 font-mono text-[11px] text-neutral-400">{o.method}</td>
                  <td className="p-3.5 font-mono font-bold text-white">{formatCurrency(o.amount)}</td>
                  <td className="p-3.5">
                    <Badge variant="success" className="text-[10px]">
                      {o.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <button
                      onClick={() => setSelectedInvoice(o)}
                      className="inline-flex items-center gap-1 rounded bg-white/5 hover:bg-white/10 px-2.5 py-1 text-xs text-primary-light font-mono"
                    >
                      <FileText className="h-3 w-3" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice ${selectedInvoice.id}`}
        >
          <div className="space-y-4 font-mono text-xs text-neutral-300 mt-2">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white text-sm">BRKExperiments Systems Lab</p>
                <p className="text-neutral-500">Bengaluru, Karnataka, India</p>
                <p className="text-neutral-500">GSTIN: 29AABCU9603R1ZX</p>
              </div>
              <div className="text-right">
                <Badge variant="success">PAID</Badge>
                <p className="text-neutral-400 mt-1">{selectedInvoice.date}</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-500 uppercase text-[10px]">Billed To:</span>
              <p className="font-semibold text-white">Arjun Sharma</p>
              <p className="text-neutral-400">builder@brkexperiments.dev</p>
            </div>

            <div className="border border-white/10 rounded-lg p-3 bg-surface-secondary space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>{selectedInvoice.item}</span>
                <span>{formatCurrency(selectedInvoice.amount)}</span>
              </div>
              <div className="text-[11px] text-neutral-400">License: {selectedInvoice.license}</div>
            </div>

            <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
              <span>Total Paid:</span>
              <span>{formatCurrency(selectedInvoice.amount)}</span>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => window.print()}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
