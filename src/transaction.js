import React, { useState } from "react";

// Pole transakcií
const transactionsData = [
  { id: "ord-12345", createdAt: 1709481632000, state: "pending", year: 2024, amount: 129.99, customerName: "Paľo Ščerba" },
  { id: "ord-24680", createdAt: 1707062432000, state: "canceled", year: 2024, amount: 199.99, customerName: "Elon Musk" },
  { id: "ord-86420", createdAt: 1703433632000, state: "canceled", year: 2023, amount: 89.95, customerName: "Robetr Fico" },
  { id: "ord-77889", createdAt: 1698595232000, state: "canceled", year: 2023, amount: 19.99, customerName: "Samuel Dobsa" },
  { id: "ord-30495", createdAt: 1690128032000, state: "canceled", year: 2023, amount: 49.99, customerName: "Lukáš Zamborský" },
  { id: "ord-90123", createdAt: 1675612832000, state: "canceled", year: 2023, amount: 69.99, customerName: "Igor Matovič" },
  { id: "ord-11223", createdAt: 1628312832000, state: "canceled", year: 2022, amount: 59.99, customerName: "Zuzana Čaputová" },
  { id: "ord-33456", createdAt: 1634210632000, state: "canceled", year: 2022, amount: 139.99, customerName: "Andrej Kiska" },
  { id: "ord-77888", createdAt: 1595371232000, state: "canceled", year: 2021, amount: 99.99, customerName: "Richard Krajčo" },
  { id: "ord-33421", createdAt: 1604982832000, state: "canceled", year: 2021, amount: 249.99, customerName: "Milan Kňažko" }
];

// Funkcia na transformáciu
function groupCanceledTransactionsByYear(transactions) {
  return transactions
    .filter((transaction) => transaction.state === "canceled")
    .reduce((acc, transaction) => {
      const year = new Date(transaction.createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(transaction);
      return acc;
    }, {});
}

// Funkcia na zoradenie transakcií v rámci roku podľa createdAt
function sortTransactionsByDate(transactions) {
  return transactions.sort((a, b) => b.createdAt - a.createdAt); 
}

// Hlavný komponent
const Transactions = () => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [groupedCanceledTransactions, setGroupedCanceledTransactions] = useState({});
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleStartClick = () => {
    const grouped = groupCanceledTransactionsByYear(transactions);

    // Zoradíme transakcie v každom roku podľa createdAt
    for (let year in grouped) {
      grouped[year] = sortTransactionsByDate(grouped[year]);
    }

    setGroupedCanceledTransactions(grouped);
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setNewName(transaction.customerName);
    setNewAmount(transaction.amount);
  };

  const handleSaveClick = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, customerName: newName, amount: parseFloat(newAmount) }
        : transaction
    );

    setTransactions(updatedTransactions);
    setGroupedCanceledTransactions(groupCanceledTransactionsByYear(updatedTransactions));

    setEditingTransaction(null);
    setNewName("");
    setNewAmount("");
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setNewName("");
    setNewAmount("");
  };

  return (
    <div className="container">
      <button onClick={handleStartClick}>Start</button>

      <div>
        {Object.keys(groupedCanceledTransactions).length > 0 && (
          <div className="year-container">
            {Object.keys(groupedCanceledTransactions).map((year) => (
              <div key={year}>
                <h2>Year: {year}</h2>
                <ul>
                  {groupedCanceledTransactions[year].map((transaction) => (
                    <li key={transaction.id}>
                      <p>Transaction ID: {transaction.id}</p>
                      <p>Customer: {transaction.customerName}</p>
                      <p>Amount: {transaction.amount} €</p>

                      <button onClick={() => handleEditClick(transaction)}>Edit</button>

                      {editingTransaction && editingTransaction.id === transaction.id && (
                        <div className="edit-container">
                          <h3>Edit Transaction</h3>
                          <label>
                            Customer Name:
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>
                            Amount:
                            <input
                              type="number"
                              value={newAmount}
                              onChange={(e) => setNewAmount(e.target.value)}
                            />
                          </label>
                          <br />
                          <button onClick={() => handleSaveClick(transaction.id)}>Save</button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default Transactions;
