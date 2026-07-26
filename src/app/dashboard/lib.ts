import settings from "@/data/ops/settings.json";

export type Currency = "USD" | "INR";

export type Client = {
  id: string;
  name: string;
  contact: string;
  package: string;
  monthlyAmount: number;
  currency: Currency;
  status: "active" | "paused" | "onboarding" | "churned";
  startDate: string;
  nextPayment: string;
  editor: string;
  notes: string;
};

export type Editor = {
  name: string;
  role: string;
  rateType: "per-video" | "per-month" | "per-hour";
  rate: number;
  currency: Currency;
  clientsAssigned: string[];
  contact: string;
};

export type Expense = {
  category: string;
  amount: number;
  currency: Currency;
  frequency?: "monthly" | "yearly" | "one-off";
  date?: string;
  notes?: string;
};

export type ExpenseData = {
  recurring: Expense[];
  oneOff: Expense[];
};

export type PaymentEntry = {
  date: string;
  party: string;
  amount: number;
  currency: Currency;
  method?: string;
  notes?: string;
};

export type Payments = {
  received: PaymentEntry[];
  paid: PaymentEntry[];
};

export type PipelineStage =
  | "lead"
  | "discovery"
  | "proposal"
  | "negotiation"
  | "contract"
  | "onboarding"
  | "won"
  | "lost";

export type PipelineItem = {
  id: string;
  leadName: string;
  source: string;
  stage: PipelineStage;
  value: number;
  currency: Currency;
  nextAction: string;
  notes: string;
};

export function toINR(amount: number, currency: Currency): number {
  if (currency === "USD") return amount * settings.usdToInr;
  return amount;
}

export function toUSD(amount: number, currency: Currency): number {
  if (currency === "INR") return amount / settings.usdToInr;
  return amount;
}

export function fmtINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function fmtUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function inCurrentMonth<T extends { date?: string }>(entries: T[]): T[] {
  const month = currentMonth();
  return entries.filter((e) => e.date?.startsWith(month) ?? false);
}

export function sumINR(items: { amount: number; currency: Currency }[]): number {
  return items.reduce((acc, it) => acc + toINR(it.amount, it.currency), 0);
}
