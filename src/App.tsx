import { useState } from 'react';
import Calculator from './components/Calculator';
import DeemedDisposal from './components/DeemedDisposal';
import Footer from './components/Footer';

type Tab = 'calculator' | 'deemed';

export default function App() {
  const [tab, setTab] = useState<Tab>('calculator');

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Irish CGT Calculator
          </h1>
          <p className="mt-1 text-emerald-200 text-sm sm:text-base">
            Calculate Capital Gains Tax and deemed disposal for Irish investors
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Tab switcher */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
          <button
            onClick={() => setTab('calculator')}
            className={`flex-1 px-4 py-2.5 font-medium transition-colors ${
              tab === 'calculator'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            CGT Calculator
          </button>
          <button
            onClick={() => setTab('deemed')}
            className={`flex-1 px-4 py-2.5 font-medium transition-colors ${
              tab === 'deemed'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Deemed Disposal
          </button>
        </div>

        {tab === 'calculator' ? <Calculator /> : <DeemedDisposal />}

        {/* Info box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Disclaimer:</strong> This calculator is for informational purposes only.
          It does not constitute tax advice. Always consult a qualified tax advisor or
          check <a href="https://www.revenue.ie/en/gains-gifts-and-inheritance/transfering-an-asset/how-to-calculate-cgt.aspx" target="_blank" rel="noopener noreferrer" className="underline">Revenue.ie</a> for
          official guidance. CGT rate: 33%. Annual exemption: €1,270.
        </div>
      </main>

      <Footer />
    </div>
  );
}
