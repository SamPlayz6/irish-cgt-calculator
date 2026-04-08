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
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-slate-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(13,126,107,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(13,126,107,0.2) 0%, transparent 50%)',
        }} />
        <div className="max-w-3xl mx-auto px-4 py-7 sm:py-9 relative">
          <h1 className="font-[family-name:var(--font-display)] text-[1.6rem] sm:text-[2rem] leading-tight">
            Irish CGT Calculator
          </h1>
          <p className="mt-2 text-white/40 text-[0.9rem]">
            Capital gains tax and deemed disposal for Irish investors
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Tab switcher */}
        <div className="flex rounded-lg border border-cream-dark overflow-hidden text-sm">
          <button
            onClick={() => setTab('calculator')}
            className={`flex-1 px-4 py-2.5 font-medium ${
              tab === 'calculator'
                ? 'bg-slate-deep text-white'
                : 'bg-white text-slate-muted hover:bg-cream-warm'
            }`}
          >
            CGT Calculator
          </button>
          <button
            onClick={() => setTab('deemed')}
            className={`flex-1 px-4 py-2.5 font-medium ${
              tab === 'deemed'
                ? 'bg-slate-deep text-white'
                : 'bg-white text-slate-muted hover:bg-cream-warm'
            }`}
          >
            Deemed Disposal
          </button>
        </div>

        {tab === 'calculator' ? <Calculator /> : <DeemedDisposal />}

        {/* Disclaimer */}
        <div className="bg-amber-bg border border-amber/20 rounded-xl p-4 text-sm text-amber">
          <strong>Not tax advice.</strong>{' '}
          This is for informational purposes only. Consult a tax advisor or check{' '}
          <a href="https://www.revenue.ie/en/gains-gifts-and-inheritance/transfering-an-asset/how-to-calculate-cgt.aspx" target="_blank" rel="noopener noreferrer" className="underline">Revenue.ie</a>{' '}
          for official guidance. CGT rate: 33%. Annual exemption: {'\u20AC'}1,270.
        </div>

        {/* Guide links */}
        <div className="card p-5">
          <h2 className="font-[family-name:var(--font-display)] text-lg text-slate mb-3">Tax Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link to="/guide/cgt-basics" className="text-sm text-teal hover:text-teal-light font-medium">
              Capital Gains Tax in Ireland
            </Link>
            <Link to="/guide/deemed-disposal" className="text-sm text-teal hover:text-teal-light font-medium">
              Deemed Disposal: The 8-Year Rule
            </Link>
            <Link to="/guide/crypto-cgt" className="text-sm text-teal hover:text-teal-light font-medium">
              Cryptocurrency Tax in Ireland
            </Link>
            <Link to="/guide/etf-tax" className="text-sm text-teal hover:text-teal-light font-medium">
              ETF Taxation in Ireland
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-slate-deep text-white">
        <div className="max-w-3xl mx-auto px-4 py-7">
          <h1 className="font-[family-name:var(--font-display)] text-2xl">Page not found</h1>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 text-center">
        <p className="text-slate-muted mb-6">This page doesn't exist. You might have followed a broken link.</p>
        <Link to="/" className="bg-slate-deep text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate inline-block">
          Back to calculator
        </Link>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
