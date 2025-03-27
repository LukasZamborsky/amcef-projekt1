// Pole transakcií
const transactions = [
    { id: "ord-12345", createdAt: 1709481632000, state: "pending", year: 2024, amount: 129.99, customerName: "Paľo Ščerba" },
    { id: "ord-24680", createdAt: 1707062432000, state: "canceled", year: 2024, amount: 199.99, customerName: "Elon Musk" },
    { id: "ord-86420", createdAt: 1703433632000, state: "canceled", year: 2028, amount: 89.95, customerName: "Robetr Fico" },
    { id: "ord-77889", createdAt: 1698595232000, state: "canceled", year: 2023, amount: 19.99, customerName: "Samuel Dobsa" },
    { id: "ord-30495", createdAt: 1690128032000, state: "canceled", year: 2023, amount: 49.99, customerName: "Lukáš Zamborský" },
    { id: "ord-90123", createdAt: 1675612832000, state: "canceled", year: 2023, amount: 69.99, customerName: "Igor Matovič" },
  ];
  
  // Funkcia na transformáciu
  function groupCanceledTransactionsByYear(transactions) {
    return transactions
      .filter(transaction => transaction.state === 'canceled')
      .reduce((acc, transaction) => {
        
        const year = new Date(transaction.createdAt).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(transaction);
        return acc;
      }, {});
  }
  
  // Zoradenie transakcií v rámci roku podľa createdAt
  function sortTransactionsByDate(transactions) {
    return transactions.sort((a, b) => b.createdAt - a.createdAt);
  }
  
  // Použitie oboch funkcií
  const groupedCanceledTransactions = groupCanceledTransactionsByYear(transactions);
  
  // Zoradíme transakcie v každom roku podľa createdAt
  for (let year in groupedCanceledTransactions) {
    groupedCanceledTransactions[year] = sortTransactionsByDate(groupedCanceledTransactions[year]);
  }
  
  // Vypíše výsledok do konzoly
  console.log(groupedCanceledTransactions);