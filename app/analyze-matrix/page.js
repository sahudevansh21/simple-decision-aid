'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AnalyzeMatrix() {
  const searchParams = useSearchParams();
  const decisionId = searchParams.get('id');

  const [matrix, setMatrix] = useState(null);
  const [results, setResults] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (decisionId) {
      const storedMatrices = JSON.parse(localStorage.getItem('decisionMatrices') || '{}');
      const loadedMatrix = storedMatrices[decisionId];
      if (loadedMatrix) {
        setMatrix(loadedMatrix);
      } else {
        setMatrix(null); // Matrix not found
      }
    }
  }, [decisionId]);

  useEffect(() => {
    if (matrix) {
      const calculatedResults = matrix.options.map(option => {
        let totalWeightedScore = 0;
        matrix.criteria.forEach(criterion => {
          const score = matrix.scores[option.id]?.[criterion.id] || 0;
          totalWeightedScore += score * criterion.weight;
        });
        return { optionId: option.id, optionName: option.name, totalWeightedScore };
      });

      calculatedResults.sort((a, b) => b.totalWeightedScore - a.totalWeightedScore);
      setResults(calculatedResults);

      if (calculatedResults.length > 0) {
        setRecommendation(calculatedResults[0].optionName);
      } else {
        setRecommendation(null);
      }
    }
  }, [matrix]);

  if (!decisionId) {
    return (
      <div className="container">
        <h1>Analyze Decision Matrix</h1>
        <p>Please select a decision matrix to analyze from the <Link href="/saved-matrices">Saved Matrices</Link> page.</p>
      </div>
    );
  }

  if (!matrix) {
    return (
      <div className="container">
        <h1>Analyze Decision Matrix</h1>
        <p>Loading decision matrix or matrix not found...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Analysis for: {matrix.name}</h1>

      <div className="table-wrapper" style={{ marginTop: '2rem' }}>
        <table className="decision-table">
          <thead>
            <tr>
              <th>Option / Criterion</th>
              {matrix.criteria.map(criterion => (
                <th key={criterion.id}>{criterion.name} (W: {criterion.weight})</th>
              ))}
              <th>Total Weighted Score</th>
            </tr>
          </thead>
          <tbody>
            {matrix.options.map(option => {
              const totalWeightedScore = results.find(r => r.optionId === option.id)?.totalWeightedScore || 0;
              return (
                <tr key={option.id}>
                  <td>{option.name}</td>
                  {matrix.criteria.map(criterion => {
                    const score = matrix.scores[option.id]?.[criterion.id] || 0;
                    return (
                      <td key={criterion.id}>
                        {score} <span style={{fontSize: '0.8em', color: '#aaa'}}>({score * criterion.weight})</span>
                      </td>
                    );
                  })}
                  <td><strong>{totalWeightedScore}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="analyze-results">
        <h2>Ranking of Options:</h2>
        {
          results.length > 0 ? (
            results.map((result, index) => (
              <div key={result.optionId} className="result-item">
                <span>{index + 1}. {result.optionName}</span>
                <span>Score: <strong>{result.totalWeightedScore}</strong></span>
              </div>
            ))
          ) : (
            <p>No results to display. Please ensure options and criteria are entered.</p>
          )
        }

        {recommendation && (
          <div className="recommendation">
            Our recommendation is: <span>{recommendation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
