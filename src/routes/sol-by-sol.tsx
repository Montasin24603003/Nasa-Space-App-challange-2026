import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Radio, Sparkles } from "lucide-react";

export const Route = createFileRoute("/sol-by-sol")({
  head: () => ({
    meta: [
      { title: "Sol by Sol — Mars Survival Simulator" },
      {
        name: "description",
        content:
          "Faithful integration of the original Sol by Sol Mars survival simulator with NASA DONKI data access and an AI mission advisor.",
      },
    ],
  }),
  component: SolBySolPage,
});

function SolBySolPage() {
  return (
    <div className="rise-in">
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-line/70 bg-panel/40 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-amber" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">Integrated mission tool</p>
          </div>
          <h1 className="mt-1 font-display text-xl font-bold">Sol by Sol · Mars Survival Simulator</h1>
          <p className="mt-1 text-xs text-fog">Original HTML/CSS/JavaScript preserved as a dedicated mission page, with the AI advisor wired to the project API.</p>
        </div>
        <a
          href="/sol-simulator/index.html"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-line bg-ink/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fog hover:text-bright"
        >
          <ExternalLink className="size-3.5" />
          Open standalone
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line/70 bg-[#f3ece4] shadow-2xl">
        <iframe
          title="Sol by Sol Mars Survival Simulator"
          src="/sol-simulator/index.html"
          className="block h-[min(980px,calc(100vh-170px))] min-h-[760px] w-full border-0"
          loading="eager"
        />
      </div>

      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-fog">
        <Radio className="size-3.5 text-mint" />
        NASA DONKI live refresh remains optional; bundled data stays available when the API is offline.
      </div>
    </div>
  );
}
