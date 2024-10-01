import * as bcrypt from "bcrypt";

export class Bcrypt {
  static encryptPassword(plainText: string): Promise<string> {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainText, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }

  static comparePassword(
    plainText: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(plainText, hashedPassword, (err, result) => {
        if (err) reject(err);
        else if (!result)
          reject(new Error("Username and password doesn't match"));
        resolve(true);
      });
    });
  }
}
