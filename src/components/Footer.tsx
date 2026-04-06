export default function Footer() {
  return (
    <footer className="text-center text-xs text-gray-400 py-8 space-y-3">
      <div className="flex items-center justify-center gap-4 text-gray-500">
        <a href="https://lcpoints.sdd.ie" className="hover:text-primary transition-colors">
          LC Points Calculator
        </a>
        <span className="text-gray-300">|</span>
        <a href="https://sdd.ie" className="hover:text-primary transition-colors">
          More tools
        </a>
      </div>
      <p>
        Built by{' '}
        <a href="https://sdd.ie" className="text-gray-500 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
          Sam Dunning
        </a>
        {' '}in Cork, Ireland
      </p>
      <p>
        CGT rate: 33%. Annual exemption: €1,270. Deemed disposal: 8-year rule.
        Not tax advice. Verify with{' '}
        <a href="https://www.revenue.ie" className="text-gray-500 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
          Revenue.ie
        </a>
        .
      </p>
    </footer>
  );
}
