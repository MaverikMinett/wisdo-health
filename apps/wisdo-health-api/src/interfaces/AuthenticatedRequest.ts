import { Request } from "express";
import { Auth } from "./Auth";

export interface AuthenticatedRequest extends Request {
  auth: Auth
}