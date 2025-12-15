import { MOCK_DATA, type EnvironmentStats } from "../../lib/uptime";

function formatMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function formatLocalDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HealthPill({ value }: { value: number }) {
  let color = "bg-emerald-500/15 text-emerald-500 border-emerald-500/40";
  if (value < 99.9)
    color = "bg-amber-500/15 text-amber-400 border-amber-500/40";
  if (value < 99.5) color = "bg-red-500/15 text-red-400 border-red-500/40";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      {value.toFixed(3)}% uptime
    </span>
  );
}

function EnvironmentCard({ env }: { env: EnvironmentStats }) {
  const healthy = env.uptimePercent >= 99.9;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-lg shadow-black/40">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                healthy
                  ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                  : "bg-amber-400"
              }`}
            />
            <h2 className="text-sm font-semibold text-zinc-100">{env.name}</h2>
          </div>
          <a
            href={env.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            {env.url.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <HealthPill value={env.uptimePercent} />
      </header>

      <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
          <p className="text-[0.7rem] uppercase tracking-wide text-zinc-500">
            Last 30 days uptime
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-50">
            {env.uptimePercent.toFixed(2)}
            <span className="text-xs text-zinc-400">%</span>
          </p>
          <p className="mt-1 text-[0.7rem] text-zinc-500">
            {formatMinutes(env.totalDowntimeMinutes)} of downtime
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
          <p className="text-[0.7rem] uppercase tracking-wide text-zinc-500">
            Incidents
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-50">
            {env.incidents.length}
          </p>
          <p className="mt-1 text-[0.7rem] text-zinc-500">Last 30 days</p>
        </div>

        <div className="col-span-2 hidden rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 sm:block">
          <p className="text-[0.7rem] uppercase tracking-wide text-zinc-500">
            Error budget used
          </p>
          <div className="mt-2 h-2 rounded-full bg-zinc-800">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{
                width: `${Math.min(100, (100 - env.uptimePercent) * 80)}%`,
              }}
            />
          </div>
          <p className="mt-1 text-[0.7rem] text-zinc-500">
            Approx. {(100 - env.uptimePercent).toFixed(3)}% budget consumed
          </p>
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-zinc-900 bg-zinc-950/80 p-3">
        <div className="flex items-center justify-between">
          <p className="text-[0.7rem] font-medium uppercase tracking-wide text-zinc-500">
            Incident timeline (30 days)
          </p>
          <p className="text-[0.7rem] text-zinc-500">UTC times</p>
        </div>
        <div className="mt-1 flex h-10 items-center gap-1">
          {Array.from({ length: 30 }).map((_, index) => {
            const day = 30 - index;
            const baseColor = "bg-zinc-800";
            const hasIncident =
              index < env.incidents.length
                ? env.incidents[index].impact === "major"
                  ? "bg-red-500"
                  : "bg-amber-400"
                : baseColor;
            return (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
              >
                <div className={`w-full rounded-full ${hasIncident}`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-[0.7rem] uppercase tracking-wide text-zinc-500">
          Recent incidents
        </p>
        {env.incidents.length === 0 ? (
          <p className="text-xs text-zinc-500">
            No incidents in the last 30 days.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-900 rounded-xl border border-zinc-900 bg-zinc-950/80">
            {env.incidents.map((incident) => (
              <li
                key={incident.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-1.5 w-1.5 rounded-full ${
                        incident.impact === "major"
                          ? "bg-red-400"
                          : "bg-amber-400"
                      }`}
                    />
                    <span className="text-zinc-100">
                      {incident.impact === "major"
                        ? "Major outage"
                        : "Partial degradation"}
                    </span>
                  </div>
                  <p className="text-[0.7rem] text-zinc-500">
                    {formatLocalDateTime(incident.startedAt)} ·{" "}
                    {formatMinutes(incident.durationMinutes)} duration
                  </p>
                </div>
                <span className="text-[0.7rem] text-zinc-400">
                  {incident.durationMinutes} min
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function UptimeMonitor() {
  const production = MOCK_DATA.production;
  const beta = MOCK_DATA.beta;

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black px-4 py-6 text-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
            HTV status · last 30 days
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Uptime Monitor
              </h1>
              <p className="mt-1 max-w-xl text-sm text-zinc-400">
                How production and beta environments are performing over the last month.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Operational</span>
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Degraded</span>
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span>Outage</span>
              </span>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <EnvironmentCard env={production} />
          <EnvironmentCard env={beta} />
        </div>
      </div>
    </main>
  );
}
