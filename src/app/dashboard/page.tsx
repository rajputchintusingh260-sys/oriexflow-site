import type { Metadata } from "next";
import clientsData from "@/data/ops/clients.json";
import editorsData from "@/data/ops/editors.json";
import expensesData from "@/data/ops/expenses.json";
import paymentsData from "@/data/ops/payments.json";
import pipelineData from "@/data/ops/pipeline.json";
import settings from "@/data/ops/settings.json";
import {
  fmtINR,
  fmtUSD,
  inCurrentMonth,
  sumINR,
  toINR,
  toUSD,
  type Client,
  type Editor,
  type ExpenseData,
  type Payments,
  type PipelineItem,
  type PipelineStage,
} from "./lib";

export const metadata: Metadata = {
  title: "Ops Dashboard — ORIEXFLOW",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const clients = clientsData as Client[];
const editors = editorsData as Editor[];
const expenses = expensesData as ExpenseData;
const payments = paymentsData as Payments;
const pipeline = pipelineData as PipelineItem[];

const STAGE_ORDER: PipelineStage[] = [
  "lead",
  "discovery",
  "proposal",
  "negotiation",
  "contract",
  "onboarding",
  "won",
  "lost",
];

const STAGE_LABEL: Record<PipelineStage, string> = {
  lead: "Lead",
  discovery: "Discovery",
  proposal: "Proposal",
  negotiation: "Negotiation",
  contract: "Contract",
  onboarding: "Onboarding",
  won: "Won",
  lost: "Lost",
};

export default function DashboardPage() {
  const activeClients = clients.filter((c) => c.status === "active");
  const mrrINR = sumINR(
    activeClients.map((c) => ({ amount: c.monthlyAmount, currency: c.currency }))
  );

  const receivedThisMonth = inCurrentMonth(payments.received);
  const paidThisMonth = inCurrentMonth(payments.paid);

  const revenueThisMonth = sumINR(receivedThisMonth);
  const editorPaidThisMonth = sumINR(paidThisMonth);
  const recurringExpensesINR = sumINR(expenses.recurring);
  const oneOffThisMonth = sumINR(inCurrentMonth(expenses.oneOff));

  const totalExpensesThisMonth =
    recurringExpensesINR + oneOffThisMonth + editorPaidThisMonth;
  const netProfitThisMonth = revenueThisMonth - totalExpensesThisMonth;

  const goalUSD = settings.goals.monthlyRevenueUSD;
  const currentUSD = toUSD(mrrINR, "INR");
  const goalPct = Math.min(100, (currentUSD / goalUSD) * 100);

  const allActivity = [
    ...payments.received.map((p) => ({ ...p, kind: "in" as const })),
    ...payments.paid.map((p) => ({ ...p, kind: "out" as const })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  const pipelineByStage = STAGE_ORDER.reduce((acc, stage) => {
    acc[stage] = pipeline.filter((p) => p.stage === stage);
    return acc;
  }, {} as Record<PipelineStage, PipelineItem[]>);

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {settings.agency} · Ops
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              Dashboard{" "}
              <span className="text-muted font-normal text-xl">
                — {settings.owner}
              </span>
            </h1>
          </div>
          <div className="text-right text-sm text-muted">
            <p>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="mt-1 text-xs opacity-70">
              Rate: 1 USD = ₹{settings.usdToInr}
            </p>
          </div>
        </header>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPI
            label="MRR (Active Clients)"
            value={fmtINR(mrrINR)}
            sub={fmtUSD(toUSD(mrrINR, "INR"))}
            accent="from-violet/20"
          />
          <KPI
            label="This Month Revenue"
            value={fmtINR(revenueThisMonth)}
            sub={`${receivedThisMonth.length} payments`}
            accent="from-emerald-500/20"
          />
          <KPI
            label="This Month Expenses"
            value={fmtINR(totalExpensesThisMonth)}
            sub="Rent + Tools + Editors"
            accent="from-crimson/20"
          />
          <KPI
            label="Net Profit"
            value={fmtINR(netProfitThisMonth)}
            sub={netProfitThisMonth >= 0 ? "in the green" : "at a loss"}
            accent={netProfitThisMonth >= 0 ? "from-cyan/20" : "from-crimson/30"}
          />
        </section>

        {/* Goal tracker */}
        <section className="rounded-2xl border border-white/10 bg-surface/60 p-6">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Goal</p>
              <h2 className="mt-1 text-xl font-medium">
                Road to ${goalUSD.toLocaleString()}/mo
              </h2>
            </div>
            <div className="text-right">
              <p
                className="text-2xl font-semibold bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {goalPct.toFixed(2)}%
              </p>
              <p className="text-xs text-muted mt-1">
                {fmtUSD(currentUSD)} of ${goalUSD.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${goalPct}%`,
                backgroundImage: "var(--gradient-brand)",
              }}
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            At ${settings.goals.targetClientPriceUSD}/mo target price, you need{" "}
            <span className="text-fg font-medium">
              {settings.goals.targetClientCount} clients
            </span>{" "}
            to hit ${goalUSD.toLocaleString()}/mo. Currently at{" "}
            <span className="text-fg font-medium">{activeClients.length}</span>{" "}
            active.
          </p>
        </section>

        {/* Clients + Editors */}
        <section className="grid lg:grid-cols-3 gap-6">
          <Card
            title="Clients"
            subtitle={`${clients.length} total · ${activeClients.length} active`}
            className="lg:col-span-2"
          >
            {clients.length === 0 ? (
              <Empty text="No clients yet. Tell Claude to add one." />
            ) : (
              <div className="overflow-x-auto -mx-6">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-muted">
                    <tr>
                      <th className="text-left px-6 py-2 font-normal">Client</th>
                      <th className="text-left px-6 py-2 font-normal">Package</th>
                      <th className="text-right px-6 py-2 font-normal">Monthly</th>
                      <th className="text-left px-6 py-2 font-normal">Status</th>
                      <th className="text-left px-6 py-2 font-normal">Next Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c) => (
                      <tr key={c.id} className="border-t border-white/5">
                        <td className="px-6 py-3">
                          <div className="font-medium text-fg">{c.name}</div>
                          <div className="text-xs text-muted">{c.contact}</div>
                        </td>
                        <td className="px-6 py-3 text-muted">{c.package}</td>
                        <td className="px-6 py-3 text-right tabular-nums">
                          <div>{fmtINR(toINR(c.monthlyAmount, c.currency))}</div>
                          <div className="text-xs text-muted">
                            {c.currency === "USD" ? fmtUSD(c.monthlyAmount) : ""}
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <StatusPill status={c.status} />
                        </td>
                        <td className="px-6 py-3 text-muted">
                          {c.nextPayment || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card title="Editors" subtitle={`${editors.length} on team`}>
            {editors.length === 0 ? (
              <Empty text="No editors yet. Add when you hire." />
            ) : (
              <ul className="space-y-3">
                {editors.map((e, i) => (
                  <li
                    key={i}
                    className="border-t border-white/5 pt-3 first:border-0 first:pt-0"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{e.name}</p>
                        <p className="text-xs text-muted">{e.role}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="tabular-nums">
                          {fmtINR(toINR(e.rate, e.currency))}
                        </p>
                        <p className="text-xs text-muted">
                          /{e.rateType.replace("per-", "")}
                        </p>
                      </div>
                    </div>
                    {e.clientsAssigned.length > 0 && (
                      <p className="mt-1 text-xs text-muted">
                        On: {e.clientsAssigned.join(", ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        {/* Expenses + Activity */}
        <section className="grid lg:grid-cols-3 gap-6">
          <Card
            title="Recurring Expenses"
            subtitle={fmtINR(recurringExpensesINR) + " /mo"}
          >
            <ul className="space-y-2 text-sm">
              {expenses.recurring.map((ex, i) => (
                <li
                  key={i}
                  className="flex justify-between border-t border-white/5 pt-2 first:border-0 first:pt-0"
                >
                  <span className="text-fg">{ex.category}</span>
                  <span className="tabular-nums text-muted">
                    {fmtINR(toINR(ex.amount, ex.currency))}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Recent Activity"
            subtitle="Last 8 movements"
            className="lg:col-span-2"
          >
            {allActivity.length === 0 ? (
              <Empty text="No payments logged yet." />
            ) : (
              <ul className="space-y-3">
                {allActivity.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between border-t border-white/5 pt-3 first:border-0 first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          a.kind === "in" ? "bg-emerald-400" : "bg-crimson"
                        }`}
                      />
                      <div>
                        <p className="text-sm">
                          {a.kind === "in" ? "Received from" : "Paid to"}{" "}
                          <span className="font-medium text-fg">{a.party}</span>
                        </p>
                        <p className="text-xs text-muted">
                          {a.date} · {a.method || "—"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`tabular-nums text-sm ${
                        a.kind === "in" ? "text-emerald-300" : "text-crimson"
                      }`}
                    >
                      {a.kind === "in" ? "+" : "−"}
                      {fmtINR(toINR(a.amount, a.currency))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        {/* Pipeline */}
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Client Acquisition
              </p>
              <h2 className="mt-1 text-xl font-medium">Onboarding Pipeline</h2>
            </div>
            <p className="text-sm text-muted">{pipeline.length} in flight</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            {STAGE_ORDER.map((stage) => {
              const items = pipelineByStage[stage];
              return (
                <div
                  key={stage}
                  className="rounded-xl border border-white/10 bg-surface/60 p-3 min-h-40"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-muted">
                      {STAGE_LABEL[stage]}
                    </span>
                    <span className="text-xs text-muted tabular-nums">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {items.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-2"
                      >
                        <p className="text-sm font-medium truncate">
                          {p.leadName}
                        </p>
                        <p className="text-xs text-muted">{p.source}</p>
                        {p.value > 0 && (
                          <p className="mt-1 text-xs tabular-nums text-fg">
                            {p.currency === "USD"
                              ? fmtUSD(p.value)
                              : fmtINR(p.value)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="pt-6 border-t border-white/5 text-xs text-muted flex justify-between">
          <span>
            Data lives in <code className="text-fg">src/data/ops/*.json</code>
          </span>
          <span>Tell Claude what to update — edits + push → auto-deploys.</span>
        </footer>
      </div>
    </main>
  );
}

/* ---------- small components ---------- */

function KPI({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-5">
      <div
        className={`absolute inset-0 -z-0 bg-gradient-to-br ${accent ?? "from-white/5"} to-transparent`}
      />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.15em] text-muted">{label}</p>
        <p className="mt-2 text-2xl md:text-3xl font-semibold tabular-nums">
          {value}
        </p>
        {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-surface/60 p-6 ${className}`}
    >
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <span className="text-xs text-muted">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="text-sm text-muted italic border border-dashed border-white/10 rounded-lg p-4 text-center">
      {text}
    </p>
  );
}

function StatusPill({ status }: { status: Client["status"] }) {
  const styles: Record<Client["status"], string> = {
    active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    onboarding: "bg-violet/10 text-violet border-violet/30",
    paused: "bg-amber/10 text-amber border-amber/30",
    churned: "bg-crimson/10 text-crimson border-crimson/30",
  };
  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 rounded-full border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
