import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/protocols")({
  head: () => ({
    meta: [
      { title: "Survival Protocols — Martian Map" },
      {
        name: "description",
        content:
          "Operational survival protocols for a crewed Mars surface mission — radiation sheltering, thermal management, oxygen recycling, water rationing, dust sealing, and hydroponic food cycles.",
      },
      { property: "og:title", content: "Survival Protocols — Martian Map" },
      {
        property: "og:description",
        content:
          "Operational survival protocols for a crewed Mars surface mission — radiation sheltering, thermal management, oxygen recycling, water rationing, dust sealing, and hydroponic food cycles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProtocolsPage,
});

const protocols = [
  {
    id: "P-01",
    category: "Radiation",
    title: "Shelter to basalt overhang",
    description:
      "Limit surface exposure to 2h during solar particle events. Route crew to 0.4m regolith shield when GCR flux exceeds 1.1× baseline.",
    ref: "GCR dosimetry model v3",
    tone: "rose" as const,
    status: "ACTIVE",
  },
  {
    id: "P-02",
    category: "Temperature",
    title: "Seal habitat at dusk",
    description:
      "Ambient drops below −80°C after sunset. Preheat habitat to 21°C and run thermal loop before nightfall to preserve thermal mass.",
    ref: "Thermal budget sheet 12",
    tone: "rose" as const,
    status: "ACTIVE",
  },
  {
    id: "P-03",
    category: "Oxygen",
    title: "Recycle CO₂ at 90%",
    description:
      "Trigger scrubber cycle before O₂ falls under 19.5%. Maintain MOXIE backup for atmospheric CO₂ extraction during EVA windows.",
    ref: "Atmospheric processor log",
    tone: "cyan" as const,
    status: "ACTIVE",
  },
  {
    id: "P-04",
    category: "Water",
    title: "Ration to 2.5 L per crew per sol",
    description:
      "Prioritize sublimation of captured subsurface ice over surface melt. Recycle 98% of condensate through the closed-loop filter.",
    ref: "ISRU extraction log",
    tone: "cyan" as const,
    status: "STANDBY",
  },
  {
    id: "P-05",
    category: "Dust",
    title: "Seal intakes on storm approach",
    description:
      "Fine regolith abrades seals and degrades solar output by 41%. Close vents when atmospheric opacity exceeds 0.8 and shelter in place.",
    ref: "Storm prediction model 07",
    tone: "rose" as const,
    status: "ACTIVE",
  },
  {
    id: "P-06",
    category: "Food",
    title: "Hydroponics at 12h photoperiod",
    description:
      "Maintain 12h light cycle for leafy greens and root crops. Supplement with stored rations when yield falls below 1800 kcal per crew per sol.",
    ref: "Bioregenerative life support sheet",
    tone: "cyan" as const,
    status: "ACTIVE",
  },
];

function ProtocolsPage() {
  return (
    <div className="rise-in">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">Operations</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-balance">
            Survival Protocols
          </h1>
          <p className="mt-2 max-w-lg text-[15px] text-fog">
            Six active protocols governing daily surface operations. Each is keyed to a telemetry
            threshold — when the reading crosses the line, the protocol activates.
          </p>
        </div>
        <span className="hidden font-mono text-[11px] text-fog sm:inline">
          6 active · 0 critical
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {protocols.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-line/70 bg-panel/40 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  p.tone === "rose" ? "text-rose" : "text-cyan"
                }`}
              >
                {p.id} · {p.category}
              </span>
              <span
                className={`font-mono text-[10px] ${
                  p.status === "ACTIVE" ? "text-mint" : "text-amber"
                }`}
              >
                {p.status}
              </span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-fog">{p.description}</p>
            <p className="mt-4 font-mono text-[10px] text-fog/70">Ref: {p.ref}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
