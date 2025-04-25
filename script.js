document.getElementById('btnBuscar').addEventListener('click', buscarPrevisao);

async function buscarPrevisao() {
  const signo = document.getElementById("signo").value;
  const resultado = document.getElementById("resultado");

  if (!signo) {
    resultado.innerText = "Por favor, selecione um signo.";
    return;
  }

  resultado.innerText = "Consultando a previsão...";

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/horoscope?zodiac=${signo}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'be6gdp4tJHELeyYIXtBLbw==6pC27PkVO9p8GfA8',
      },
    });

    const data = await response.json();

    if (data && data.horoscope) {
      // Traduzindo a resposta para português
      const horoscopeInPortuguese = await traduzirTexto(data.horoscope);
      resultado.innerHTML = `
        <p><strong>Previsão:</strong> ${horoscopeInPortuguese}</p>
      `;
    } else {
      resultado.innerText = "Não foi possível encontrar a previsão.";
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    resultado.innerText = "Erro ao buscar a previsão. Tente novamente mais tarde.";
  }
}

// Função para traduzir o texto para português
async function traduzirTexto(texto) {
  try {
    const respostaTraducao = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`);
    const dadosTraducao = await respostaTraducao.json();
    return dadosTraducao.responseData.translatedText;
  } catch (error) {
    console.error("Erro na tradução:", error);
    return texto;  // Se falhar, retorna o texto original
  }
}