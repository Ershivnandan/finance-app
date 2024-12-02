import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database as db } from '../../utils/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Savings = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchData(user.uid);
      }
    });
  }, []);

  const fetchData = (uid) => {
    onValue(ref(db, `incomes/${uid}`), (snapshot) => {
      let totalIncome = 0;
      snapshot.forEach((snap) => (totalIncome += snap.val().amount));
      setIncome(totalIncome);
    });

    onValue(ref(db, `expenses/${uid}`), (snapshot) => {
      let totalExpenses = 0;
      snapshot.forEach((snap) => (totalExpenses += snap.val().amount));
      setExpenses(totalExpenses);
    });
  };

  useEffect(() => {
    setSavings(income - expenses);
  }, [income, expenses]);

  return (
    <div>
      <h2>Savings Overview</h2>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
      <p>Current Savings: ${savings}</p>
    </div>
  );
};

export default Savings;
