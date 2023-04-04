window.onload = () => {
  const fetchData = async (symbol) => {
    try {
        const response = await fetch(`http://localhost:3001/api/stock/${symbol}`);
        const data = await response.json();
        displayStockData(data, symbol);
    } catch (error) {
        console.error('error fetching data', error);
    }
  };
  const displayStockData = (data, symbol) => {
      const stockDataContainer = document.getElementById('stock-data');
      stockDataContainer.innerHTML = '';

      const timeSeries = data['Time Series (5min)'];
      const latestTimestamp = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTimestamp];

      const stockSymbol = document.createElement('h2');
      stockSymbol.innerText = `Stock Symbol: ${symbol}`;
      stockDataContainer.appendChild(stockSymbol);

      const stockTimestamp = document.createElement('p');
      stockTimestamp.innerText = `Latest Timestamp: ${latestTimestamp}`;
      stockDataContainer.appendChild(stockTimestamp);

      const stockOpen = document.createElement('p');
      stockOpen.innerText = `Open: ${latestData['1. open']}`;
      stockDataContainer.appendChild(stockOpen);

      const stockHigh = document.createElement('p');
      stockHigh.innerText = `High: ${latestData['2. high']}`;
      stockDataContainer.appendChild(stockHigh);

      const stockLow = document.createElement('p');
      stockLow.innerText = `Low: ${latestData['3. low']}`;
      stockDataContainer.appendChild(stockLow);

      const stockClose = document.createElement('p');
      stockClose.innerText = `Close: ${latestData['4. close']}`;
      stockDataContainer.appendChild(stockClose);

      
      setTimeout(() => {
        stockDataContainer.classList.add('visible');
    }, 50);
  };

  const handleButtonClick = () => {
    const stockSymbolInput = document.getElementById('stock-symbol');
    const symbol = stockSymbolInput.value.trim().toUpperCase();

    if (symbol) {
        fetchData(symbol);
    } else {
        alert('Please enter a stock symbol');
    }
  };
  
  const button = document.getElementById('fetch-data-button');
  button.addEventListener('click', handleButtonClick);

  const form = document.getElementById('stock-symbol-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    handleButtonClick();
  });
}