import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddExpense({
      id: crypto.randomUUID(),
      title,
      amount: parseFloat(amount),
      category,
      date
    });

    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Expense Name</label>
        <input 
          type="text" 
          placeholder="e.g., Groceries" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Amount (₹)</label>
        <input 
          type="number" 
          placeholder="0.00" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          min="0.01"
          step="0.01"
          required 
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food & Dining</option>
          <option value="Rent">Rent & Housing</option>
          <option value="Utilities">Utilities & Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel & Transit</option>
          <option value="Other">Other Miscellaneous</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      <button type="submit" style={{ marginTop: '0.5rem' }}>Add Transaction</button>
    </form>
  );
}

export default ExpenseForm;