import { Request, Response } from "express";

export const jornadaProxy = async (req: Request, res: Response) => {
  const targetUrl = `http://localhost:3003/jornadas${req.url.replace(/^\/rep\/jornadas/, "")}`;
  console.log("Repassando requisição para:", targetUrl);

  try {
    // Verifica e usa o body, se for aplicável
    const body = ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body);

    // Monta headers
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headers[key] = value;
      } else if (Array.isArray(value)) {
        headers[key] = value.join(", ");
      }
    }

    delete headers["content-length"]; // evita conflito
    headers["content-type"] = "application/json"; // força o correto

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const responseBody = Buffer.from(await response.arrayBuffer());
    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(responseBody);
  } catch (error) {
    console.error("Erro no proxy:", error);
    res.status(500).json({ error: "Erro ao processar proxy para jornada-service" });
  }
};
