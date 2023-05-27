const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
let cryptoData = [];

function fetchData() {
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      cryptoData = data;
      renderTable();
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function renderTable() {
  const tableBody = document.querySelector('#cryptoTable tbody');
  tableBody.innerHTML = '';

  cryptoData.forEach(crypto => {
    const { name, symbol, image, current_price, total_volume, market_cap, price_change_percentage } = crypto;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${image}" alt="${name}" style="width: 50px;"></td>
      <td>${name}</td>
      <td>${symbol}</td>
      <td>$${current_price}</td>
      <td>$${total_volume}</td>
      <td>${formatPercentageChange(price_change_percentage)}</td>
      <td>Mkt Cap: $${market_cap.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

function filterData(searchTerm) {
  const filteredData = cryptoData.filter(crypto => {
    return crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
  });
  renderFilteredTable(filteredData);
}

function renderFilteredTable(filteredData) {
  const tableBody = document.querySelector('#cryptoTable tbody');
  tableBody.innerHTML = '';

  filteredData.forEach(crypto => {
    const { name, symbol, image, current_price, total_volume, market_cap, price_change_percentage } = crypto;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${image}" alt="${name}" style="width: 50px;"></td>
      <td>${name}</td>
      <td>${symbol}</td>
      <td>$${current_price}</td>
      <td>$${total_volume}</td>
      <td>${formatPercentageChange(price_change_percentage)}</td>
      <td>Mkt Cap: $${market_cap.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

function sortDataBy(key) {
  const sortedData = cryptoData.slice().sort((a, b) => {
    if (key === 'marketCap') {
      return b.market_cap - a.market_cap;
    } else if (key === 'percentageChange') {
      return b.price_change_percentage - a.price_change_percentage;
    }
  });
  renderFilteredTable(sortedData);
}

function formatPercentageChange(percentage) {
  if (typeof percentage === 'number') {
    return `${percentage.toFixed(2)}%`;
  } else if (typeof percentage === 'string') {
    const numericValue = parseFloat(percentage);
    if (!isNaN(numericValue)) {
      return `${numericValue.toFixed(2)}%`;
    }
  }
  return 'N/A';
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  filterData(searchTerm);
});

fetchData();




