'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateDecisionMatrix() {
  const [decisionName, setDecisionName] = useState('');
  const [options, setOptions] = useState([{ id: 1, name: 'Option A' }]);
  const [criteria, setCriteria] = useState([{ id: 1, name: 'Cost', weight: 3 }, { id: 2, name: 'Features', weight: 5 }]);
  const [scores, setScores] = useState({}); // { optionId: { criterionId: score } }
  const router = useRouter();

  useEffect(() => {
    // Initialize scores when options or criteria change
    const newScores = {};
    options.forEach(option => {
      newScores[option.id] = {};
      criteria.forEach(criterion => {
        newScores[option.id][criterion.id] = scores[option.id]?.[criterion.id] || 0;
      });
    });
    setScores(newScores);
  }, [options, criteria]); // Only re-run if options or criteria arrays change

  const addOption = () => {
    setOptions([...options, { id: Date.now(), name: '' }]);
  };

  const removeOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const updateOptionName = (id, name) => {
    setOptions(options.map(option => (option.id === id ? { ...option, name } : option)));
  };

  const addCriterion = () => {
    setCriteria([...criteria, { id: Date.now(), name: '', weight: 1 }]);
  };

  const removeCriterion = (id) => {
    setCriteria(criteria.filter(criterion => criterion.id !== id));
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map(criterion => (criterion.id === id ? { ...criterion, [field]: value } : criterion)));
  };

  const updateScore = (optionId, criterionId, value) => {
    setScores(prevScores => ({
      ...prevScores,
      [optionId]: {
        ...(prevScores[optionId] || {}),
        [criterionId]: parseInt(value, 10) || 0,
      },
    }));
  };

  const saveDecision = () => {
    if (!decisionName.trim()) {
      alert('Please enter a name for your decision matrix.');
      return;
    }
    if (options.length === 0 || criteria.length === 0) {
      alert('Please add at least one option and one criterion.');
      return;
    }
    if (options.some(opt => !opt.name.trim()) || criteria.some(crit => !crit.name.trim())) {
        alert('Please ensure all options and criteria have names.');
        return;
    }
    if (criteria.some(crit => crit.weight < 1)) {
        alert('Criterion weights must be at least 1.');
        return;
    }

    const newMatrix = {
      id: Date.now().toString(),
      name: decisionName,
      options: options.map(opt => ({ id: opt.id, name: opt.name.trim() })),
      criteria: criteria.map(crit => ({ id: crit.id, name: crit.name.trim(), weight: crit.weight })),
      scores: scores,
      createdAt: new Date().toISOString(),
    };

    const storedMatrices = JSON.parse(localStorage.getItem('decisionMatrices') || '{}');
    storedMatrices[newMatrix.id] = newMatrix;
    localStorage.setItem('decisionMatrices', JSON.stringify(storedMatrices));

    alert('Decision matrix saved!');
    router.push(`/analyze-matrix?id=${newMatrix.id}`);
  };

  return (
    <div className="container">
      <h1>Create Decision Matrix</h1>

      <div className="form-group">
        <label htmlFor="decisionName">Decision Name:</label>
        <input
          id="decisionName"
          type="text"
          className="input-field"
          value={decisionName}
          onChange={(e) => setDecisionName(e.target.value)}
          placeholder="e.g., Which laptop to buy?"
        />
      </div>

      <h2 className="section-heading">Options</h2>
      {options.map((option, index) => (
        <div key={option.id} className="list-item-card">
          <input
            type="text"
            className="input-field"
            value={option.name}
            onChange={(e) => updateOptionName(option.id, e.target.value)}
            placeholder={`Option ${index + 1}`}
            aria-label={`Option ${index + 1} name`}
          />
          <div className="card-actions">
            {options.length > 1 && (
              <button onClick={() => removeOption(option.id)} className="button danger-button">
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      ))}
      <button onClick={addOption} className="button secondary-button">
        <span>Add Option</span>
      </button>

      <h2 className="section-heading" style={{ marginTop: '2rem' }}>Criteria & Weights</h2>
      {criteria.map((criterion, index) => (
        <div key={criterion.id} className="list-item-card">
          <input
            type="text"
            className="input-field"
            value={criterion.name}
            onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
            placeholder={`Criterion ${index + 1}`}
            aria-label={`Criterion ${index + 1} name`}
          />
          <input
            type="number"
            className="input-field"
            value={criterion.weight}
            onChange={(e) => updateCriterion(criterion.id, 'weight', parseInt(e.target.value, 10) || 1)}
            min="1"
            max="10"
            aria-label={`Criterion ${index + 1} weight (1-10)`}
            title="Weight (1-10)"
            style={{ width: '80px', flexShrink: 0, marginLeft: '1rem' }}
          />
          <div className="card-actions">
            {criteria.length > 1 && (
              <button onClick={() => removeCriterion(criterion.id)} className="button danger-button">
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      ))}
      <button onClick={addCriterion} className="button secondary-button">
        <span>Add Criterion</span>
      </button>

      <h2 className="section-heading" style={{ marginTop: '2rem' }}>Score Options (1-5 for each criterion)</h2>
      <div className="table-wrapper">
        <table className="decision-table">
          <thead>
            <tr>
              <th>Option / Criterion</th>
              {criteria.map(criterion => (
                <th key={criterion.id}>{criterion.name} (Weight: {criterion.weight})</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.map(option => (
              <tr key={option.id}>
                <td>{option.name}</td>
                {criteria.map(criterion => (
                  <td key={criterion.id}>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={scores[option.id]?.[criterion.id] || 0}
                      onChange={(e) => updateScore(option.id, criterion.id, e.target.value)}
                      aria-label={`${option.name} score for ${criterion.name}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group" style={{ marginTop: '2rem' }}>
        <button onClick={saveDecision} className="button primary-button">
          <span>Save & Analyze Decision</span>
        </button>
      </div>
    </div>
  );
}
