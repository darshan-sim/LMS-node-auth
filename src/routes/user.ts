import express from "express";
import { getUser, getAllUsers, deleteUser, updateUser } from "../controller/user";
import { verifyJWT } from "../middleware/auth";
import { authorizedRoles, authorizeSelfOrRole } from "../middleware/roleAuth";

const router = express.Router();

router.get("/", verifyJWT, authorizedRoles("ADMIN", "MANAGER"), getAllUsers);

router.get("/:id", verifyJWT, authorizeSelfOrRole("ADMIN", "MANAGER"), getUser);

router.delete("/:id/delete", authorizeSelfOrRole("ADMIN"), verifyJWT, deleteUser);

router.put("/:id/update", verifyJWT, authorizeSelfOrRole("ADMIN"), updateUser);

export default router;