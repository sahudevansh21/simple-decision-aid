import Link from 'next/link';

export default function Home() {
  return (
    <div className="container home-container">
      <h1 className="main-heading">Simple Decision Aid</h1>
      <p className="tagline">Navigate choices with clarity and confidence.</p>
      <p className="description">
        Facing a tough decision? Our Simple Decision Aid helps you break down complex choices 
        into manageable parts. Define your options, set your criteria, assign importance, and 
        let our tool guide you to the best outcome. Stop overthinking and start making informed decisions.
      </p>
      <div className="button-group">
        <Link href="/create-decision-matrix" className="button primary-button">
          Start New Decision
        </Link>
        <Link href="/saved-matrices" className="button secondary-button">
          View Saved Decisions
        </Link>
      </div>
    </div>
  );
}
