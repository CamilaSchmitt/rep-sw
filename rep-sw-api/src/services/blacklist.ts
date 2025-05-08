const blacklist = new Set<string>();

export function addToBlacklist(token: string) {
    blacklist.add(token);
}

export function isTokenBlacklisted(token: string): boolean {
    return blacklist.has(token);
}
