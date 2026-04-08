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
    <div>
      {/* Input form — tight, functional, like a real form */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="label-caps block mb-1.5">Asset Type</label>
            <select
              value={assetType}
              onChange={e => setAssetType(e.target.value as AssetType)}
              className="w-full border border-rule rounded px-3 py-2 text-[0.85rem] bg-white text-ink hover:border-ink-faint"
            >
              <option value="shares">Shares (Individual stocks)</option>
              <option value="etf">ETF / Investment Fund</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>

          <div>
            <label className="label-caps block mb-1.5">Disposal Date</label>
            <input
              type="date"
              value={disposalDate}
              onChange={e => setDisposalDate(e.target.value)}
              className="w-full border border-rule rounded px-3 py-2 text-[0.85rem] text-ink hover:border-ink-faint"
            />
          </div>

          <div>
            <label className="label-caps block mb-1.5">Total Cost (purchase + fees)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-ink-muted text-[0.85rem]">{'\u20AC'}</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={e => setPurchasePrice(e.target.value)}
                placeholder="10,000"
                min="0"
                step="0.01"
                className="w-full border border-rule rounded pl-7 pr-3 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint hover:border-ink-faint"
              />
            </div>
          </div>

          <div>
            <label className="label-caps block mb-1.5">Sale Proceeds</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-ink-muted text-[0.85rem]">{'\u20AC'}</span>
              <input
                type="number"
                value={salePrice}
                onChange={e => setSalePrice(e.target.value)}
                placeholder="15,000"
                min="0"
                step="0.01"
                className="w-full border border-rule rounded pl-7 pr-3 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint hover:border-ink-faint"
              />
            </div>
          </div>
        </div>

        {assetType === 'etf' && (
          <div className="mt-4 text-[0.8rem] text-ink-muted py-2 pl-3 border-l-2 border-ink-faint">
            ETFs are subject to the <strong className="text-ink-secondary">8-year deemed disposal rule</strong>.
            Switch to the Deemed Disposal tab to see your timeline.
          </div>
        )}
      </section>

      {/* Results — financial statement style */}
      {result && (
        <section className="mt-10">
          {/* The big number */}
          <div className="mb-8">
            <div className="label-caps mb-2">CGT Owed</div>
            <div className={`font-[family-name:var(--font-display)] tabular-nums leading-none font-semibold ${
              result.taxOwed > 0
                ? 'text-tax-red text-[2.8rem] sm:text-[3.8rem]'
                : 'text-gain-green text-[2.8rem] sm:text-[3.8rem]'
            }`}>
              {formatEuro(result.taxOwed)}
            </div>
            {result.taxOwed > 0 && (
              <div className="mt-3 text-[0.85rem] text-gain-green font-medium tabular-nums font-[family-name:var(--font-mono)]">
                You keep {formatEuro(result.currentValue - result.taxOwed)}
              </div>
            )}
          </div>

          {/* Breakdown — left labels, right numbers, rules between */}
          <div className="border-t border-ink pt-4">
            <div className="label-caps mb-3">Breakdown</div>
            <div className="space-y-0">
              <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                <span className="text-[0.8rem] text-ink-secondary">Cost basis</span>
                <span className="text-[0.8rem] text-ink font-[family-name:var(--font-mono)] tabular-nums">{formatEuro(result.costBasis)}</span>
              </div>
              <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                <span className="text-[0.8rem] text-ink-secondary">Sale proceeds</span>
                <span className="text-[0.8rem] text-ink font-[family-name:var(--font-mono)] tabular-nums">{formatEuro(result.currentValue)}</span>
              </div>
              <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                <span className="text-[0.8rem] text-ink-secondary">
                  {result.gain > 0 ? 'Capital gain' : 'Capital loss'}
                </span>
                <span className={`text-[0.8rem] font-[family-name:var(--font-mono)] tabular-nums font-medium ${result.gain > 0 ? 'text-tax-red' : 'text-gain-green'}`}>
                  {result.gain > 0 ? formatEuro(result.gain) : formatEuro(result.loss)}
                </span>
              </div>
              {result.exemptionUsed > 0 && (
                <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                  <span className="text-[0.8rem] text-ink-secondary">Annual exemption</span>
                  <span className="text-[0.8rem] text-gain-green font-[family-name:var(--font-mono)] tabular-nums">-{formatEuro(result.exemptionUsed)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                <span className="text-[0.8rem] text-ink-secondary">Taxable gain</span>
                <span className="text-[0.8rem] text-ink font-[family-name:var(--font-mono)] tabular-nums">{formatEuro(result.taxableGain)}</span>
              </div>
              <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                <span className="text-[0.8rem] text-ink-secondary">Tax rate</span>
                <span className="text-[0.8rem] text-ink font-[family-name:var(--font-mono)] tabular-nums">33%</span>
              </div>
              {result.effectiveRate > 0 && (
                <div className="flex justify-between items-baseline py-2 border-b border-rule-light">
                  <span className="text-[0.8rem] text-ink-secondary">Effective rate</span>
                  <span className="text-[0.8rem] text-ink font-[family-name:var(--font-mono)] tabular-nums">{result.effectiveRate}%</span>
                </div>
              )}
            </div>
          </div>

          {deadline && result.taxOwed > 0 && (
            <div className="mt-6 py-3 pl-3 border-l-2 border-warn">
              <div className="text-[0.75rem] font-semibold text-warn uppercase tracking-wide">Payment Deadline</div>
              <div className="text-[0.8rem] text-ink-secondary mt-1">
                {deadline.filingPeriod}: Pay by <strong className="text-ink">{formatDate(deadline.deadline)}</strong>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
                btn.textContent = 'Copied';
                setTimeout(() => { btn.textContent = orig; }, 2000);
              }}
              className="text-[0.8rem] font-medium text-ink-muted bg-surface-alt hover:bg-rule-light rounded px-4 py-2.5"
            >
              Copy summary
            </button>
            <a
              href="https://buy.stripe.com/cgt_premium"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] font-medium text-white bg-ink hover:bg-ink-secondary rounded px-4 py-2.5 text-center"
              id="premium-export-btn"
            >
              PDF report {'\u2014'} {'\u20AC'}9/mo
            </a>
          </div>
        </section>
      )}

      {/* Premium upsell */}
      {result && result.taxOwed > 0 && (
        <section className="mt-10 pt-6 border-t border-rule">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[1.1rem] font-semibold text-ink">CGT Pro</h3>
              <ul className="text-[0.8rem] text-ink-muted mt-2 space-y-0.5">
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
              className="shrink-0 bg-ink text-white font-medium px-5 py-2.5 rounded text-[0.8rem] hover:bg-ink-secondary"
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
