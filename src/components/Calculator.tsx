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
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculate Your CGT</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
            <select
              value={assetType}
              onChange={e => setAssetType(e.target.value as AssetType)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
            >
              <option value="shares">Shares (Individual stocks)</option>
              <option value="etf">ETF / Investment Fund</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disposal Date</label>
            <input
              type="date"
              value={disposalDate}
              onChange={e => setDisposalDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Cost (purchase price + fees)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={e => setPurchasePrice(e.target.value)}
                placeholder="10,000"
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sale Proceeds (or current value)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
              <input
                type="number"
                value={salePrice}
                onChange={e => setSalePrice(e.target.value)}
                placeholder="15,000"
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
          </div>
        </div>

        {assetType === 'etf' && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            ETFs and investment funds are subject to the <strong>8-year deemed disposal rule</strong>.
            Use the "Deemed Disposal" tab to see when your deemed disposal events will trigger.
          </div>
        )}
      </section>

      {/* Results */}
      {result && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Tax Summary</h2>
          </div>

          <div className="px-5 sm:px-6 py-5 space-y-4">
            {/* Main result */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">CGT Owed</span>
              <span className={`text-3xl sm:text-4xl font-bold tabular-nums ${
                result.taxOwed > 0 ? 'text-danger' : 'text-primary'
              }`}>
                {formatEuro(result.taxOwed)}
              </span>
            </div>

            {result.taxOwed > 0 && (
              <div className="flex items-baseline justify-between bg-emerald-50 rounded-lg px-4 py-3 -mx-1">
                <span className="text-sm text-emerald-700">Net proceeds after tax</span>
                <span className="text-xl font-bold tabular-nums text-emerald-700">
                  {formatEuro(result.currentValue - result.taxOwed)}
                </span>
              </div>
            )}

            {/* Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Cost basis</span>
                <span className="text-gray-800 font-medium">{formatEuro(result.costBasis)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sale proceeds</span>
                <span className="text-gray-800 font-medium">{formatEuro(result.currentValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">
                  {result.gain > 0 ? 'Capital gain' : 'Capital loss'}
                </span>
                <span className={`font-medium ${result.gain > 0 ? 'text-danger' : 'text-primary'}`}>
                  {result.gain > 0 ? formatEuro(result.gain) : formatEuro(result.loss)}
                </span>
              </div>
              {result.exemptionUsed > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Annual exemption used</span>
                  <span className="text-primary font-medium">-{formatEuro(result.exemptionUsed)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Taxable gain</span>
                <span className="text-gray-800 font-medium">{formatEuro(result.taxableGain)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax rate</span>
                <span className="text-gray-800 font-medium">33%</span>
              </div>
              {result.effectiveRate > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Effective rate (after exemption)</span>
                  <span className="text-gray-800 font-medium">{result.effectiveRate}%</span>
                </div>
              )}
            </div>

            {/* Payment deadline */}
            {deadline && result.taxOwed > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                  <div className="font-medium text-amber-900">Payment Deadline</div>
                  <div className="text-amber-700 mt-1">
                    {deadline.filingPeriod}: Pay by <strong>{formatDate(deadline.deadline)}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Export / Premium CTA */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={(e) => {
                    const text = [
                      'Irish CGT Calculation Summary',
                      `Date: ${new Date().toLocaleDateString('en-IE')}`,
                      '',
                      `Cost basis: ${formatEuro(result.costBasis)}`,
                      `Sale proceeds: ${formatEuro(result.currentValue)}`,
                      `${result.gain > 0 ? 'Capital gain' : 'Capital loss'}: ${formatEuro(result.gain > 0 ? result.gain : result.loss)}`,
                      result.exemptionUsed > 0 ? `Annual exemption: -${formatEuro(result.exemptionUsed)}` : '',
                      `Taxable gain: ${formatEuro(result.taxableGain)}`,
                      `Tax rate: 33%`,
                      `CGT owed: ${formatEuro(result.taxOwed)}`,
                      `Net proceeds: ${formatEuro(result.currentValue - result.taxOwed)}`,
                      '',
                      deadline && result.taxOwed > 0 ? `Payment deadline: ${formatDate(deadline.deadline)}` : '',
                      '',
                      'Generated at cgt.sdd.ie',
                      'Disclaimer: For informational purposes only. Not tax advice.',
                    ].filter(Boolean).join('\n');
                    navigator.clipboard.writeText(text);
                    const btn = e.currentTarget;
                    const orig = btn.textContent;
                    btn.textContent = 'Copied!';
                    setTimeout(() => { btn.textContent = orig; }, 2000);
                  }}
                  className="flex-1 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2.5 transition-colors"
                >
                  Copy summary
                </button>
                <a
                  href="https://buy.stripe.com/cgt_premium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg px-4 py-2.5 transition-colors text-center"
                  id="premium-export-btn"
                >
                  Download PDF report — €9/mo
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Premium upsell */}
      {result && result.taxOwed > 0 && (
        <section className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-xl border border-primary/20 p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">CGT Pro — €9/month</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• PDF tax reports for your records</li>
                <li>• Multi-asset portfolio tracker</li>
                <li>• Payment deadline reminders</li>
                <li>• Tax-loss harvesting suggestions</li>
              </ul>
            </div>
            <a
              href="https://buy.stripe.com/cgt_premium"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-primary text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-primary-dark transition-colors"
              id="premium-cta-btn"
            >
              Start free trial
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
