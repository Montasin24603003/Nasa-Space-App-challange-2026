import { useMemo, useState } from "react";
import { Gauge, Play, RotateCcw, ShieldAlert, Thermometer, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function SurvivalSimulator() {
  const [crew, setCrew] = useState(4);
  const [sols, setSols] = useState(30);
  const [water, setWater] = useState(78);
  const [power, setPower] = useState(72);
  const [shielding, setShielding] = useState(65);
  const [dust, setDust] = useState(35);
  const [ran, setRan] = useState(false);

  const result = useMemo(() => {
    const waterReserve = clamp(water - Math.max(0, crew - 4) * 4 - Math.max(0, sols - 30) * 0.5);
    const powerReserve = clamp(power - dust * 0.22);
    const radiationProtection = clamp(shielding * 0.9);
    const thermalMargin = clamp(88 - dust * 0.35 - (sols > 90 ? 10 : 0));
    const survivalIndex = Math.round(
      waterReserve * 0.28 + powerReserve * 0.27 + radiationProtection * 0.25 + thermalMargin * 0.2,
    );
    const status = survivalIndex >= 75 ? "MISSION READY — DEMO" : survivalIndex >= 55 ? "MARGINAL — MITIGATE" : "HIGH RISK — REPLAN";
    return { waterReserve, powerReserve, radiationProtection, thermalMargin, survivalIndex, status };
  }, [crew, sols, water, power, shielding, dust]);

  const reset = () => {
    setCrew(4); setSols(30); setWater(78); setPower(72); setShielding(65); setDust(35); setRan(false);
  };

  return (
    <section id="simulator" className="mt-10 scroll-mt-24">
      <div className="mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">Sol-by-sol planning sandbox</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">Survival Simulator</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fog">
          Stress-test a mission profile before committing to a route. This is a transparent demonstration model, not
          a flight-certified life-support or medical system.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-line/70 bg-panel/35 p-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <SliderField label="Crew" value={crew} min={1} max={8} step={1} unit="people" onChange={setCrew} />
            <SliderField label="Mission duration" value={sols} min={7} max={180} step={1} unit="sols" onChange={setSols} />
            <SliderField label="Starting water reserve" value={water} min={20} max={100} step={1} unit="%" onChange={setWater} />
            <SliderField label="Starting power reserve" value={power} min={20} max={100} step={1} unit="%" onChange={setPower} />
            <SliderField label="Radiation shielding" value={shielding} min={0} max={100} step={1} unit="%" onChange={setShielding} />
            <SliderField label="Dust-storm intensity" value={dust} min={0} max={100} step={1} unit="%" onChange={setDust} />
          </div>
          <div className="mt-5 flex gap-2">
            <Button className="bg-amber text-ink hover:bg-amber/90" onClick={() => setRan(true)}>
              <Play className="size-4" /> Run simulation
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="size-4" /> Reset
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-line/70 bg-panel/30 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-fog">Mission synthesis</p>
              <p className="mt-1 font-display text-xl font-bold">{ran ? result.status : "READY TO RUN"}</p>
            </div>
            <div className="grid size-20 place-items-center rounded-full border-4 border-amber/30 bg-amber/5">
              <span className="font-display text-xl font-bold text-amber">{ran ? result.survivalIndex : "--"}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Metric icon={<Droplets />} label="Water margin" value={result.waterReserve} />
            <Metric icon={<Gauge />} label="Power margin" value={result.powerReserve} />
            <Metric icon={<ShieldAlert />} label="Radiation protection" value={result.radiationProtection} />
            <Metric icon={<Thermometer />} label="Thermal margin" value={result.thermalMargin} />
          </div>

          <div className="mt-5 rounded-xl border border-cyan/20 bg-cyan/5 p-4">
            <div className="flex gap-3">
              <Wind className="mt-0.5 size-4 text-cyan" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">Decision trace</p>
                <p className="mt-1 text-[11px] leading-relaxed text-fog">
                  The index blends water, power, shielding, and thermal margins. Increasing crew, duration, or dust
                  intensity lowers the margin; increasing shielding raises the radiation component.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label, value, min, max, step, unit, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-fog">
        <span>{label}</span><span className="text-bright">{value} {unit}</span>
      </div>
      <input
        className="mt-2 w-full accent-amber"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line/60 bg-ink/30 p-4">
      <div className="flex items-center justify-between gap-2 text-fog">
        <span className="text-cyan">{icon}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em]">{label}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-2 font-display text-lg font-semibold">{Math.round(value)}%</p>
    </div>
  );
}
