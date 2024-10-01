import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { User } from "@interfaces/users.interface";
import { UserService } from "@services/users.service";
import { UserRepository } from "@/repository/user.repository";
import { Token } from "@/interfaces/tokens.interface";
import { Utils } from "@/utils/utils";
import { TokenRepository } from "@/repository/token.repository";
import { TokenService } from "@/services/token.service";
import { HttpException } from "@/exceptions/httpException";
import { NodeMailer } from "@/utils/nodeMailer";
import { Payload } from "@/interfaces/payload.interface";
import { PayloadPurpose } from "@/enums/payload.enum";
import { Jwt } from "@/utils/jwt";
import { UserRole } from "@/enums/users.enum";
import { GetProfile } from "@/interfaces/getProfile.interface";
import { Bcrypt } from "@/utils/bcrypt";
import { FRONTEND_URL } from "@/config";
import { calculateNutrientsFromCalorie } from "@/utils/nutrition-utils";
import { queryVectors } from "@/utils/pinecone";

export class UserController {
  public user = Container.get(UserService);
  public token = Container.get(TokenService);

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUser({ userId });
      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public findUserByJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const decoded: Payload = req.body.decoded;
      const findUserByJwtData: User = await this.user.findUser({
        email: decoded.email,
      });
      res.status(200).json({ data: findUserByJwtData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      // user.service to save user data to database is called
      // repository is not called here rather called in service
      const createUserData: User = await this.user.createUser(userData);

      const tokenData: Token = {
        purpose: "verify-email",
        expires_in: Utils.generateVerificationTime(new Date(), 5),
        value: Utils.generateOTP(),
        userId: createUserData.id,
      };

      // token.service to create token and save to database
      const createToken: Token = await this.token.createToken(tokenData);

      if (!createToken) {
        throw new HttpException(409, `Token cant be created.`);
      }

      // send mail
      //  await NodeMailer.test()
      await NodeMailer.sendEmail({
        from: "restro-management@api.com",
        to: createUserData.email,
        subject: "Email Verification",
        text: `To verify your event management account use the OTP ${createToken.value}`,
        html: `<a href="${FRONTEND_URL}/users/verify-email">Click to verify ${createToken.value}</a>`,
      });

      res
        .status(201)
        .json({ data: createUserData, message: "Created user successfully." });
    } catch (error) {
      next(error);
    }
  };

