export function generateRandomObjectName(prefix: string) {
    return `${prefix}_${Date.now().toString(36)}-${crypto.randomUUID()}`;
}
