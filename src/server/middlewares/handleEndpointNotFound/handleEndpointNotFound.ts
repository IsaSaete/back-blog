import { NextFunction, Request, Response } from "express";
import ServerError from "../../ServerError/ServerError.js";

const handleEndpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError(404, "Endpoint not found");

  next(error);
};

export default handleEndpointNotFound;
