import { getRepository, Repository } from "typeorm";
import { User } from "@/interfaces/users.interface";
import { UserEntity } from "@/entities/users.entity";

export class UserRepository extends Repository<User> {
  static async findAll(): Promise<User[]> {
    return await getRepository(UserEntity).find();
  }
  static async findOne(key: object): Promise<User> {
    return await getRepository(UserEntity).findOne({ where: key });
  }

  static async create(key: object): Promise<User> {
    return await getRepository(UserEntity).save(key);
  }

  static async update(id: number, key: object): Promise<User> {
    await getRepository(UserEntity).update(id, key);
    const updatedUser: User = await getRepository(UserEntity).findOne(id);
    return updatedUser;
  }

  static async softDelete(id: number): Promise<User> {
    const deletedUser: User = await getRepository(UserEntity).findOne(id);
    await getRepository(UserEntity).softDelete(deletedUser.id);
    return deletedUser;
  }

  static async delete(key: object): Promise<User> {
    const deletedUser: User = await getRepository(UserEntity).findOne({
      where: key,
    });
    if (!deletedUser) return null;
    await getRepository(UserEntity).delete(deletedUser.id);
    return deletedUser;
  }
}
