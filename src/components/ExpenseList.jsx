import React, { useState } from 'react';
import { Trash2, Search } from 'lucide-react';

function ExpenseList({ expenses, onDeleteExpense }) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Filter logic based on search input and selected dropdown category
  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
        Transaction History
      </h2>
      
      {/* Search and Filters Layout Wrapper */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '0.85rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} 
          />
        </div>
        
        <div style={{ flex: '1 1 150px' }}>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Food">Food & Dining</option>
            <option value="Rent">Rent & Housing</option>
            <option value="Utilities">Utilities & Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel & Transit</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Transaction List Container with Custom Premium Scrollbar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
        {filteredExpenses.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0', fontSize: '0.95rem' }}>
            No transactions recorded yet.
          </p>
        ) : (
          filteredExpenses.map(expense => (
            <div 
              key={expense.id} 
              className="flex-between transaction-list-row"
            >
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  {expense.title}
                </h4>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: '500' }}>
                    {expense.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {expense.date}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ fontWeight: '700', color: 'var(--danger)', fontSize: '1rem' }}>
                  -₹{expense.amount}
                </span>
                <Trash2 
                  size={16} 
                  style={{ 
                    color: 'var(--text-muted)', 
                    cursor: 'pointer', 
                    transition: 'color 0.2s' 
                  }}
                  onClick={() => onDeleteExpense(expense.id)}
                  onMouseEnter={(e) => e.target.style.color = 'var(--danger)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;