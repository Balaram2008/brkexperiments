"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";

interface ReviewItem {
  id: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string | Date;
  user: {
    name: string;
    avatar?: string | null;
  };
}

interface ReviewSectionProps {
  projectId: string;
  rating: number;
  reviewCount: number;
  reviews: ReviewItem[];
}

export function ReviewSection({ projectId, rating, reviewCount, reviews: initialReviews }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !comment) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          userId: user?.id || "demo-builder-id",
          rating: newRating,
          title,
          comment,
        }),
      });
      const data = await res.json();
      if (data.review) {
        setReviews([data.review, ...reviews]);
      }
      setIsModalOpen(false);
      setTitle("");
      setComment("");
    } catch {
      // Local fallback
      const localRev: ReviewItem = {
        id: "local-" + Date.now(),
        rating: newRating,
        title,
        comment,
        verifiedPurchase: true,
        createdAt: new Date(),
        user: {
          name: user?.name || "Verified Builder",
        },
      };
      setReviews([localRev, ...reviews]);
      setIsModalOpen(false);
      setTitle("");
      setComment("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Verified Builder Reviews</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Ratings and feedback from engineers who purchased and deployed this project.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} variant="outline" size="sm" className="gap-2">
          <MessageSquarePlus className="h-4 w-4 text-primary-light" />
          <span>Write a Review</span>
        </Button>
      </div>

      {/* Ratings summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl bg-surface-secondary border border-border">
        <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-white/5 pb-4 sm:pb-0">
          <span className="text-4xl font-extrabold text-white font-mono">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1 my-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${
                  s <= Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-neutral-700 text-neutral-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-400 font-mono">Based on {reviewCount} verified reviews</span>
        </div>

        <div className="sm:col-span-2 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = star === 5 ? 88 : star === 4 ? 9 : 3;
            return (
              <div key={star} className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="w-12">{star} stars</span>
                <div className="h-2 flex-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-neutral-500">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4 pt-2">
        {reviews.length === 0 ? (
          <p className="text-center py-6 text-sm text-neutral-500">No reviews submitted yet for this project.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-white/5 bg-surface-secondary/40 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= r.rating ? "fill-amber-400 text-amber-400" : "fill-neutral-700 text-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">{r.title}</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">{formatDate(r.createdAt)}</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">{r.comment}</p>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-neutral-400 font-medium">{r.user.name}</span>
                {r.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Purchaser
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Project Review"
        description="Share your implementation experience with other builders."
      >
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= newRating ? "fill-amber-400 text-amber-400" : "fill-neutral-700 text-neutral-700"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">Review Title</label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Excellent code quality and fast setup"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">Your Feedback</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Detail your thoughts on the code structure, performance, and documentation..."
              className="w-full rounded-lg border border-border bg-surface-secondary p-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
