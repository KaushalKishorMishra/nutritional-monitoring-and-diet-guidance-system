import { Token } from "@/interfaces/tokens.interface";
import { TokenService } from "@/services/token.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class TokenController {
  public token = Container.get(TokenService);

  public getTokens = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllTokensData = await this.token.getTokens({});
      res.status(200).json({ data: findAllTokensData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tokenId = Number(req.params.id);
      const tokenPurpose: string = req.body;
      const findOneTokenData: Token = await this.token.getUserToken({
        tokenId,
        tokenPurpose,
      });

      if (!findOneTokenData) {
        res.status(404).json({ message: "Token not found" });
      }
      res
        .status(200)
        .json({ data: findOneTokenData, message: "find one token" });
    } catch (error) {
      next(error);
    }
  };

  public createToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tokenData: Token = req.body;
      const createTokenData: Token = await this.token.createToken(tokenData);
      if (!createTokenData) {
        res.status(500).json({ message: "Token creation failed" });
      }
      res
        .status(201)
        .json({ data: createTokenData, message: "Created token successfully" });
    } catch (error) {
      next(error);
    }
  };
}
