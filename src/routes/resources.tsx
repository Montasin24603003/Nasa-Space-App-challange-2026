import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Database } from "lucide-react";
import { nasaDatasets } from "@/data/nasaDatasets";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "ISRU & Resources — Martian Map" },
      {
        name: "description",
        content:
          "Resource-planning context for a Martian survival mission, connected to NASA thermal, radiation, terrain, and spectroscopy archives.",
      },
    ],
  }),
  component: ResourcesPage,
});

const resources = [
  {
    name: "Water / Ice",
    type: "Survival resource",
    note: "Treat as a candidate resource layer rather than a universal surface fact. Site-level ice evidence should be tied to the chosen region and source dataset.",
    source: "Terrain + mission context",
  },
  {
    name: "Regolith / Basalt",
    type: "Construction material",
    note: "Regolith and basalt are useful planning categories for shielding and construction studies; actual extraction quality depends on local composition and engineering constraints.",
    source: "CRISM spectroscopy",
  },
  {
    name: "Atmospheric CO₂",
    type: "ISRU feedstock",
    note: "Mars' CO₂-rich atmosphere is a mission-planning input for oxygen and propellant concepts; production performance belongs in a separate engineering model.",
    source: "Mission systems context",
  },
  {
    name: "Thermal environment",
    type: "Energy / habitat load",
    note: "Viking IRTM data provide historical thermal mapping context that can feed a regional thermal-risk layer.",
    source: "Viking IRTM",
  },
  {
    name: "Radiation environment",
    type: "Crew safety",
    note: "Mars Odyssey MARIE archives provide radiation-environment measurements suitable for exposure and shielding analysis.",
    source: "Mars Odyssey MARIE",
  },
  {
    name: "Mineralogy",
    type: "Science / ISRU",
    note: "CRISM multiband observations can support mineral-target identification and science-route prioritization.",
    source: "MRO CRISM",
  },
];

function ResourcesPage() {
  return (
    <div className="rise-in">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">In-situ resource planning</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Resources & Evidence</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fog">
          A judge-friendly view of what the guide can reason about. Resource cards are planning abstractions;
          the NASA archive links below are the evidence layer for a future full-data implementation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <div key={r.name} className="rounded-xl border border-line/70 bg-panel/40 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-semibold">{r.name}</h3>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-cyan">{r.type}</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-fog">{r.note}</p>
            <p className="mt-4 font-mono text-[10px] text-amber">Evidence: {r.source}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line/70 bg-panel/30 p-5">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-cyan" />
          <h2 className="font-display text-xl font-bold">NASA evidence registry</h2>
        </div>
        <div className="mt-4 grid gap-2">
          {nasaDatasets.map((dataset) => (
            <a
              key={dataset.id}
              href={dataset.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg border border-line/60 bg-ink/30 px-3 py-3 transition-colors hover:border-cyan/30"
            >
              <span>
                <span className="block text-[12px] font-medium text-bright">{dataset.title}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-fog">{dataset.category}</span>
              </span>
              <ExternalLink className="size-3.5 shrink-0 text-fog" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
