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
    <div className="min-h-screen flex flex-col">
      {/* Header — thin, functional */}
      <header className="border-b border-rule">
        <div className="max-w-2xl mx-auto px-5 py-5 sm:py-6">
          <h1 className="font-[family-name:var(--font-display)] text-[1.35rem] sm:text-[1.6rem] font-semibold tracking-tight text-ink leading-tight">
            Irish CGT Calculator
          </h1>
          <p className="mt-1.5 text-ink-muted text-[0.8rem]">
            Capital gains tax and deemed disposal for Irish investors
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-6 sm:py-8">
        {/* Tab switcher — understated */}
        <div className="flex gap-0 mb-8 border-b border-rule">
          <button
            onClick={() => setTab('calculator')}
            className={`px-4 py-2.5 text-[0.8rem] font-medium -mb-px ${
              tab === 'calculator'
                ? 'border-b-2 border-ink text-ink'
                : 'text-ink-muted hover:text-ink-secondary'
            }`}
          >
            CGT Calculator
          </button>
          <button
            onClick={() => setTab('deemed')}
            className={`px-4 py-2.5 text-[0.8rem] font-medium -mb-px ${
              tab === 'deemed'
                ? 'border-b-2 border-ink text-ink'
                : 'text-ink-muted hover:text-ink-secondary'
            }`}
          >
            Deemed Disposal
          </button>
        </div>

        {tab === 'calculator' ? <Calculator /> : <DeemedDisposal />}

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-rule">
          <p className="text-[0.75rem] text-ink-muted leading-relaxed">
            <span className="font-semibold text-warn">Not tax advice.</span>{' '}
            This is for informational purposes only. Consult a tax advisor or check{' '}
            <a href="https://www.revenue.ie/en/gains-gifts-and-inheritance/transfering-an-asset/how-to-calculate-cgt.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-secondary">Revenue.ie</a>{' '}
            for official guidance. CGT rate: 33%. Annual exemption: {'\u20AC'}1,270.
          </p>
        </div>

        {/* Guide links */}
        <div className="mt-8 pt-6 border-t border-rule-light">
          <h2 className="label-caps mb-4">Tax Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <Link to="/guide/cgt-basics" className="text-[0.8rem] text-ink-secondary hover:text-ink font-medium py-1">
              Capital Gains Tax in Ireland
            </Link>
            <Link to="/guide/deemed-disposal" className="text-[0.8rem] text-ink-secondary hover:text-ink font-medium py-1">
              Deemed Disposal: The 8-Year Rule
            </Link>
            <Link to="/guide/crypto-cgt" className="text-[0.8rem] text-ink-secondary hover:text-ink font-medium py-1">
              Cryptocurrency Tax in Ireland
            </Link>
            <Link to="/guide/etf-tax" className="text-[0.8rem] text-ink-secondary hover:text-ink font-medium py-1">
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
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="max-w-2xl mx-auto px-5 py-5">
          <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold">Page not found</h1>
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-12 text-center">
        <p className="text-ink-muted mb-6">This page doesn't exist. You might have followed a broken link.</p>
        <Link to="/" className="text-ink font-medium text-sm underline hover:no-underline">
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
