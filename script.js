
const apiKey = "5ad59fa0584c686358d9fa27445642d7";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const temp = data.main.temp;
        document.getElementById("result").innerText = `Temperatura em ${city}: ${temp}°C`;
        saveHistory(city);
      } else {
        document.getElementById("result").innerText = "Cidade não encontrada.";
      }
    })
    .catch(error => {
      document.getElementById("result").innerText = "Erro ao buscar dados.";
    });
}

function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("history", JSON.stringify(history));
    updateHistoryList(history);
  }
}

function updateHistoryList(history) {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach(city => {
    const li = document.createElement("li");
    li.innerText = city;
    list.appendChild(li);
  });
}

updateHistoryList(JSON.parse(localStorage.getItem("history")) || []);
