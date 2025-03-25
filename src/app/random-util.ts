export class RandomUtil {
  public static getSecureRandomNumber(max: number) {
    // Get a random 32-bit unsigned integer
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const randomInt = array[0];

    // Convert to decimal between 0 and 1
    const MAX_32_BIT = 0xffffffff + 1;  // 2^32
    const randomDecimal = randomInt / MAX_32_BIT;

    // Scale to our range and shift to 1-based
    return Math.floor(randomDecimal * max);
  }
}
