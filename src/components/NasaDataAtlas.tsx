import { ExternalLink, Database, Layers3, ShieldCheck, Thermometer, Mountain, Sparkles } from "lucide-react";
import { nasaDatasets, pipelineLayers } from "@/data/nasaDatasets";

const icons = {
  "Terrain / ML": Mountain,
  Thermal: Thermometer,
  Radiation: ShieldCheck,
  "Mineralogy / Spectroscopy": Sparkles,
} as const;

export function NasaDataAtlas() {
  return (
    <section id="data-atlas" className="mt-10 scroll-mt-24 rise-in">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">NASA data fusion layer</p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">From raw archives to a survival decision</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fog">
            The project bundle includes NASA Open Data Portal pages for terrain classification, Viking thermal mapping,
            Mars Odyssey radiation measurements, and MRO CRISM spectroscopy. We expose their provenance here instead of
            presenting demo planning values as live telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-mint/20 bg-mint/5 px-3 py-1.5 font-mono text-[10px] text-mint">
          <Database className="size-3.5" /> {nasaDatasets.length} source records indexed
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {pipelineLayers.map((layer) => (
          <div key={layer.key} className="rounded-xl border border-line/70 bg-panel/40 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <Layers3 className="size-4 text-amber" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan">FUSED</span>
            </div>
            <h3 className="mt-3 font-display text-sm font-semibold">{layer.label}</h3>
            <p className="mt-1 font-mono text-[9px] text-fog">{layer.source}</p>
            <p className="mt-3 text-[11px] leading-relaxed text-fog">{layer.effect}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {nasaDatasets.map((dataset) => {
          const Icon = icons[dataset.category as keyof typeof icons] ?? Database;
          return (
            <article key={dataset.id} className="rounded-xl border border-line/70 bg-panel/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-cyan/20 bg-cyan/5">
                    <Icon className="size-4 text-cyan" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber">{dataset.category}</p>
                    <h3 className="mt-1 font-display text-sm font-semibold leading-snug">{dataset.title}</h3>
                  </div>
                </div>
                <a
                  href={dataset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-md border border-line px-2 py-1 text-fog transition-colors hover:border-cyan/40 hover:text-cyan"
                  aria-label={`Open ${dataset.title} on NASA Open Data Portal`}
                >
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-fog">{dataset.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-amber/20 bg-amber/[0.05] p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">Data integrity note</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-fog">
          The uploaded bundle contains archived NASA dataset web pages and metadata, not the complete raw instrument archives.
          The interface therefore labels its mission-planning numbers as demonstration values. The NASA links above are the
          hand-off points for connecting the full archives or a trained fusion model later.
        </p>
      </div>
    </section>
  );
}