  public verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, value } = req.body;

      const verifyUserData: User = await this.user.verifyUser({
        email,
        value,
      });
      res
        .status(200)
        .json({ data: verifyUserData, message: "Verified user successfully" });
    } catch (error) {
      next(error);
    }
  };

  public resendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      console.log(email);
      const resendVerificationData: Token =
        await this.user.resendVerification(email);

      if (resendVerificationData) {
        {
          // send mail
          await NodeMailer.sendEmail({
            from: "event-management@api.com",
            to: email,
            subject: "Email Verification",
            text: `To verify your event management account use the OTP ${resendVerificationData.value}`,
            html: `<a href="${FRONTEND_URL}/users/verify-email">Click to verify ${resendVerificationData.value}</a>`,
          });

          res.status(201).json({
            data: resendVerificationData,
            message: "Resend Verification successfully.",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const loginUserData: User = await this.user.loginUser({
        email,
        password,
      });

      //  payload
      const payload: Payload = {
        userId: loginUserData.id,
        email: loginUserData.email,
        role: loginUserData.role === "user" ? UserRole.USER : UserRole.ADMIN,
        purpose: PayloadPurpose.LOGIN,
      };

      const jwt = Jwt.signJwt(payload, "1m");
      res.status(200).json({
        status: 200,
        data: loginUserData,
        message: "Login successfully",
        jwt: jwt,
      });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      const forgotPasswordData: User = await this.user.forgotPassword({
        email,
      });

      const passwordResetToken: string = Utils.generateOTP();
      const passwordResetTime: Date = Utils.generateVerificationTime(
        new Date(),
        5,
      );

      const existingToken: Token[] = await TokenRepository.findAllToken({
        userId: forgotPasswordData.id,
      });

      if (existingToken) {
        for (const token of existingToken) {
          await TokenRepository.deleteToken(token.id, "reset-password");
        }
      }

      const newToken: Token = await TokenRepository.createToken({
        purpose: "reset-password",
        expires_in: passwordResetTime,
        value: passwordResetToken,
        userId: forgotPasswordData.id,
      });

      // send mail
      await NodeMailer.sendEmail({
        from: "event-management@api.com",
        to: forgotPasswordData.email,
        subject: "Email Verification",
        text: `To verify your event management account use the OTP ${newToken.value}`,
        html: `<a href="${FRONTEND_URL}/api/user/verify-email">Click to verify ${newToken.value}</a>`,
      });

      // payload
      const payload: Payload = {
        userId: forgotPasswordData.id,
        email: forgotPasswordData.email,
        role:
          forgotPasswordData.role === "user" ? UserRole.USER : UserRole.ADMIN,
        purpose: PayloadPurpose.RESET_PASSWORD,
      };

      const jwt = Jwt.signJwt(payload, "5m");

      res.status(201).json({
        status: 201,
        data: forgotPasswordData,
        message: "Password reset OTP sent successfully",
        jwt: jwt,
      });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password, password_reset_token } = req.body;
      const decoded = req.body.decoded;

      const passwordResetData: User = await this.user.resetPassword({
        email,
        password,
        password_reset_token,
        decoded,
      });

      // send mail
      await NodeMailer.sendEmail({
        from: "",
        to: email,
        subject: "Password Reset",
        text: `Your password has been reset successfully`,
        html: `<a href="${FRONTEND_URL}/users/verify-email">Click to verify</a>`,
      });

      res.status(200).json({
        status: 200,
        data: passwordResetData,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const decoded = req.body.decoded;
      const user_id = parseInt(req.params.user_id);
      const getProfileData: GetProfile | User = await this.user.getProfile(
        decoded,
        user_id,
      );
      res.status(200).json({
        status: 200,
        data: getProfileData,
        message: "Successfully get user profile",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({
        status: 200,
        data: updateUserData,
        message: "Updated user successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // const userId = Number(req.params.id);

      const { email, password } = req.body;

      const findUser: User = await this.user.findUser({ email });
      if (!findUser) throw new HttpException(404, "User doesn't exist");

      // const deleteUserData: User = await this.user.deleteUser(email, password);
      const checkPassword = await Bcrypt.comparePassword(
        password,
        findUser.password,
      );

      if (checkPassword === false)
        throw new HttpException(401, "Incorrect Password");

      const userDeletionToken = Utils.generateOTP();
      const userDeletionTokenTime = Utils.generateVerificationTime(
        new Date(),
        5,
      );

      await TokenRepository.deleteToken(findUser.id, "delete-account");

      const newToken: Token = await TokenRepository.createToken({
        purpose: "delete-account",
        expires_in: userDeletionTokenTime,
        value: userDeletionToken,
        userId: findUser.id,
      });

      if (!newToken) {
        throw new HttpException(409, `Token cant be created.`);
      }

      const payload: Payload = {
        userId: findUser.id,
        email: findUser.email,
        role: findUser.role == "admin" ? UserRole.ADMIN : UserRole.USER,
        purpose: PayloadPurpose.DELETE_USER,
      };

      const jwt = Jwt.signJwt(payload, "20m");

      await NodeMailer.sendEmail({
        from: "event-management@api.com",
        to: email,
        subject: "Deletion of User Account",
        text: `To confirm delete account use this OTP ${userDeletionToken}`,
        html: `<a href="${FRONTEND_URL}/users/confirm-delete-user">Click to reset password ${userDeletionToken}</a>`,
      });

      res.status(200).json({
        status: 200,
        data: findUser,
        message: "Account Deletion OTP sent",
        jwt: jwt,
        token: userDeletionToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public async confirmDeleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, user_delete_token } = req.body;
      const decoded: Payload = req.body.decoded;

      if (!decoded) throw new HttpException(404, "Token not found");
      else if (decoded.email !== email)
        throw new HttpException(401, "Invalid Token, email doesn't match.");

      const deleteToken = await TokenRepository.findOneToken({
        userId: decoded.userId,
        purpose: "delete-account",
      });

      if (!deleteToken) throw new HttpException(404, "Token not found");
      else if (new Date() > deleteToken.expires_in)
        throw new HttpException(401, "Token expired");
      else if (user_delete_token !== deleteToken.value)
        throw new HttpException(401, "Invalid Token");
      console.log(5);

      // await UserRepository.delete({ email });
      await UserRepository.softDelete(decoded.userId);
      console.log(6);

      await TokenRepository.deleteToken(deleteToken.id, "delete-account");
      console.log(7);

      res.status(200).json({
        status: 200,
        // data: findUser,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public verifyJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const decoded: Payload = req.body.decoded;
    try {
      if (decoded) {
        res.status(200).json({
          status: 200,
          data: decoded,
          message: "Jwt successfully verified",
          role: decoded.type,
          userId: decoded.userId,
          email: decoded.email,
        });
      } else {
        throw new HttpException(404, "Jwt not found");
      }
    } catch (error) {
      next(error);
    }
  };

  public calculateTargetNutrients = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const calorie = req.body.calorie || 2000;
    try {
      const nutrients = calculateNutrientsFromCalorie(calorie);
      res.status(200).json({
        message: "Target Nutrients Calculated",
        nutrients: nutrients,
      });
    } catch (error) {
      next(error);
    }
  };

  public vectorQuery = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const body = req.body;
    try {
      const vectorEmbedding = [
        body.carbohydrate || 0,
        body.total_fat || 0,
        body.cholesterol || 0,
        body.protein || 0,
        body.fiber || 0,
        body.sugars || 0,
      ];

      const queryResponse = await queryVectors(vectorEmbedding);

      res.status(200).json({
        message: "Vector Query successful",
        queryResponse,
      });
    } catch (error) {
      next(error);
    }
  };
}
