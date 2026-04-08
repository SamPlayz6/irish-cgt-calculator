import { useState, useMemo } from 'react';
import { calculateCGT, getPaymentDeadline, formatEuro, formatDate, type AssetType } from '../lib/cgt';

export default function Calculator() {
  const [assetType, setAssetType] = useState<AssetType>('shares');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [disposalDate, setDisposalDate] = useState(new Date().toISOString().split('T')[0]!);

  const result = useMemo(() => {
    const cost = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    if (isNaN(cost) || isNaN(sale) || cost <= 0) return null;
    return calculateCGT(cost, sale);
  }, [purchasePrice, salePrice]);

  const deadline = useMemo(() => {
    if (!disposalDate) return null;
    return getPaymentDeadline(new Date(disposalDate));
  }, [disposalDate]);

  return (
    <div className="space-y-6">
      {/* Input form */}
      <section className="card p-5 sm:p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-slate mb-4">Calculate Your CGT</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Asset Type</label>
            <select
              value={assetType}
              onChange={e => setAssetType(e.target.value as AssetType)}
              className="w-full border border-cream-dark rounded-lg px-3 py-2.5 text-sm bg-white text-slate hover:border-slate-muted/30"
            >
              <option value="shares">Shares (Individual stocks)</option>
              <option value="etf">ETF / Investment Fund</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>

          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Disposal Date</label>
            <input
              type="date"
              value={disposalDate}
              onChange={e => setDisposalDate(e.target.value)}
              className="w-full border border-cream-dark rounded-lg px-3 py-2.5 text-sm text-slate hover:border-slate-muted/30"
            />
          </div>

          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Total Cost (purchase + fees)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-muted text-sm">{'\u20AC'}</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={e => setPurchasePrice(e.target.value)}
                placeholder="10,000"
                min="0"
                step="0.01"
                className="w-full border border-cream-dark rounded-lg pl-7 pr-3 py-2.5 text-sm text-slate placeholder:text-slate-muted/40 hover:border-slate-muted/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Sale Proceeds</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-muted text-sm">{'\u20AC'}</span>
              <input
                type="number"
                value={salePrice}
                onChange={e => setSalePrice(e.target.value)}
                placeholder="15,000"
                min="0"
                step="0.01"
                className="w-full border border-cream-dark rounded-lg pl-7 pr-3 py-2.5 text-sm text-slate placeholder:text-slate-muted/40 hover:border-slate-muted/30"
              />
            </div>
          </div>
        </div>

        {assetType === 'etf' && (
          <div className="mt-4 bg-teal-bg border border-teal/20 rounded-lg p-3 text-sm text-teal">
            ETFs are subject to the <strong>8-year deemed disposal rule</strong>.
            Switch to the "Deemed Disposal" tab to see your timeline.
          </div>
        )}
      </section>

      {/* Results */}
      {result && (
        <section className="card">
          <div className="px-5 sm:px-6 py-4 border-b border-cream-dark">
            <h2 className="font-[family-name:var(--font-display)] text-lg text-slate">Tax Summary</h2>
          </div>

          <div className="px-5 sm:px-6 py-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-muted">CGT Owed</span>
              <span className={`font-[family-name:var(--font-display)] text-[2rem] sm:text-[2.5rem] tabular-nums leading-none ${
                result.taxOwed > 0 ? 'text-red' : 'text-teal'
              }`}>
                {formatEuro(result.taxOwed)}
              </span>
            </div>

            {result.taxOwed > 0 && (
              <div className="flex items-baseline justify-between bg-teal-bg rounded-lg px-4 py-3">
                <span className="text-sm text-teal">You keep after tax</span>
                <span className="text-xl font-bold tabular-nums text-teal font-[family-name:var(--font-mono)]">
                  {formatEuro(result.currentValue - result.taxOwed)}
                </span>
              </div>
            )}

            <div className="border-t border-cream-dark pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-muted">Cost basis</span>
                <span className="text-slate font-medium font-[family-name:var(--font-mono)] text-xs">{formatEuro(result.costBasis)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Sale proceeds</span>
                <span className="text-slate font-medium font-[family-name:var(--font-mono)] text-xs">{formatEuro(result.currentValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">
                  {result.gain > 0 ? 'Capital gain' : 'Capital loss'}
                </span>
                <span className={`font-medium font-[family-name:var(--font-mono)] text-xs ${result.gain > 0 ? 'text-red' : 'text-teal'}`}>
                  {result.gain > 0 ? formatEuro(result.gain) : formatEuro(result.loss)}
                </span>
              </div>
              {result.exemptionUsed > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-muted">Annual exemption</span>
                  <span className="text-teal font-medium font-[family-name:var(--font-mono)] text-xs">-{formatEuro(result.exemptionUsed)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-muted">Taxable gain</span>
                <span className="text-slate font-medium font-[family-name:var(--font-mono)] text-xs">{formatEuro(result.taxableGain)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Tax rate</span>
                <span className="text-slate font-medium font-[family-name:var(--font-mono)] text-xs">33%</span>
              </div>
              {result.effectiveRate > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-muted">Effective rate</span>
                  <span className="text-slate font-medium font-[family-name:var(--font-mono)] text-xs">{result.effectiveRate}%</span>
                </div>
              )}
            </div>

            {deadline && result.taxOwed > 0 && (
              <div className="border-t border-cream-dark pt-4">
                <div className="bg-amber-bg border border-amber/20 rounded-lg p-3 text-sm">
                  <div className="font-medium text-amber">Payment Deadline</div>
                  <div className="text-amber/80 mt-1">
                    {deadline.filingPeriod}: Pay by <strong>{formatDate(deadline.deadline)}</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-cream-dark pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={(e) => {
                    const text = [
                      'Irish CGT Calculation',
                      `Cost: ${formatEuro(result.costBasis)}`,
                      `Sale: ${formatEuro(result.currentValue)}`,
                      `${result.gain > 0 ? 'Gain' : 'Loss'}: ${formatEuro(result.gain > 0 ? result.gain : result.loss)}`,
                      result.exemptionUsed > 0 ? `Exemption: -${formatEuro(result.exemptionUsed)}` : '',
                      `Tax: ${formatEuro(result.taxOwed)}`,
                      `You keep: ${formatEuro(result.currentValue - result.taxOwed)}`,
                      '',
                      'cgt.sdd.ie',
                    ].filter(Boolean).join('\n');
                    navigator.clipboard.writeText(text);
                    const btn = e.currentTarget;
                    const orig = btn.textContent;
                    btn.textContent = 'Copied!';
                    setTimeout(() => { btn.textContent = orig; }, 2000);
                  }}
                  className="flex-1 text-sm font-medium text-slate-muted bg-cream-warm hover:bg-cream-dark rounded-lg px-4 py-2.5"
                >
                  Copy summary
                </button>
                <a
                  href="https://buy.stripe.com/cgt_premium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-white bg-slate-deep hover:bg-slate rounded-lg px-4 py-2.5 text-center"
                  id="premium-export-btn"
                >
                  PDF report {'\u2014'} {'\u20AC'}9/mo
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Premium upsell */}
      {result && result.taxOwed > 0 && (
        <section className="card p-5 border-teal/20 bg-teal-bg/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-slate">CGT Pro</h3>
              <ul className="text-sm text-slate-muted mt-2 space-y-1">
                <li>PDF tax reports for your accountant</li>
                <li>Multi-asset portfolio tracker</li>
                <li>Payment deadline reminders</li>
                <li>Tax-loss harvesting suggestions</li>
              </ul>
            </div>
            <a
              href="https://buy.stripe.com/cgt_premium"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-slate-deep text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-slate"
              id="premium-cta-btn"
            >
              {'\u20AC'}9/mo
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
