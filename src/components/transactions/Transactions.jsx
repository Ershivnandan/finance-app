import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database as db } from '../../utils/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTransactions(user.uid);
      }
    });
  }, []);

  const fetchTransactions = (uid) => {
    const transactionsRef = ref(db, `/`);
    const fetchedTransactions = [];
    onValue(transactionsRef, (snapshot) => {
      snapshot.child(`incomes/${uid}`).forEach((incomeSnap) => {
        fetchedTransactions.push({ id: incomeSnap.key, type: 'Income', ...incomeSnap.val() });
      });
      snapshot.child(`expenses/${uid}`).forEach((expenseSnap) => {
        fetchedTransactions.push({ id: expenseSnap.key, type: 'Expense', ...expenseSnap.val() });
      });
      setTransactions(fetchedTransactions);
    });
  };

  const deleteTransaction = (type, id) => {
    const path = type === 'Income' ? `incomes/${userId}/${id}` : `expenses/${userId}/${id}`;
    remove(ref(db, path));
  };

  const filteredTransactions = transactions.filter((t) =>
    filter === 'All' ? true : t.type === filter
  );

  return (
    <div>
      <h2>Transactions</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <ul>
        {filteredTransactions.map((t) => (
          <li key={t.id}>
            {t.type} - ${t.amount} - {t.category} - {t.date}
            <button onClick={() => deleteTransaction(t.type, t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
