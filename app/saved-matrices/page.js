'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SavedMatrices() {
  const [savedMatrices, setSavedMatrices] = useState({});

  useEffect(() => {
    loadMatrices();
  }, []);

  const loadMatrices = () => {
    const storedMatrices = JSON.parse(localStorage.getItem('decisionMatrices') || '{}');
    setSavedMatrices(storedMatrices);
  };

  const deleteMatrix = (id) => {
    if (confirm('Are you sure you want to delete this decision matrix?')) {
      const updatedMatrices = { ...savedMatrices };
      delete updatedMatrices[id];
      localStorage.setItem('decisionMatrices', JSON.stringify(updatedMatrices));
      setSavedMatrices(updatedMatrices);
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const sortedMatrixIds = Object.keys(savedMatrices).sort((a, b) => {
    const dateA = new Date(savedMatrices[a].createdAt);
    const dateB = new Date(savedMatrices[b].createdAt);
    return dateB.getTime() - dateA.getTime(); // Sort descending by creation date
  });

  return (
    <div className="container">
      <h1>Saved Decision Matrices</h1>

      {sortedMatrixIds.length === 0 ? (
        <p>No decision matrices saved yet. <Link href="/create-decision-matrix">Create a new one</Link>!</p>
      ) : (
        <div className="matrix-grid">
          {sortedMatrixIds.map(id => {
            const matrix = savedMatrices[id];
            return (
              <div key={matrix.id} className="matrix-card">
                <h3>{matrix.name}</h3>
                <p><strong>Options:</strong> {matrix.options.length}</p>
                <p><strong>Criteria:</strong> {matrix.criteria.length}</p>
                <p><strong>Created:</strong> {formatTimestamp(matrix.createdAt)}</p>
                <div className="button-group">
                  <Link href={`/analyze-matrix?id=${matrix.id}`} className="button primary-button">
                    <span>View Analysis</span>
                  </Link>
                  <button onClick={() => deleteMatrix(matrix.id)} className="button danger-button">
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
