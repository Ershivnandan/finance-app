import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { database as db } from '../../utils/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchExpenses(user.uid);
      }
    });
  }, []);

  const fetchExpenses = (uid) => {
    const expensesRef = ref(db, `expenses/${uid}`);
    onValue(expensesRef, (snapshot) => {
      const expenseList = [];
      snapshot.forEach((childSnapshot) => {
        expenseList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setExpenses(expenseList);
    });
  };

  const addExpense = (e) => {
    e.preventDefault();
    const expensesRef = ref(db, `expenses/${userId}`);
    push(expensesRef, { amount, description, category, date });
    setAmount('');
    setDescription('');
    setCategory('');
    setDate('');
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={addExpense}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} - {expense.category} - {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
