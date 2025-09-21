// Fetch currency list and populate dropdowns
window.onload = () => {
  fetch('https://api.frankfurter.app/currencies')
    .then(res => res.json())
    .then(data => {
      const fromSelect = document.getElementById('from-currency');
      const toSelect = document.getElementById('to-currency');

      for (let currency in data) {
        let option1 = document.createElement('option');
        option1.value = currency;
        option1.text = `${currency} - ${data[currency]}`;
        fromSelect.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = currency;
        option2.text = `${currency} - ${data[currency]}`;
        toSelect.appendChild(option2);
      }

      fromSelect.value = 'INR';
      toSelect.value = 'USD';
    });
};

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  const resultDiv = document.getElementById("result");
  const datePara = document.getElementById("updated-date");
  const loader = document.getElementById("loader");

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "Please enter a valid amount!";
    return;
  }

  if (from === to) {
    resultDiv.innerText = "Please choose different currencies!";
    return;
  }

  loader.style.display = "block";
  resultDiv.innerText = "";
  datePara.innerText = "";

  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      const converted = data.rates[to];
      loader.style.display = "none";
      resultDiv.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
      datePara.innerText = `Last updated on: ${data.date}`;
    })
    .catch(() => {
      loader.style.display = "none";
      resultDiv.innerText = "Something went wrong. Try again.";
    });
}

function resetFields() {
  document.getElementById("amount").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("updated-date").innerText = "";
  document.getElementById("loader").style.display = "none";
}
