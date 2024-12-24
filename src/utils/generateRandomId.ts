export function generateRandomId() {
    const randomBytes =
        typeof window !== 'undefined'
            ? crypto.getRandomValues(new Uint8Array(4)) // Browser/Edge runtime
            : require('crypto').randomBytes(4); // Node.js runtime

    // Convert the random bytes to an 8-character decimal number
    const randomNumber = Array.from(randomBytes)
        .map((byte: any) => byte.toString(10).padStart(3, '0')) // Convert each byte to a string
        .join(''); // Join them to form a large number

    return randomNumber.slice(0, 8); // Ensure it's exactly 8 characters
}

export default generateRandomId;
