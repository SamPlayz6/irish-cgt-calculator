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
    <div className="space-y-6">
      <section className="card p-5 sm:p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-slate mb-1">Deemed Disposal</h2>
        <p className="text-sm text-slate-muted mb-4">
          ETFs and funds are taxed every 8 years, even if you hold. Enter your details to see the timeline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">ETF Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. VWCE, IWDA"
              className="w-full border border-cream-dark rounded-lg px-3 py-2.5 text-sm text-slate placeholder:text-slate-muted/40 hover:border-slate-muted/30"
            />
          </div>

          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={e => setPurchaseDate(e.target.value)}
              className="w-full border border-cream-dark rounded-lg px-3 py-2.5 text-sm text-slate hover:border-slate-muted/30"
            />
          </div>

          <div>
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Total Purchase Cost</label>
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
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Number of Units</label>
            <input
              type="number"
              value={units}
              onChange={e => setUnits(e.target.value)}
              placeholder="100"
              min="0"
              step="0.001"
              className="w-full border border-cream-dark rounded-lg px-3 py-2.5 text-sm text-slate placeholder:text-slate-muted/40 hover:border-slate-muted/30"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[0.8rem] font-medium text-slate-muted mb-1">Current Price Per Unit</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-muted text-sm">{'\u20AC'}</span>
              <input
                type="number"
                value={currentPrice}
                onChange={e => setCurrentPrice(e.target.value)}
                placeholder="120.50"
                min="0"
                step="0.01"
                className="w-full border border-cream-dark rounded-lg pl-7 pr-3 py-2.5 text-sm text-slate placeholder:text-slate-muted/40 hover:border-slate-muted/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      {asset && (
        <section className="card p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg text-slate mb-4">{asset.name}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[0.7rem] text-slate-muted uppercase tracking-wide">Cost</div>
              <div className="text-lg font-bold text-slate mt-1 font-[family-name:var(--font-mono)]">{formatEuro(asset.purchasePrice)}</div>
            </div>
            <div>
              <div className="text-[0.7rem] text-slate-muted uppercase tracking-wide">Value</div>
              <div className="text-lg font-bold text-slate mt-1 font-[family-name:var(--font-mono)]">{formatEuro(currentValue)}</div>
            </div>
            <div>
              <div className="text-[0.7rem] text-slate-muted uppercase tracking-wide">Gain</div>
              <div className={`text-lg font-bold mt-1 font-[family-name:var(--font-mono)] ${unrealisedGain >= 0 ? 'text-teal' : 'text-red'}`}>
                {formatEuro(unrealisedGain)}
              </div>
            </div>
            <div>
              <div className="text-[0.7rem] text-slate-muted uppercase tracking-wide">Return</div>
              <div className={`text-lg font-bold mt-1 font-[family-name:var(--font-mono)] ${unrealisedGain >= 0 ? 'text-teal' : 'text-red'}`}>
                {asset.purchasePrice > 0 ? ((unrealisedGain / asset.purchasePrice) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {events.length > 0 && (
        <section className="card">
          <div className="px-5 sm:px-6 py-4 border-b border-cream-dark">
            <h2 className="font-[family-name:var(--font-display)] text-lg text-slate">Tax Timeline</h2>
            <p className="text-[0.75rem] text-slate-muted mt-0.5">Every 8 years from purchase</p>
          </div>

          <div className="divide-y divide-cream-dark">
            {events.map((event, i) => (
              <div key={i} className={`px-5 sm:px-6 py-4 ${event.isTriggered ? 'bg-red-bg' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        event.isTriggered ? 'bg-red' : 'bg-cream-dark'
                      }`} />
                      <span className="font-medium text-sm text-slate">
                        Year {event.yearsHeld}
                      </span>
                      {event.isTriggered && (
                        <span className="text-[0.65rem] bg-red/10 text-red px-1.5 py-0.5 rounded font-medium">
                          Triggered
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-muted ml-4 mt-0.5">
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate font-[family-name:var(--font-mono)]">{formatEuro(event.estimatedTax)}</div>
                    <div className="text-xs text-slate-muted">on {formatEuro(event.estimatedGain)} gain</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-6 py-4 bg-amber-bg border-t border-cream-dark">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-amber">Total estimated tax</span>
              <span className="text-lg font-bold text-amber tabular-nums font-[family-name:var(--font-mono)]">
                {formatEuro(events.reduce((sum, e) => sum + e.estimatedTax, 0))}
              </span>
            </div>
            <div className="text-[0.7rem] text-amber/70 mt-1">
              Across {events.length} event{events.length !== 1 ? 's' : ''} over {events[events.length - 1]?.yearsHeld ?? 0} years
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-cream-warm border-t border-cream-dark text-[0.7rem] text-slate-muted">
            Projections assume current growth rate continues. Actual tax depends on value at each event.
          </div>
        </section>
      )}
    </div>
  );
}
