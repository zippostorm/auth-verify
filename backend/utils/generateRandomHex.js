import crypto from "crypto";

export const generateRandomHex = (size) =>
  Array.from(crypto.getRandomValues(new Uint8Array(size)))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
