export default function MatchResult({ match }) {
  return (
    <div>
      <h4>{match.name}</h4>
      <p>Match Score: {match.score}%</p>
    </div>
  );
}
