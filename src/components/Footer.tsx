export default function Footer() {
  return (
    <footer className="border-t border-rule mt-auto">
      <div className="max-w-2xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-[0.75rem] text-ink-muted">
          <a href="https://lcpoints.sdd.ie" className="hover:text-ink-secondary">LC Points Calculator</a>
          <span className="text-rule">|</span>
          <a href="https://sdd.ie" className="hover:text-ink-secondary">More tools</a>
        </div>
        <p className="text-[0.7rem] text-ink-faint">
          Made in Cork by{' '}
          <a href="https://sdd.ie" className="hover:text-ink-secondary" target="_blank" rel="noopener noreferrer">Sam Dunning</a>.
          CGT 33%, exemption {'\u20AC'}1,270. Verify at{' '}
          <a href="https://www.revenue.ie" className="hover:text-ink-secondary" target="_blank" rel="noopener noreferrer">Revenue.ie</a>.
        </p>
      </div>
    </footer>
  );
}
