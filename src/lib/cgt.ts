// Irish Capital Gains Tax Calculator
// CGT Rate: 33%
// Annual Exemption: €1,270 per person
// Deemed Disposal: 8-year rule for ETFs/funds (not individual shares)

export const CGT_RATE = 0.33;
export const ANNUAL_EXEMPTION = 1270;
export const DEEMED_DISPOSAL_YEARS = 8;

export type AssetType = 'etf' | 'shares' | 'crypto';

export interface AssetInput {
  name: string;
  type: AssetType;
  purchaseDate: string; // ISO date
  purchasePrice: number; // total cost basis
  units: number;
  currentPrice: number; // price per unit
}

export interface CGTResult {
  gain: number;
  loss: number;
  taxableGain: number;
  exemptionUsed: number;
  taxOwed: number;
  effectiveRate: number;
  currentValue: number;
  costBasis: number;
}

export interface DeemedDisposalEvent {
  date: Date;
  yearsHeld: number;
  estimatedGain: number;
  estimatedTax: number;
  isTriggered: boolean; // already past
}

// Calculate basic CGT on a disposal
export function calculateCGT(
  costBasis: number,
  saleProceeds: number,
  exemptionRemaining: number = ANNUAL_EXEMPTION,
): CGTResult {
  const gain = Math.max(0, saleProceeds - costBasis);
  const loss = Math.max(0, costBasis - saleProceeds);
  const exemptionUsed = Math.min(gain, exemptionRemaining);
  const taxableGain = Math.max(0, gain - exemptionUsed);
  const taxOwed = Math.round(taxableGain * CGT_RATE * 100) / 100;
  const effectiveRate = saleProceeds > costBasis
    ? (taxOwed / gain) * 100
    : 0;

  return {
    gain,
    loss,
    taxableGain,
    exemptionUsed,
    taxOwed,
    effectiveRate: Math.round(effectiveRate * 10) / 10,
    currentValue: saleProceeds,
    costBasis,
  };
}

// Calculate deemed disposal events for an ETF
export function calculateDeemedDisposals(asset: AssetInput): DeemedDisposalEvent[] {
  if (asset.type !== 'etf') return [];

  const purchaseDate = new Date(asset.purchaseDate);
  const now = new Date();
  const events: DeemedDisposalEvent[] = [];
  const currentValue = asset.units * asset.currentPrice;

  // Generate deemed disposal events every 8 years
  for (let i = 1; i <= 5; i++) { // up to 40 years out
    const ddDate = new Date(purchaseDate);
    ddDate.setFullYear(ddDate.getFullYear() + DEEMED_DISPOSAL_YEARS * i);

    const yearsHeld = DEEMED_DISPOSAL_YEARS * i;
    const isTriggered = ddDate <= now;

    // Estimate gain (simple linear growth assumption for future events)
    const growthFactor = currentValue / asset.purchasePrice;
    const annualGrowth = Math.pow(growthFactor, 1 / ((now.getTime() - purchaseDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))) - 1;

    let estimatedValue: number;
    if (isTriggered) {
      // For past events, use current value as approximation
      estimatedValue = currentValue;
    } else {
      // Project future value
      const yearsFromNow = (ddDate.getTime() - now.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      estimatedValue = currentValue * Math.pow(1 + Math.max(annualGrowth, 0), yearsFromNow);
    }

    const estimatedGain = Math.max(0, estimatedValue - asset.purchasePrice);
    const estimatedTax = Math.round(Math.max(0, estimatedGain - ANNUAL_EXEMPTION) * CGT_RATE * 100) / 100;

    events.push({
      date: ddDate,
      yearsHeld,
      estimatedGain: Math.round(estimatedGain * 100) / 100,
      estimatedTax,
      isTriggered,
    });
  }

  return events;
}

// Portfolio: calculate combined CGT across multiple asset disposals
// Shares the annual exemption across all gains
export interface PortfolioAsset {
  name: string;
  type: AssetType;
  costBasis: number;
  saleProceeds: number;
}

export interface PortfolioResult {
  assets: (PortfolioAsset & CGTResult)[];
  totalGain: number;
  totalLoss: number;
  totalTaxOwed: number;
  exemptionUsed: number;
  netProceeds: number;
}

export function calculatePortfolioCGT(assets: PortfolioAsset[]): PortfolioResult {
  // Sort by gain descending (apply exemption to highest-gain asset first)
  const sorted = [...assets].sort((a, b) =>
    (b.saleProceeds - b.costBasis) - (a.saleProceeds - a.costBasis)
  );

  let exemptionRemaining = ANNUAL_EXEMPTION;
  const results: (PortfolioAsset & CGTResult)[] = [];

  for (const asset of sorted) {
    const result = calculateCGT(asset.costBasis, asset.saleProceeds, exemptionRemaining);
    exemptionRemaining -= result.exemptionUsed;
    results.push({ ...asset, ...result });
  }

  return {
    assets: results,
    totalGain: results.reduce((s, r) => s + r.gain, 0),
    totalLoss: results.reduce((s, r) => s + r.loss, 0),
    totalTaxOwed: results.reduce((s, r) => s + r.taxOwed, 0),
    exemptionUsed: ANNUAL_EXEMPTION - exemptionRemaining,
    netProceeds: results.reduce((s, r) => s + r.currentValue - r.taxOwed, 0),
  };
}

// Calculate CGT filing deadlines
// Irish CGT is paid in two installments:
// - Gains Jan 1 - Nov 30: pay by Dec 15 same year
// - Gains Dec 1 - Dec 31: pay by Jan 31 next year
export function getPaymentDeadline(disposalDate: Date): { deadline: Date; filingPeriod: string } {
  const month = disposalDate.getMonth(); // 0-indexed
  const year = disposalDate.getFullYear();

  if (month <= 10) { // Jan-Nov
    return {
      deadline: new Date(year, 11, 15), // Dec 15
      filingPeriod: `Initial period (Jan-Nov ${year})`,
    };
  } else { // December
    return {
      deadline: new Date(year + 1, 0, 31), // Jan 31 next year
      filingPeriod: `Later period (Dec ${year})`,
    };
  }
}

// Format currency
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format date
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
