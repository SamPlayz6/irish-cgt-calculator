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
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Deemed Disposal Calculator</h2>
        <p className="text-sm text-gray-500 mb-4">
          Irish ETFs and investment funds are subject to tax every 8 years, even if you don't sell.
          Enter your ETF details to see when deemed disposal events will trigger.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ETF Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. VWCE, IWDA"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={e => setPurchaseDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Purchase Cost</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
            <input
              type="number"
              value={units}
              onChange={e => setUnits(e.target.value)}
              placeholder="100"
              min="0"
              step="0.001"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Price Per Unit</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
              <input
                type="number"
                value={currentPrice}
                onChange={e => setCurrentPrice(e.target.value)}
                placeholder="120.50"
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      {asset && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{asset.name} Summary</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Cost Basis</div>
              <div className="text-lg font-bold text-gray-900 mt-1">{formatEuro(asset.purchasePrice)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Current Value</div>
              <div className="text-lg font-bold text-gray-900 mt-1">{formatEuro(currentValue)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Unrealised Gain</div>
              <div className={`text-lg font-bold mt-1 ${unrealisedGain >= 0 ? 'text-primary' : 'text-danger'}`}>
                {formatEuro(unrealisedGain)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Return</div>
              <div className={`text-lg font-bold mt-1 ${unrealisedGain >= 0 ? 'text-primary' : 'text-danger'}`}>
                {asset.purchasePrice > 0 ? ((unrealisedGain / asset.purchasePrice) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {events.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Deemed Disposal Timeline</h2>
            <p className="text-xs text-gray-500 mt-0.5">Tax events every 8 years from purchase</p>
          </div>

          <div className="divide-y divide-gray-100">
            {events.map((event, i) => (
              <div key={i} className={`px-5 sm:px-6 py-4 ${event.isTriggered ? 'bg-red-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        event.isTriggered ? 'bg-danger' : 'bg-gray-300'
                      }`} />
                      <span className="font-medium text-sm text-gray-900">
                        Year {event.yearsHeld}
                      </span>
                      {event.isTriggered && (
                        <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                          Triggered
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 ml-[18px] mt-0.5">
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{formatEuro(event.estimatedTax)}</div>
                    <div className="text-xs text-gray-500">on {formatEuro(event.estimatedGain)} gain</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-6 py-4 bg-amber-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-900">Total estimated deemed disposal tax</span>
              <span className="text-lg font-bold text-amber-900 tabular-nums">
                {formatEuro(events.reduce((sum, e) => sum + e.estimatedTax, 0))}
              </span>
            </div>
            <div className="text-xs text-amber-700 mt-1">
              Over {events.length} deemed disposal event{events.length !== 1 ? 's' : ''} across {events[events.length - 1]?.yearsHeld ?? 0} years
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
            Future estimates assume current growth rate continues. Actual tax depends on value at each deemed disposal date.
          </div>
        </section>
      )}
    </div>
  );
}
