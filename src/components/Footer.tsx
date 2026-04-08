export default function Footer() {
  return (
    <footer className="text-center py-10 px-4 space-y-3">
      <div className="flex items-center justify-center gap-4 text-sm text-slate-muted">
        <a href="https://lcpoints.sdd.ie" className="hover:text-slate">LC Points Calculator</a>
        <span className="text-cream-dark">|</span>
        <a href="https://sdd.ie" className="hover:text-slate">More tools</a>
      </div>
      <p className="text-[0.75rem] text-slate-muted/60">
        Made in Cork by{' '}
        <a href="https://sdd.ie" className="hover:text-slate" target="_blank" rel="noopener noreferrer">Sam Dunning</a>.
        CGT 33%, exemption {'\u20AC'}1,270. Verify at{' '}
        <a href="https://www.revenue.ie" className="hover:text-slate" target="_blank" rel="noopener noreferrer">Revenue.ie</a>.
      </p>
    </footer>
  );
}
