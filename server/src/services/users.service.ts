import { EntityRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { UserEntity } from "@entities/users.entity";
import { HttpException } from "@/exceptions/httpException";
import { User } from "@interfaces/users.interface";
import { UserRepository } from "@/repository/user.repository";
import { Bcrypt } from "@/utils/bcrypt";
import { Token } from "@/interfaces/tokens.interface";
import { TokenRepository } from "@/repository/token.repository";
import { Utils } from "@/utils/utils";
import { GetProfile } from "@/interfaces/getProfile.interface";

@Service()
@EntityRepository()
export class UserService extends Repository<UserEntity> {
  // find all users
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserRepository.findAll();
    return users;
  }

  // find single users
  public async findUser(key: object): Promise<User> {
    console.log("findUser");
    const findUser: User = await UserRepository.findOne(key);
    console.log(findUser);
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }

  // create user
  public async createUser(userData: User): Promise<User> {
    const findUserEmail: User = await UserRepository.findOne({
      email: userData.email,
    });
    if (findUserEmail) {
      throw new HttpException(
        409,
        `the user with email ${userData.email} already exists`,
      );
    }

    const findUserPhone: User = await UserRepository.findOne({
      phone: userData.phone,
    });

    if (findUserPhone) {
      throw new HttpException(
        409,
        `the user with phone number ${userData.phone} already exists`,
      );
    }

    const hashedPassword = await Bcrypt.encryptPassword(userData.password);
    const createUserData: User = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  // verify user
  public async verifyUser({ email, value }): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: email,
    });

    if (!findUser) throw new HttpException(404, "User doesn't exist");
    if (findUser.isVerified === true)
      throw new HttpException(401, "User is already verified");

    const findToken: Token = await TokenRepository.findOneToken({
      userId: findUser.id,
      purpose: "verify-email",
    });

    if (!findToken) throw new HttpException(404, "Token not found");

    if (new Date() > findToken.expires_in) {
      throw new HttpException(401, "Email Verification token expired");
    } else if (value !== findToken.value) {
      throw new HttpException(401, "Invalid Verification token");
    }
    const verified_account: User = await UserRepository.update(findUser.id, {
      isVerified: true,
    });

    return verified_account;
  }

  // resend verification
  public async resendVerification(email): Promise<Token> {
    const findUser: User = await UserRepository.findOne({ email: email });

    if (!findUser) throw new HttpException(404, "User doesn't exist");

    if (findUser.isVerified === true)
      throw new HttpException(401, "User is already verified");

    const newVerificationToken: string = Utils.generateOTP();
    const newVerificationTime: Date = Utils.generateVerificationTime(
      new Date(),
      5,
    );

    const findToken: Token = await TokenRepository.findOneToken({
      userId: findUser.id,
      purpose: "verify-email",
    });

    let newToken: Token;

    if (!findToken) {
      newToken = await TokenRepository.createToken({
        purpose: "verify-email",
        expires_in: newVerificationTime,
        value: newVerificationToken,
        userId: findUser.id,
      });
    } else {
      newToken = await TokenRepository.updateToken(findToken.id, {
        purpose: "verify-email",
        expires_in: newVerificationTime,
        value: newVerificationToken,
        userId: findUser.id,
      });
    }

    return newToken;
  }

  // user login
  public async loginUser({ email, password }): Promise<User> {
    const findUser: User = await UserRepository.findOne({
      email: email,
    });

    if (!findUser) throw new HttpException(404, "User doesn't exist");

    if (findUser.isVerified === false)
      throw new HttpException(401, "User is not verified");

    const isPasswordMatching: boolean = await Bcrypt.comparePassword(
      password,
      findUser.password,
    );

    if (!isPasswordMatching) throw new HttpException(40, "Incorrect Password");

    return findUser;
  }

  // forgot password
  public async forgotPassword({ email }): Promise<User> {
    const findUser: User = await UserRepository.findOne({ email: email });

    if (!findUser) throw new HttpException(404, "User doesn't exist");
    else if (findUser.isVerified === false)
      throw new HttpException(401, "User is not verified");

    return findUser;
  }

  // reset password
  public async resetPassword({
    email,
    password,
    password_reset_token,
    decoded,
  }): Promise<User> {
    if (!decoded) {
      throw new HttpException(404, "Jwt not found");
    } else if (decoded.email !== email) {
      throw new HttpException(401, "Invalid Jwt, email doesn't match.");
    }
    const findUser: User = await UserRepository.findOne({ email });
    if (!findUser) {
      throw new HttpException(404, "Email not registered.");
    }
    if (!findUser.isVerified) {
      throw new HttpException(401, "Email not verified");
    }

    const resetToken: Token = await TokenRepository.findOneToken({
      userId: decoded.userId,
      purpose: "reset-password",
    });

    if (!resetToken) {
      throw new HttpException(400, "Password reset token not generated.");
    } else if (new Date() > resetToken.expires_in) {
      throw new HttpException(401, "Reset token expired");
    } else if (password_reset_token !== resetToken.value) {
      throw new HttpException(401, "Invalid password reset token");
    }

    const hashedPassword: string = await Bcrypt.encryptPassword(password);
    const updatePassword: User = await UserRepository.update(findUser.id, {
      password: hashedPassword,
    });

    const deleteToken = await TokenRepository.deleteToken(
      findUser.id,
      "reset-password",
    );
    console.log(deleteToken);
    if (!deleteToken) {
      throw new HttpException(401, "Token deletion error");
    }
    return updatePassword;
  }

  // get profile
  public async getProfile(decoded, user_id): Promise<GetProfile | User> {
    const findUser: User = await UserRepository.findOne({ user_id });
    if (!findUser) {
      throw new HttpException(404, "User doesn't exist");
    }
    if (!findUser.isVerified) {
      throw new HttpException(401, "Email not verified");
    }

    const user: GetProfile = {
      id: findUser.id,
      email: findUser.email,
      phone: findUser.phone,
      name: findUser.name,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
    };
    if (decoded.type === "admin" || decoded.userId == user_id) {
      return findUser;
    }
    return user;
  }

  // update user
  public async updateUser(userId: number, userData: User): Promise<User> {
    const findUser: User = await UserRepository.findOne({ id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const updateUser: User = await UserRepository.update(userId, userData);
    return updateUser;
  }

  // delete user
  public async deleteUser(email: string): Promise<User> {
    const findUser: User = await UserEntity.findOne({ email });
    if (!findUser) throw new HttpException(404, "User doesn't exist");
    await UserRepository.delete({ id: findUser.id });
    return findUser;
  }
}
