async function buscarPrevisao() {
  const signo = document.getElementById("signo").value;
  const resultado = document.getElementById("resultado");

  if (!signo) {
    resultado.innerText = "Por favor, selecione um signo.";
    return;
  }

  resultado.innerText = "Consultando os astros... ✨";

  try {
    const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=TODAY`);

    if (!res.ok) throw new Error("Erro na API");

    const data = await res.json();

    resultado.innerHTML = `
      <p><strong>${data.date}</strong></p>
      <p>${data.horoscope}</p>
    `;
  } catch (err) {
    resultado.innerText = "Erro ao buscar a previsão.";
    console.error("Erro:", err);
  }
}