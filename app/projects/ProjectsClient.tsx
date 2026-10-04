"use client";

import React, { useState, useMemo } from "react";
import { Search, LayoutGrid, List, Filter, X, Cpu } from "lucide-react";
import { ProjectCard, ProjectCardData } from "@/components/marketplace/ProjectCard";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { Button } from "@/components/ui/Button";

interface ProjectsClientProps {
  initialProjects: ProjectCardData[];
  categories: Array<{ id: string; name: string; slug: string }>;
  initialCategory: string | null;
  initialQuery: string;
}

export function ProjectsClient({
  initialProjects,
  categories,
  initialCategory,
  initialQuery,
}: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "rating" | "popular">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.shortDescription.toLowerCase().includes(q);
          const matchPlatform = (project.platform || "").toLowerCase().includes(q);
          const matchCategory = project.category?.name.toLowerCase().includes(q);
          const matchTech = project.technologies?.some((t) =>
            t.technology.name.toLowerCase().includes(q)
          );
          if (!matchTitle && !matchDesc && !matchPlatform && !matchCategory && !matchTech) return false;
        }

        // Platform filter
        if (selectedPlatform && project.platform !== selectedPlatform) {
          return false;
        }

        // Category filter
        if (selectedCategory && project.category?.slug !== selectedCategory) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty && project.difficulty !== selectedDifficulty) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.reviewCount - a.reviewCount;
        if (sortBy === "rating") return b.rating - a.rating;
        // default: featured or newest
        return 0;
      });
  }, [
    initialProjects,
    searchQuery,
    selectedCategory,
    selectedPlatform,
    selectedDifficulty,
    sortBy,
  ]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedPlatform(null);
    setSelectedDifficulty(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-primary-light uppercase">
          <Cpu className="h-4 w-4 text-primary-light" />
          <span>ARDUINO & ESP HARDWARE ENGINEERING LAB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hardware Project Catalog
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Explore complete open-source hardware packages across ESP32, Arduino UNO, Arduino Nano,
          Arduino Mega, and ESP8266. Full source code, circuit schematics, wiring pinouts, and build guides.
        </p>
      </div>

      {/* Search & Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search projects (e.g. ESP32, Relay, OLED, Ultrasonic, RC522)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-medium text-neutral-300"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-white/10 bg-[#0B0B0D] px-3 py-2 text-xs font-medium text-neutral-300 focus:outline-none focus:border-primary"
          >
            <option value="featured">Sort: Featured</option>
            <option value="popular">Sort: Most Popular</option>
            <option value="rating">Sort: Highest Rated</option>
          </select>

          {/* Grid/List View Toggle */}
          <div className="hidden sm:flex items-center rounded-lg border border-white/10 bg-[#0B0B0D] p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-1 text-xs transition-colors ${
                viewMode === "grid" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-1 text-xs transition-colors ${
                viewMode === "list" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedPlatform={selectedPlatform}
            onSelectPlatform={setSelectedPlatform}
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={setSelectedDifficulty}
            onReset={handleReset}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setMobileFilterOpen(false);
              }}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={(plat) => {
                setSelectedPlatform(plat);
                setMobileFilterOpen(false);
              }}
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={(diff) => {
                setSelectedDifficulty(diff);
                setMobileFilterOpen(false);
              }}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Projects Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results count & active tags */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>
              {filteredProjects.length} {filteredProjects.length === 1 ? "hardware project" : "hardware projects"} found
            </span>
            {(selectedCategory || selectedPlatform || selectedDifficulty || searchQuery) && (
              <button onClick={handleReset} className="text-primary-light hover:underline">
                Clear all filters
              </button>
            )}
          </div>

          {/* Grid View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0B0B0D] py-16 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-neutral-500 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">No hardware projects matched your criteria</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                Try selecting a different microcontroller platform or resetting applied filters.
              </p>
              <Button onClick={handleReset} variant="outline" size="sm" className="mt-4">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
