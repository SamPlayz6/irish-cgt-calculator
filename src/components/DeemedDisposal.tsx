import { useState, useMemo } from 'react';
import { calculateDeemedDisposals, formatEuro, formatDate, type AssetInput } from '../lib/cgt';

export default function DeemedDisposal() {
  const [name, setName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [units, setUnits] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');

  const asset: AssetInput | null = useMemo(() => {
    const pp = parseFloat(purchasePrice);
    const u = parseFloat(units);
    const cp = parseFloat(currentPrice);
    if (!purchaseDate || isNaN(pp) || isNaN(u) || isNaN(cp) || pp <= 0 || u <= 0 || cp <= 0) {
      return null;
    }
    return {
      name: name || 'ETF',
      type: 'etf',
      purchaseDate,
      purchasePrice: pp,
      units: u,
      currentPrice: cp,
    };
  }, [name, purchaseDate, purchasePrice, units, currentPrice]);

  const events = useMemo(() => {
    if (!asset) return [];
    return calculateDeemedDisposals(asset);
  }, [asset]);

  const currentValue = asset ? asset.units * asset.currentPrice : 0;
  const unrealisedGain = asset ? currentValue - asset.purchasePrice : 0;

  return (
    <div>
      <section>
        <p className="text-[0.8rem] text-ink-muted mb-5 leading-relaxed">
          ETFs and funds are taxed every 8 years, even if you hold. Enter your details to see the timeline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="label-caps block mb-1.5">ETF Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. VWCE, IWDA"
              className="w-full border border-rule rounded px-3 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint hover:border-ink-faint"
            />
          </div>

          <div>
            <label className="label-caps block mb-1.5">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={e => setPurchaseDate(e.target.value)}
              className="w-full border border-rule rounded px-3 py-2 text-[0.85rem] text-ink hover:border-ink-faint"
            />
          </div>

          <div>
            <label className="label-caps block mb-1.5">Total Purchase Cost</label>
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
            <label className="label-caps block mb-1.5">Number of Units</label>
            <input
              type="number"
              value={units}
              onChange={e => setUnits(e.target.value)}
              placeholder="100"
              min="0"
              step="0.001"
              className="w-full border border-rule rounded px-3 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint hover:border-ink-faint"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label-caps block mb-1.5">Current Price Per Unit</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-ink-muted text-[0.85rem]">{'\u20AC'}</span>
              <input
                type="number"
                value={currentPrice}
                onChange={e => setCurrentPrice(e.target.value)}
                placeholder="120.50"
                min="0"
                step="0.01"
                className="w-full border border-rule rounded pl-7 pr-3 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint hover:border-ink-faint"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summary — horizontal stat row, no card wrappers */}
      {asset && (
        <section className="mt-10 pt-6 border-t border-ink">
          <div className="label-caps mb-1">{asset.name}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4">
            <div>
              <div className="label-caps mb-1">Cost</div>
              <div className="text-[1.1rem] font-semibold text-ink font-[family-name:var(--font-mono)] tabular-nums">{formatEuro(asset.purchasePrice)}</div>
            </div>
            <div>
              <div className="label-caps mb-1">Value</div>
              <div className="text-[1.1rem] font-semibold text-ink font-[family-name:var(--font-mono)] tabular-nums">{formatEuro(currentValue)}</div>
            </div>
            <div>
              <div className="label-caps mb-1">Gain</div>
              <div className={`text-[1.1rem] font-semibold font-[family-name:var(--font-mono)] tabular-nums ${unrealisedGain >= 0 ? 'text-gain-green' : 'text-tax-red'}`}>
                {formatEuro(unrealisedGain)}
              </div>
            </div>
            <div>
              <div className="label-caps mb-1">Return</div>
              <div className={`text-[1.1rem] font-semibold font-[family-name:var(--font-mono)] tabular-nums ${unrealisedGain >= 0 ? 'text-gain-green' : 'text-tax-red'}`}>
                {asset.purchasePrice > 0 ? ((unrealisedGain / asset.purchasePrice) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline — clean rows, no card wrapper */}
      {events.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between border-b border-ink pb-2 mb-0">
            <div>
              <div className="label-caps">Tax Timeline</div>
              <div className="text-[0.7rem] text-ink-faint mt-0.5">Every 8 years from purchase</div>
            </div>
          </div>

          <div>
            {events.map((event, i) => (
              <div key={i} className={`flex items-center justify-between py-3 border-b border-rule-light ${event.isTriggered ? 'bg-tax-red-faint -mx-3 px-3' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    event.isTriggered ? 'bg-tax-red' : 'bg-rule'
                  }`} />
                  <div>
                    <span className="text-[0.8rem] font-medium text-ink">
                      Year {event.yearsHeld}
                    </span>
                    {event.isTriggered && (
                      <span className="ml-2 text-[0.65rem] text-tax-red font-semibold uppercase tracking-wide">
                        Triggered
                      </span>
                    )}
                    <div className="text-[0.7rem] text-ink-muted mt-0.5">
                      {formatDate(event.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[0.8rem] font-medium text-ink font-[family-name:var(--font-mono)] tabular-nums">{formatEuro(event.estimatedTax)}</div>
                  <div className="text-[0.7rem] text-ink-muted">on {formatEuro(event.estimatedGain)} gain</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-baseline justify-between py-3 border-b-2 border-ink">
            <span className="text-[0.8rem] font-semibold text-ink">Total estimated tax</span>
            <span className="text-[1.1rem] font-bold text-tax-red tabular-nums font-[family-name:var(--font-mono)]">
              {formatEuro(events.reduce((sum, e) => sum + e.estimatedTax, 0))}
            </span>
          </div>
          <div className="text-[0.7rem] text-ink-faint mt-2">
            Across {events.length} event{events.length !== 1 ? 's' : ''} over {events[events.length - 1]?.yearsHeld ?? 0} years.
            Projections assume current growth rate continues.
          </div>
        </section>
      )}
    </div>
  );
}
