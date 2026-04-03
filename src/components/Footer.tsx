export default function Footer() {
  return (
    <footer className="text-center text-xs text-gray-400 py-8 space-y-2">
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
