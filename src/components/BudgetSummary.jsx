import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, Wallet, Edit3, Check } from 'lucide-react';

function BudgetSummary({ budget, setBudget, totalSpent, remaining }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(budget);

  const handleSave = () => {
    setBudget(parseFloat(editValue) || 0);
    setIsEditing(false);
  };

  return (
    <div className="stats-grid">
      {/* Total Budget Card */}
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
          <Wallet size={24} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Monthly Budget</p>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <input 
                type="number" 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)}
                style={{ padding: '0.25rem 0.5rem', fontSize: '1rem' }}
              />
              <button onClick={handleSave} style={{ width: 'auto', padding: '0.25rem 0.75rem' }}>
                <Check size={16} />
              </button>
            </div>
          ) : (
            <div className="flex-between">
              <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹{budget}</span>
              <Edit3 
                size={16} 
                style={{ color: 'var(--text-muted)', cursor: 'pointer' }} 
                onClick={() => setIsEditing(true)} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Expenses Card */}
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
          <ArrowUpRight size={24} />
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Spent</p>
          <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹{totalSpent}</span>
        </div>
      </div>

      {/* Remaining Card */}
      <div className="stat-card">
        <div className="stat-icon" style={{ 
          backgroundColor: remaining >= 0 ? '#f0fdf4' : '#fff1f2', 
          color: remaining >= 0 ? '#16a34a' : '#e11d48' 
        }}>
          <DollarSign size={24} />
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Remaining Balance</p>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: remaining >= 0 ? 'var(--text-main)' : 'var(--danger)'
          }}>
            ₹{remaining}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BudgetSummary;