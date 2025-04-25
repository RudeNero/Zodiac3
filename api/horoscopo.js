export default async function handler(req, res) {
  const { signo } = req.query;

  if (!signo) {
    return res.status(400).json({ error: "Signo é obrigatório" });
  }

  const url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=TODAY`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { accept: "application/json" }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro na requisição à nova API" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados da nova API" });
  }
}