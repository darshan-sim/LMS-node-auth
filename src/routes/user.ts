import express from "express";
import { getUser, getAllUsers, deleteUser, updateUser } from "../controller/user";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.delete("/:id/delete", deleteUser);

router.put("/:id/update", updateUser);

export default router;