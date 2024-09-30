import { PayloadPurpose } from "@/enums/payload.enum";
import { UserRole } from "@/enums/users.enum";
import { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
  userId: number;
  email: string;
  role: UserRole;
  purpose: PayloadPurpose;
}
