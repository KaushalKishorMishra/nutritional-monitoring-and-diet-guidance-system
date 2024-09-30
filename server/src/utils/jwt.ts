import * as jwt from "jsonwebtoken";

export class Jwt {
  static signJwt(payload: Record<string, any>, expiresIn = "10d"): string {
    const token: string = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: expiresIn,
      issuer: "event-management-system",
    });
    return token;
  }

  static verifyJwt(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
        } else if (!decoded) {
          const error = new Error("Invalid JsonWebToken");
          (error as any).errorStatus = 401;
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
