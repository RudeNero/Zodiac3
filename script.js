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
      let horoscope = await traduzirTexto(data.horoscope);

      // Correção para "Leo" virar "Leão"
      if (signo === "leo") {
        horoscope = horoscope.replace(/\bLeo\b/gi, "Leão");
      }

      resultado.innerHTML = `
        <p><strong>Previsão:</strong> ${horoscope}</p>
      `;
    } else {
      resultado.innerText = "Não foi possível encontrar a previsão.";
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    resultado.innerText = "Erro ao buscar a previsão. Tente novamente mais tarde.";
  }
}

// Função para dividir o texto em partes menores respeitando palavras
function dividirTexto(texto, limite) {
  const palavras = texto.split(' ');
  const partes = [];
  let parteAtual = '';

  for (const palavra of palavras) {
    if ((parteAtual + palavra).length > limite) {
      partes.push(parteAtual.trim());
      parteAtual = '';
    }
    parteAtual += palavra + ' ';
  }
  if (parteAtual.trim().length > 0) {
    partes.push(parteAtual.trim());
  }
  return partes;
}

// Função para traduzir o texto para português em partes seguras
async function traduzirTexto(texto) {
  try {
    const partes = dividirTexto(texto, 400); // Dividimos em pedaços seguros para a API
    let traducaoFinal = '';

    for (const parte of partes) {
      const resposta = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(parte)}&langpair=en|pt`);
      const dados = await resposta.json();
      traducaoFinal += dados.responseData.translatedText + ' ';
    }

    return traducaoFinal.trim();
  } catch (error) {
    console.error("Erro na tradução:", error);
    return texto; // Se a tradução falhar, retorna o original
  }
}
function criarEstrelas() {
  const estrelasContainer = document.getElementById('estrelas');

  for (let i = 0; i < 80; i++) { // 🌟 Mais estrelas para preencher melhor
    const estrela = document.createElement('div');
    estrela.classList.add('estrela');
    estrela.style.left = Math.random() * window.innerWidth + 'px';
    estrela.style.top = Math.random() * -window.innerHeight + 'px';
    estrela.style.animationDuration = (Math.random() * 5 + 7) + 's'; // entre 7s e 12s
    estrela.style.opacity = Math.random();
    estrela.style.width = Math.random() * 2 + 1 + 'px'; // tamanhos variados
    estrela.style.height = estrela.style.width;
    estrelasContainer.appendChild(estrela);
  }
}

criarEstrelas();
