import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import {
  CreateUserDto,
  LoginUserDto,
  ResendVerificationDto,
  TargetNutrients,
  VectorQuery,
  VerifyUserDto,
} from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { AuthorizationMiddleware } from "@/middlewares/authorization.middleware";

export class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      // AuthorizationMiddleware.authorization,
      // AuthorizationMiddleware.adminAuthorization,
      this.user.getUsers,
    );
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);

    this.router.get(
      `${this.path}/verify-jwt`,
      AuthorizationMiddleware.authorization,
      this.user.verifyJwt,
    );

    this.router.post(
      // create user
      `${this.path}/signup`,
      ValidationMiddleware(CreateUserDto),
      this.user.createUser,
    );
    this.router.patch(
      // update user
      `${this.path}/:id(\\d+)`,
      ValidationMiddleware(CreateUserDto, true),
      AuthorizationMiddleware.authorization,
      this.user.updateUser,
    );
    this.router.delete(
      // delete user
      `${this.path}/delete`,
      this.user.deleteUser,
    );

    this.router.delete(
      // delete user by id
      `${this.path}/delete/confirm-delete-user`,
      AuthorizationMiddleware.authorization,
      this.user.confirmDeleteUser,
    );

    this.router.post(
      // login user
      `${this.path}/login`,
      ValidationMiddleware(LoginUserDto),
      this.user.loginUser,
    );
    this.router.patch(
      // verify user
      `${this.path}/verify-user`,
      ValidationMiddleware(VerifyUserDto),
      this.user.verifyUser,
    );

    this.router.patch(
      // resend verification
      `${this.path}/resend-verification`,
      ValidationMiddleware(ResendVerificationDto),
      this.user.resendVerification,
    );

    // get profile
    this.router.get(
      `${this.path}/profile`,
      ValidationMiddleware(VerifyUserDto),
      this.user.getProfile,
    );

    // forgot password
    this.router.post(
      `${this.path}/forgot-password`,
      ValidationMiddleware(ResendVerificationDto),
      this.user.forgotPassword,
    );

    // reset password
    this.router.patch(
      `${this.path}/reset-password`,
      AuthorizationMiddleware.authorization,
      ValidationMiddleware(LoginUserDto),
      this.user.resetPassword,
    );

    this.router.post(
      `${this.path}/calculate-target-nutrients`,
      ValidationMiddleware(TargetNutrients),
      this.user.calculateTargetNutrients,
    );
    
    this.router.post(
      `${this.path}/vector-query`,
      ValidationMiddleware(VectorQuery),
      this.user.vectorQuery,
    );
    
    this.router.get(
      `${this.path}/food/:id`,
      this.user.findFoodById,
    );

    this.router.post(
      `${this.path}/get-recommendation`,
      this.user.getRecommendation,
    );
  }
}
