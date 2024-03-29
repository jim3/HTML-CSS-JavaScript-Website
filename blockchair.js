const API = "https://api.blockchair.com/bitcoin/stats";

window.addEventListener("load", (event) => {
  event.preventDefault();
  getMarketPrice();
});

function currencyFormatter(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function percentageFormatter(value) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value);
}

async function getMarketPrice() {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    const marketPrice = document.querySelector("#market_price_usd");
    marketPrice.innerHTML = currencyFormatter(`${data.data.market_price_usd}`);
    const marketPriceChange = document.querySelector("#market_price_usd_change_24h_percentage");
    marketPriceChange.innerHTML = percentageFormatter(`${data.data.market_price_usd_change_24h_percentage / 100}`);
    const avgTransactionFee = document.querySelector("#average_transaction_fee_usd_24h");
    avgTransactionFee.innerHTML = currencyFormatter(`${data.data.average_transaction_fee_usd_24h}`);
    const marketDominance = document.querySelector("#market_dominance_percentage");
    marketDominance.innerHTML = percentageFormatter(`${data.data.market_dominance_percentage / 100}`);
    const circulation = document.querySelector("#circulation");
    circulation.innerHTML = currencyFormatter(`${data.data.circulation}`);

    setTimeout(getMarketPrice, 60000);
  } catch (error) {
    console.error(`Could not fetch data: ${error}`);
  }
}
