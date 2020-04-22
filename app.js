const calcGrowth = (pastVal, curVal) => ((curVal - pastVal) / pastVal) * 100;
const calcDecline = (pastVal, curVal) => ((pastVal - curVal) / pastVal) * 100;

const getBitcoinValue = function() {
  // this function is returning promise
  return fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
};

let valueToday = 0;

const nowInput = document.querySelector(".price__input--now");

nowInput.value = valueToday;

getBitcoinValue()
  .then(data => {
    return data.json();
  })
  .then(value => {
    valueToday = parseFloat(value.bpi.USD.rate.replace(/,/g, ""));

    nowInput.value = valueToday;
  });

document.querySelector(".investment__btn").addEventListener("click", () => {
  const btcusdbought = document.querySelector(".price__input--bought").value;
  const btcusdnow = document.querySelector(".price__input--now").value;

  const btc = document.querySelector(".investment__btc").value;

  const invested = btc * btcusdbought;
  const current = btc * btcusdnow;
  const profit = current - invested;
  const loss = invested - current;

  const growth = calcGrowth(invested, current);
  const decline = calcDecline(invested, current);

  let message = "";
  const result = document.querySelector(".result");

  if (profit > 0) {
    message = `Great! you made a profit of $${profit} (${growth}%)`;
    result.style.color = "green";
  } else if (profit < 0) {
    message = `Oh no! you are at a loss of $${loss} (${decline}%)`;
    result.style.color = "red";
  } else {
    message = "you are breaking even";
  }
  result.textContent = message;
});
