import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CircleDot, Compass, FlaskConical, MapPinned, Play, ShieldCheck, Sparkles } from "lucide-react";

import { MarsExplorer, marsSites } from "@/components/MarsExplorer";
import { NasaDataAtlas } from "@/components/NasaDataAtlas";
import { SurvivalSimulator } from "@/components/SurvivalSimulator";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Martian Map — Interplanetary Survival Guide" },
      {
        name: "description",
        content:
          "Interactive Martian mission-control interface combining NASA data provenance, layered hazard/resource planning, and a survival simulator.",
      },
      { property: "og:title", content: "Martian Map — Interplanetary Survival Guide" },
      {
        property: "og:description",
        content:
          "Interactive Martian mission-control interface combining NASA data provenance, layered hazard/resource planning, and a survival simulator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="hero-mars rise-in rounded-[28px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-mint">
                <span className="size-1.5 rounded-full bg-mint" /> NASA Space Apps 2026
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-fog">
                <Sparkles className="size-3.5 text-amber" /> Mission planning sandbox
              </span>
            </div>
            <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[.24em] text-amber">Interplanetary Survival Guide</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[.98] tracking-[-.04em] text-bright sm:text-5xl lg:text-7xl">
              Plan a Mars mission
              <span className="block text-amber">before Mars plans for you.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-fog sm:text-base">
              Explore candidate landing sites, fuse terrain and hazard context, protect mission resources, and test a complete EVA—then ask the AI Mission Advisor why the mission succeeds or fails.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#mission-map" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber px-5 text-sm font-semibold text-white shadow-lg shadow-amber/20 transition-transform hover:-translate-y-0.5 hover:bg-amber/90">
                Explore Martian Map <ArrowRight className="size-4" />
              </a>
              <a href="/sol-by-sol" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 text-sm font-semibold text-bright shadow-sm transition-colors hover:bg-ink2">
                <Play className="size-4 text-cyan" /> Run Mission Simulator
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[.12em] text-fog">
              <span>NASA data provenance</span><span>·</span><span>Interactive 3D Mars</span><span>·</span><span>AI-assisted decisions</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="soft-card relative overflow-hidden rounded-[24px] p-3">
              <div className="relative aspect-[1.08/1] overflow-hidden rounded-[18px] bg-[#111827]">
                <img src="/mars-jezero-map.jpg" alt="Martian surface reference map" className="absolute inset-0 size-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,transparent_0_18%,rgba(10,16,24,.15)_45%,rgba(10,16,24,.76)_100%)]" />
                <div className="absolute left-4 top-4 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white backdrop-blur-md">
                  <p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/60">Current sector</p>
                  <p className="mt-1 font-display text-sm font-semibold">Jezero Crater</p>
                  <p className="mt-0.5 font-mono text-[9px] text-cyan">18.4°N · 77.5°E</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                  <HeroMetric label="Route" value="91%" />
                  <HeroMetric label="Water ice" value="HIGH" />
                  <HeroMetric label="Science" value="8" />
                </div>
                <div className="mars-float absolute right-[16%] top-[29%] grid size-28 place-items-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-[2px] sm:size-32">
                  <div className="size-20 rounded-full bg-[radial-gradient(circle_at_34%_30%,#f5c29d,#b75b3d_52%,#682f28_100%)] shadow-[inset_-12px_-12px_25px_rgba(40,10,5,.32),0_15px_45px_rgba(0,0,0,.45)] sm:size-24" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[.16em] text-fog">Mission status</p>
                  <p className="mt-1 font-display text-sm font-semibold text-bright">Observe → Compare → Plan → Act</p>
                </div>
                <span className="rounded-full border border-mint/20 bg-mint/10 px-2.5 py-1 font-mono text-[9px] text-mint">NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="mission-map" className="scroll-mt-24 pt-8">
        <MarsExplorer />
      </div>

      <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Radiation planning baseline" value="DEMO" unit="MARIE" status="Source-backed layer · value simulated" color="text-rose" icon={<ShieldCheck />} />
        <StatCard label="Water-ice layer" value="HIGH" unit="planning" status="Resource target · modelled context" color="text-cyan" icon={<CircleDot />} />
        <StatCard label="Route confidence" value="91" unit="%" status="Demo fusion score" color="text-mint" icon={<Compass />} />
        <StatCard label="Science targets" value="38" unit="indexed" status="Demo candidate set" color="text-amber" icon={<FlaskConical />} />
      </section>

      <section aria-label="Mars mission facts" className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line/70 bg-line/70 md:grid-cols-5">
        <PlanetFact label="Gravity" value="3.71 m/s²" note="38% of Earth" />
        <PlanetFact label="Solar day" value="24h 39m" note="One sol" />
        <PlanetFact label="Atmosphere" value="95.3% CO₂" note="Very low pressure" />
        <PlanetFact label="Mean surface" value="−63°C" note="Large daily swings" />
        <PlanetFact label="Map regions" value={`${marsSites.length} indexed`} note="Expandable dataset" />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-line bg-white/80 shadow-sm p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Why this interface works</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <FeatureCard icon={<MapPinned />} title="See the planet" text="One interactive surface for site selection, terrain, and layered mission context." />
            <FeatureCard icon={<ShieldCheck />} title="Stay ahead of hazards" text="Radiation, slope, thermal risk, and route confidence remain visible while you plan." />
            <FeatureCard icon={<FlaskConical />} title="Preserve science value" text="Science targets stay inside the route instead of becoming a separate afterthought." />
          </div>
        </div>
        <div className="rounded-2xl border border-amber/20 bg-amber/[0.07] shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">Demo briefing</p>
              <h2 className="mt-2 font-display text-2xl font-bold">Build your story around one mission leg.</h2>
            </div>
            <ArrowUpRight className="text-amber" />
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-fog">
            Start at a landing site, enable the route layer, inspect a hazard, identify a science target, and open Marswalk Mode.
            That sequence gives judges a clear story: observe → compare → plan → act.
          </p>
        </div>
      </section>

      <section id="sites" className="mt-8 scroll-mt-20">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">Candidate surface sectors</p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Indexed mission waypoints</h2>
          </div>
          <span className="hidden font-mono text-[11px] text-fog sm:inline">{marsSites.length} live demo records</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {marsSites.slice(0, 3).map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </section>

      <NasaDataAtlas />
      <SurvivalSimulator />
    </>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-white backdrop-blur-md">
      <p className="font-mono text-[8px] uppercase tracking-[.15em] text-white/55">{label}</p>
      <p className="mt-1 font-display text-sm font-bold">{value}</p>
    </div>
  );
}

function PlanetFact({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="bg-panel/80 p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-fog">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-bright">{value}</p>
      <p className="mt-0.5 text-[10px] text-fog">{note}</p>
    </div>
  );
}

function StatCard({ label, value, unit, status, color, icon }: { label: string; value: string; unit: string; status: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white/80 shadow-sm p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">{label}</p>
        <span className={color}>{icon}</span>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold ${color}`}>
        {value} <span className="font-mono text-xs text-fog">{unit}</span>
      </p>
      <p className="mt-1 text-[11px] text-fog">{status}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-ink2/60 p-4">
      <span className="text-cyan">{icon}</span>
      <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-[12px] leading-relaxed text-fog">{text}</p>
    </div>
  );
}

function SiteCard({ site }: { site: (typeof marsSites)[number] }) {
  const tone = site.score >= 80 ? "mint" : site.score >= 60 ? "amber" : "rose";
  const scoreClasses = {
    mint: "bg-mint/15 border-mint/30 text-mint",
    amber: "bg-amber/15 border-amber/30 text-amber",
    rose: "bg-rose/15 border-rose/30 text-rose",
  } as const;

  return (
    <div className="rounded-xl border border-line bg-white/80 shadow-sm p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-fog">{site.coordinates}</span>
        <span className={`rounded-full border px-2 py-0.5 font-mono text-[11px] ${scoreClasses[tone]}`}>{site.score}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold">{site.name}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-fog">{site.terrain}</p>
      <div className="mt-4 space-y-2 border-t border-line/60 pt-3">
        <MetaRow label="Water ice" value={site.waterIce} tone="text-cyan" />
        <MetaRow label="Radiation" value={site.radiation} tone="text-rose" />
        <MetaRow label="Rover / relay" value={site.rover} tone="text-amber" />
      </div>
    </div>
  );
}

function MetaRow({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex items-center justify-between gap-4 font-mono text-[10px]">
      <span className="text-fog">{label}</span>
      <span className={tone}>{value}</span>
    </div>
  );
}
