import { HttpException } from "@/exceptions/httpException";
import { Payload } from "@/interfaces/payload.interface";
import { Jwt } from "@/utils/jwt";

export class AuthorizationMiddleware {
  static async authorization(req, res, next) {
    const header_auth = req.headers.authorization;
    // bearer <token>
    const token = header_auth ? header_auth.slice(7) : null;
    // alternative
    // const token = header_auth.split(' ')[1]
    try {
      const decoded: Payload = await Jwt.verifyJwt(token);
      req.body.decoded = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }

  static async adminAuthorization(req, res, next) {
    try {
      if (req.body.decoded.role !== "admin") {
        throw new HttpException(401, "Unauthorized User");
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}
