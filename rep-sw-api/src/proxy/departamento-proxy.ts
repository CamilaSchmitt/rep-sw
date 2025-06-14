import { Request, Response } from "express";

export const departamentoProxy = async (req: Request, res: Response) => {
  const targetUrl = `http://localhost:3004/departamentos${req.url.replace(/^\/rep\/departamentos/, "")}`;
  console.log("Repassando requisição para:", targetUrl);

  try {
    const body = ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body);

    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headers[key] = value;
      } else if (Array.isArray(value)) {
        headers[key] = value.join(", ");
      }
    }

    delete headers["content-length"];
    headers["content-type"] = "application/json";

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
    res.status(500).json({ error: "Erro ao processar proxy para departamento-service" });
  }
};
