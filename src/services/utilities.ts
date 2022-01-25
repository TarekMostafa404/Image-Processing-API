import fs from 'fs';

class Utilities {
  public static isNumber(n: string): boolean {
    return !isNaN(Number(n));
  }

  public static async fileExists(path: string) {
    return !!(await fs.promises.stat(path).catch(() => false));
  }
}
export default Utilities;
