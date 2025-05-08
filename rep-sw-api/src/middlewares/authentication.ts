import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isTokenBlacklisted } from "../services/blacklist";

dotenv.config();

const hasAuthentication: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Token não fornecido." });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.TOKEN_KEY) {
        res.status(500).json({ message: "Chave de token não configurada." });
        return;
    }

    if (isTokenBlacklisted (token)) {
        res.status(401).json({ message: "Token inválido (logout)." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // req.user = decoded; // opcional: você pode guardar o payload do token
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

export default {
    hasAuthentication
};