export const refreshTokens: string[] = [];

export function removeRefreshToken(token: string) {
    const index = refreshTokens.indexOf(token);
    if (index > -1) refreshTokens.splice(index, 1);
}
