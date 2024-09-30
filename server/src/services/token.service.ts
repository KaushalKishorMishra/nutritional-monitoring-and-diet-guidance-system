import { TokenEntity } from "@/entities/tokens.entity";
import { Token } from "@/interfaces/tokens.interface";
import { TokenRepository } from "@/repository/token.repository";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";

@Service()
@EntityRepository()
export class TokenService extends Repository<TokenEntity> {
  // finds all the tokens
  public async getTokens({}): Promise<Token[]> {
    const tokens: Token[] = await TokenRepository.findAllToken({});
    return tokens;
  }

  public async getUserToken({ tokenId, tokenPurpose }): Promise<Token> {
    const token: Token = await TokenRepository.findOneToken({
      token: tokenId,
      purpose: tokenPurpose,
    });
    return token;
  }

  public async createToken(tokenData: Token): Promise<Token> {
    const createTokenData: Token = await TokenRepository.createToken({
      ...tokenData,
    });
    return createTokenData;
  }
}
