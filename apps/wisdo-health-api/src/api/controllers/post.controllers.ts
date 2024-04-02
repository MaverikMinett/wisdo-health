
import { Request, Response } from "express"

export const createPostController = async (req: Request, res: Response) => {
  res.status(200).send();
}