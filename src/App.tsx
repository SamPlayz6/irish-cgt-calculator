import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Calculator from './components/Calculator';
import DeemedDisposal from './components/DeemedDisposal';
import Footer from './components/Footer';
import GuidePage from './components/GuidePage';

type Tab = 'calculator' | 'deemed';

function HomePage() {
  const [tab, setTab] = useState<Tab>('calculator');

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-hero text-white">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg bg-primary/30 flex items-center justify-center text-emerald-300 font-bold text-sm">
              CGT
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Irish CGT Calculator
            </h1>
          </div>
          <p className="mt-1 text-emerald-400/60 text-sm sm:text-base pl-12">
            Capital Gains Tax and deemed disposal for Irish investors
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

        {/* Guide links for SEO */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Tax Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link to="/guide/cgt-basics" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              Capital Gains Tax in Ireland
            </Link>
            <Link to="/guide/deemed-disposal" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              Deemed Disposal: The 8-Year Rule
            </Link>
            <Link to="/guide/crypto-cgt" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              Cryptocurrency Tax in Ireland
            </Link>
            <Link to="/guide/etf-tax" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              ETF Taxation in Ireland
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide/:slug" element={<GuidePage />} />
      </Routes>
    </BrowserRouter>
  );
}
