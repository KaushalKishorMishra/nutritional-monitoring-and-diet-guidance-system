import { TokenEntity } from "@/entities/tokens.entity";
import { Token } from "@/interfaces/tokens.interface";
import { getRepository, Repository } from "typeorm";

export class TokenRepository extends Repository<Token> {
  static async findAllToken(key: object): Promise<Token[]> {
    return await getRepository(TokenEntity).find({ where: key });
  }

  static async findOneToken(key: object): Promise<Token> {
    const token = await getRepository(TokenEntity).findOne({
      where: key,
    });
    if (token) {
      return token;
    }
    return null;
  }

  static async createToken(tokenData: Token): Promise<Token> {
    return await getRepository(TokenEntity).save(tokenData);
  }

  static async updateToken(id: number, key: object): Promise<Token> {
    await getRepository(TokenEntity).update(id, key);
    const updatedToken: Token = await getRepository(TokenEntity).findOne(id);
    return updatedToken;
  }

  static async deleteToken(
    id: number,
    purpose: string,
  ): Promise<Token | boolean> {
    // const deletedToken: Token = await getRepository(TokenEntity).findOne(id);
    if (await getRepository(TokenEntity).delete({ id, purpose })) {
      return true;
    }
    return false;
  }
}
