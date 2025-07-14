import { Response } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { v4 as uuidv4 } from "uuid";

export const generateFormToken = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found in request" });
    }

    const user = req.user;
    const formToken = uuidv4();
    user.formToken = formToken;
    await user.save();

    res.status(200).json({ formToken });
  } catch (error) {
    console.error("Error to generate formToken:", error);
    res.status(500).json({ message: "Error to generate formToken", error });
  }
};

// Obtener formToken
export const getFormToken = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found in request" });
    }

    const user = req.user;

    if (user.formToken) {
      return res.status(200).json({ formToken: user.formToken });
    } else {
      return res
        .status(404)
        .json({ message: "Error getting form token, not found" });
    }
  } catch (error) {
    console.error("Error getting formToken:", error);
    res.status(500).json({ message: "Error getting formToken", error });
  }
};

// Eliminar formToken
export const deleteFormToken = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found in request" });
    }

    const user = req.user;
    user.formToken = "";
    await user.save();

    res.status(200).json({ message: "formToken deleted" });
  } catch (error) {
    console.error("Error to delete formToken:", error);
    res.status(500).json({ message: "Error to delete formToken", error });
  }
};
