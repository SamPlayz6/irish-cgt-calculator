import { type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';

interface GuideSection {
  title: string;
  metaTitle: string;
  metaDesc: string;
  content: ReactNode;
}

const guides: Record<string, GuideSection> = {
  'cgt-basics': {
    title: 'Capital Gains Tax in Ireland: Complete Guide',
    metaTitle: 'Irish Capital Gains Tax (CGT) Guide 2026 — Rates, Rules & Exemptions',
    metaDesc: 'Everything you need to know about Capital Gains Tax in Ireland. Current rate: 33%. Annual exemption: €1,270. How to calculate, when to pay, and how to reduce your CGT bill.',
    content: (
      <>
        <p>Capital Gains Tax (CGT) is a tax on the profit you make when you sell or dispose of an asset that has increased in value. In Ireland, CGT applies to most asset types including property, shares, cryptocurrency, and investment funds.</p>

        <h2>Current CGT Rate</h2>
        <p>The standard CGT rate in Ireland is <strong>33%</strong>. This applies to gains made on the disposal of most assets. Some exceptions apply for specific venture capital and entrepreneurial reliefs.</p>

        <h2>Annual Exemption</h2>
        <p>Every individual gets an annual CGT exemption of <strong>€1,270</strong>. This means the first €1,270 of gains in any tax year are tax-free. This exemption cannot be transferred between spouses.</p>

        <h2>How CGT is Calculated</h2>
        <div className="border-l-2 border-rule pl-4 my-5 text-[0.85rem] font-[family-name:var(--font-mono)]">
          <div className="space-y-1">
            <p>Sale Price</p>
            <p>- Purchase Price (adjusted for inflation if bought before 2003)</p>
            <p>- Allowable Costs (solicitor fees, stamp duty, etc.)</p>
            <p>= Gain</p>
            <p>- Annual Exemption (€1,270)</p>
            <p>= Taxable Gain</p>
            <p>x 33% = CGT Due</p>
          </div>
        </div>

        <h2>When to Pay</h2>
        <p>CGT payment deadlines depend on when the gain was made:</p>
        <ul>
          <li><strong>Gains from 1 Jan to 30 Nov:</strong> Pay by 15 December of the same year</li>
          <li><strong>Gains from 1 Dec to 31 Dec:</strong> Pay by 31 January of the following year</li>
        </ul>

        <h2>Assets Subject to CGT</h2>
        <ul>
          <li>Shares and stocks (Irish and foreign)</li>
          <li>Property (excluding your principal private residence)</li>
          <li>Cryptocurrency (Bitcoin, Ethereum, etc.)</li>
          <li>Investment funds and ETFs</li>
          <li>Business assets</li>
          <li>Foreign currency gains (above €1,270)</li>
          <li>Intellectual property</li>
        </ul>

        <h2>Exemptions and Reliefs</h2>
        <ul>
          <li><strong>Principal Private Residence:</strong> No CGT on selling your own home (if it was always your PPR)</li>
          <li><strong>Transfer between spouses:</strong> No CGT on assets transferred between married couples or civil partners</li>
          <li><strong>Retirement Relief:</strong> Reduced or no CGT when disposing of business assets at age 55+</li>
          <li><strong>Entrepreneur Relief:</strong> 10% CGT rate on qualifying business disposals (lifetime limit of €1M in gains)</li>
        </ul>

        <h2>Losses</h2>
        <p>Capital losses can be offset against capital gains in the same year, or carried forward to future years. You cannot carry losses back to previous years. Losses must be reported to Revenue to be used.</p>
      </>
    ),
  },
  'deemed-disposal': {
    title: 'Deemed Disposal in Ireland: The 8-Year Rule Explained',
    metaTitle: 'Deemed Disposal Ireland — The 8-Year Rule for ETFs & Funds Explained',
    metaDesc: 'How deemed disposal works for Irish investors holding ETFs, index funds, and investment funds. The 8-year rule, exit tax rates, and how to calculate what you owe.',
    content: (
      <>
        <p>Deemed disposal is one of the most discussed (and disliked) tax rules among Irish investors. It requires you to pay tax on unrealised gains in certain investment funds every 8 years, even if you haven't sold.</p>

        <h2>What is Deemed Disposal?</h2>
        <p>Under the deemed disposal rule, if you hold a "regulated fund" domiciled in the EU (which includes most ETFs and index funds available to Irish investors), Revenue treats you as having sold and repurchased your investment every 8 years from the date of purchase.</p>
        <p>This means you must pay <strong>exit tax at 41%</strong> on any unrealised gains at the 8-year mark, even though you still hold the investment.</p>

        <h2>Which Investments Are Affected?</h2>
        <ul>
          <li>EU-domiciled ETFs (most ETFs available on European exchanges)</li>
          <li>Irish-domiciled investment funds</li>
          <li>UCITS funds</li>
          <li>Life assurance investment policies</li>
        </ul>

        <h2>Which Investments Are NOT Affected?</h2>
        <ul>
          <li>Individual shares (subject to normal 33% CGT instead)</li>
          <li>US-domiciled ETFs (subject to 33% CGT, but restricted by EU regulations)</li>
          <li>Property</li>
          <li>Cryptocurrency</li>
          <li>Investment trusts listed on a stock exchange</li>
        </ul>

        <h2>Exit Tax Rate: 41%</h2>
        <p>The exit tax rate on regulated funds is <strong>41%</strong>, which is higher than the standard CGT rate of 33%. This is because the €1,270 annual exemption does NOT apply to exit tax. The higher rate is meant to compensate for this.</p>

        <h2>How the 8-Year Cycle Works</h2>
        <div className="border-l-2 border-rule pl-4 my-5 text-[0.85rem]">
          <p><strong>Example:</strong> You buy an ETF on 1 March 2020.</p>
          <ul className="mt-2 space-y-1">
            <li>First deemed disposal: 1 March 2028 (8 years)</li>
            <li>Second deemed disposal: 1 March 2036 (16 years)</li>
            <li>...and so on until you actually sell</li>
          </ul>
          <p className="mt-2">At each deemed disposal, you pay 41% exit tax on the gain since purchase (or since the last deemed disposal).</p>
        </div>

        <h2>Credit for Tax Already Paid</h2>
        <p>When you eventually sell the investment, you get credit for any exit tax already paid through deemed disposals. You won't be double-taxed, but the timing disadvantage of paying tax early remains significant.</p>

        <h2>Why Irish Investors Dislike Deemed Disposal</h2>
        <ul>
          <li>Forces you to pay tax on gains you haven't realised</li>
          <li>41% rate is higher than 33% CGT on shares</li>
          <li>No annual exemption (unlike CGT)</li>
          <li>Complex record-keeping across multiple 8-year cycles</li>
          <li>Reduces compound growth by pulling money out early</li>
        </ul>

        <h2>Alternatives to Avoid Deemed Disposal</h2>
        <p>Some Irish investors choose alternatives to avoid the deemed disposal regime:</p>
        <ul>
          <li><strong>Individual shares:</strong> Subject to 33% CGT with €1,270 exemption, no deemed disposal</li>
          <li><strong>Investment trusts:</strong> Listed trusts are not subject to deemed disposal</li>
          <li><strong>Pension contributions:</strong> Investments within pensions grow tax-free</li>
        </ul>
      </>
    ),
  },
  'crypto-cgt': {
    title: 'Cryptocurrency Tax in Ireland: CGT on Bitcoin & Crypto',
    metaTitle: 'Crypto Tax Ireland 2026 — CGT on Bitcoin, Ethereum & Cryptocurrency',
    metaDesc: 'How cryptocurrency is taxed in Ireland. CGT at 33% on crypto gains. What counts as a disposal, how to calculate, and when to pay Revenue.',
    content: (
      <>
        <p>Cryptocurrency is subject to Capital Gains Tax (CGT) in Ireland at the standard rate of <strong>33%</strong>. Revenue treats crypto assets as property, meaning any disposal triggers a potential tax event.</p>

        <h2>What Counts as a Disposal?</h2>
        <p>A "disposal" for CGT purposes includes:</p>
        <ul>
          <li>Selling cryptocurrency for fiat currency (EUR, USD, etc.)</li>
          <li>Swapping one cryptocurrency for another (e.g., BTC to ETH)</li>
          <li>Using cryptocurrency to buy goods or services</li>
          <li>Gifting cryptocurrency to another person</li>
        </ul>
        <p><strong>Simply holding (HODLing) is not a disposal.</strong> Moving crypto between your own wallets is also not a disposal.</p>

        <h2>How to Calculate Crypto CGT</h2>
        <p>The calculation follows the standard CGT formula, but crypto has specific challenges:</p>
        <ul>
          <li>You must track the cost basis of each purchase</li>
          <li>Revenue expects you to use the <strong>FIFO method</strong> (First In, First Out) when selling partial holdings</li>
          <li>Transaction fees (gas fees, exchange fees) are allowable costs</li>
          <li>If you bought on multiple occasions, each purchase has its own cost basis</li>
        </ul>

        <h2>DeFi and Staking</h2>
        <ul>
          <li><strong>Staking rewards:</strong> Treated as income, subject to income tax + PRSI + USC at your marginal rate</li>
          <li><strong>Liquidity pool yields:</strong> Also likely treated as income</li>
          <li><strong>Airdrops:</strong> Taxed as income at market value when received</li>
          <li><strong>NFTs:</strong> Subject to CGT when sold, same as other crypto</li>
        </ul>

        <h2>Mining</h2>
        <p>If you mine cryptocurrency, the coins received are treated as trading income (if done commercially) or as a miscellaneous gain. Either way, they're taxable when received at fair market value.</p>

        <h2>Record Keeping</h2>
        <p>Revenue requires you to keep records for at least 6 years. For crypto, this means:</p>
        <ul>
          <li>Date and time of every purchase and sale</li>
          <li>Amount of crypto bought/sold</li>
          <li>Price in EUR at the time of transaction</li>
          <li>Exchange or wallet used</li>
          <li>Transaction fees paid</li>
        </ul>

        <h2>Payment Deadlines</h2>
        <p>Same as standard CGT:</p>
        <ul>
          <li>Gains Jan-Nov: Pay by 15 December</li>
          <li>Gains in December: Pay by 31 January next year</li>
          <li>File annual CGT return (Form 11 or CG1) by 31 October following the tax year</li>
        </ul>
      </>
    ),
  },
  'etf-tax': {
    title: 'ETF Taxation in Ireland: What Investors Need to Know',
    metaTitle: 'ETF Tax Ireland 2026 — Exit Tax, Deemed Disposal & How ETFs Are Taxed',
    metaDesc: 'Complete guide to ETF taxation in Ireland. Exit tax at 41%, deemed disposal every 8 years, and no annual exemption. How it compares to shares.',
    content: (
      <>
        <p>ETFs (Exchange-Traded Funds) are one of the most popular investment vehicles worldwide, but in Ireland they carry a unique and often frustrating tax treatment. Most ETFs available to Irish investors are subject to <strong>exit tax at 41%</strong> rather than the standard 33% CGT rate.</p>

        <h2>Why ETFs Are Taxed Differently</h2>
        <p>Under Irish tax law, most ETFs are classified as "regulated funds" or "offshore funds." This classification puts them under a different tax regime than individual shares:</p>
        <div className="border border-rule rounded my-5 overflow-hidden">
          <table className="w-full text-[0.8rem]">
            <thead>
              <tr className="border-b border-rule bg-surface-alt">
                <th className="text-left py-2 px-3 font-medium text-ink">Feature</th>
                <th className="text-left py-2 px-3 font-medium text-ink">Individual Shares</th>
                <th className="text-left py-2 px-3 font-medium text-ink">ETFs (regulated funds)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule-light">
              <tr><td className="py-2 px-3 text-ink-secondary">Tax rate</td><td className="py-2 px-3">33%</td><td className="py-2 px-3">41%</td></tr>
              <tr><td className="py-2 px-3 text-ink-secondary">Annual exemption</td><td className="py-2 px-3">€1,270</td><td className="py-2 px-3">None</td></tr>
              <tr><td className="py-2 px-3 text-ink-secondary">Deemed disposal</td><td className="py-2 px-3">No</td><td className="py-2 px-3">Every 8 years</td></tr>
              <tr><td className="py-2 px-3 text-ink-secondary">Loss offset</td><td className="py-2 px-3">Yes</td><td className="py-2 px-3">Limited</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Which ETFs Are Affected?</h2>
        <p>Almost all ETFs available on European exchanges (e.g., those listed on Euronext, London Stock Exchange, XETRA) are affected. This includes popular funds from:</p>
        <ul>
          <li>iShares / BlackRock</li>
          <li>Vanguard (Ireland-domiciled)</li>
          <li>Invesco, SPDR, Xtrackers</li>
          <li>Any UCITS ETF</li>
        </ul>

        <h2>US-Domiciled ETFs: A Grey Area</h2>
        <p>US-domiciled ETFs (like VOO, VTI, SPY) are subject to the more favourable 33% CGT with the €1,270 exemption and NO deemed disposal. However, EU regulations (PRIIPs/KID requirements) make it very difficult for European brokers to offer these to retail investors. Some investors access them through specific brokers or workarounds.</p>

        <h2>Practical Impact</h2>
        <p>The deemed disposal and higher tax rate significantly reduce long-term compound returns for Irish ETF investors. Over a 30-year investment horizon, the difference between 33% CGT on shares and 41% exit tax with deemed disposal can amount to tens of thousands of euros on a typical portfolio.</p>

        <h2>Strategies</h2>
        <ul>
          <li>Maximise pension contributions (tax-free growth)</li>
          <li>Consider investment trusts (33% CGT, no deemed disposal)</li>
          <li>Use the €1,270 exemption efficiently with individual shares</li>
          <li>Keep detailed records of all ETF purchases for deemed disposal calculations</li>
        </ul>
      </>
    ),
  },
};

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? guides[slug] : undefined;

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-rule">
          <div className="max-w-2xl mx-auto px-5 py-5">
            <Link to="/" className="text-ink-muted hover:text-ink-secondary text-[0.8rem]">Back to calculator</Link>
            <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold mt-2">Page not found</h1>
          </div>
        </header>
        <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8">
          <p className="text-ink-muted">This guide doesn't exist.</p>
          <Link to="/" className="text-ink-secondary hover:text-ink font-medium mt-4 block text-[0.85rem]">Back to calculator</Link>
        </main>
        <Footer />
      </div>
    );
  }

  document.title = guide.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', guide.metaDesc);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="max-w-2xl mx-auto px-5 py-5 sm:py-6">
          <Link to="/" className="text-ink-muted hover:text-ink-secondary text-[0.8rem]">
            Back to calculator
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-[1.35rem] sm:text-[1.6rem] font-semibold leading-snug mt-3 tracking-tight">{guide.title}</h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8">
        <article>
          <div className="[&>h2]:font-[family-name:var(--font-display)] [&>h2]:text-[1.05rem] [&>h2]:font-semibold [&>h2]:text-ink [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:text-ink-secondary [&>p]:mb-3 [&>p]:leading-relaxed [&>p]:text-[0.85rem] [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-1.5 [&>ul>li]:text-ink-secondary [&>ul>li]:text-[0.85rem] [&>ul>li]:leading-relaxed">
            {guide.content}
          </div>
        </article>

        <div className="mt-10 pt-6 border-t border-rule text-center">
          <p className="text-ink font-medium text-[0.9rem] mb-3">Calculate your tax now</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-ink text-white px-5 py-2.5 rounded text-[0.8rem] font-medium hover:bg-ink-secondary"
          >
            Open CGT Calculator
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-rule-light">
          <h3 className="label-caps mb-4">More guides</h3>
          <div className="space-y-1.5">
            {Object.entries(guides)
              .filter(([key]) => key !== slug)
              .map(([key, g]) => (
                <Link
                  key={key}
                  to={`/guide/${key}`}
                  className="block text-[0.8rem] text-ink-secondary hover:text-ink font-medium py-0.5"
                >
                  {g.title}
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Article structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.metaDesc,
            author: {
              '@type': 'Person',
              name: 'Sam Dunning',
              url: 'https://sdd.ie',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Irish CGT Calculator',
              url: 'https://cgt.sdd.ie',
            },
            datePublished: '2026-04-07',
            dateModified: '2026-04-07',
            mainEntityOfPage: `https://cgt.sdd.ie/guide/${slug}`,
          }),
        }}
      />
    </div>
  );
}
