import HttpStatusCodes from "http-status-codes";
import { Request, Response, Router } from 'express';
import { authenticateUser, blockUser, checkIfBlocked, findUserAndUpdateLocation, findUsersFols, updateUserViewedFol } from '../../services/user';
import { findUserAndUpdateToken, findUserByLocation, findUserId, findUsersByEquipments, findUsersByLogin } from "../../repository/user";
import passport from 'passport';
import { IUser } from "../../interface/user";

const router: Router = Router();

router.get("/user", async (req: Request, res: Response) => {
  try {
    const foundUser = await findUsersByLogin(req.query.login)
    const blocked = await checkIfBlocked(req.body.login)
    if (blocked) return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "User is blocked" })
    if (!foundUser) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "User not found"
      })
    }

    return res.status(HttpStatusCodes.OK).json(foundUser)
  }
  catch (err) {
    console.log(err)
  }
});

router.patch("/user/block", async (req: Request, res: Response) => {
  try {
    const foundUser = await findUserId(req.query.id)

    if (!foundUser) return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "User not found" });

    const blockedUser = await blockUser(req.query.id);

    return res.status(HttpStatusCodes.OK).json(blockedUser)
  }
  catch (err) {
    console.log(err)
  }
});

router.post("/user/auth", async (req: Request, res: Response) => {
  try {
    const blocked = await checkIfBlocked(req.body.login)
    if (blocked) return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "User is blocked" })
    const jwtToken = await authenticateUser(req.body.login, req.body.password, req.body.country)

    if (jwtToken === 'userNotFound') {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "User not found"
      })
    }
    if (jwtToken === 'passwordIncorrect') {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        message: "Password is incorrect"
      })
    }

    if (req.body.pushToken) {
      findUserAndUpdateToken(req.body.login, req.body.pushToken)
    }
    if (req.body.country) {
      findUserAndUpdateLocation(req.body.login, req.body.country)
      return res.status(HttpStatusCodes.OK).json({ jwtToken });
    }
    return res.status(HttpStatusCodes.OK).json({ jwtToken });
  } catch (err) {
    console.error((err as Error));
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send((err as Error).message);
  }
});

router.get("/user/location", async (req: Request, res: Response) => {
  try {
    const userEquipments = await findUserByLocation(req.query.country as string)
    return res.status(HttpStatusCodes.OK).json(userEquipments)
  }
  catch (err) {
    console.log(err)
  }
});

router.get("/user/viewedFols", passport.authenticate('bearer', { session: false }), async (req: Request, res: Response) => {
  try {
    const foundUser: Partial<IUser> = (req.user)
    const blocked = await checkIfBlocked(req.body.login)
    if (blocked) return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "User is blocked" })
    const userFols = foundUser.viewedFols
    return res.status(HttpStatusCodes.OK).json({ userFols })
  }
  catch (err) {
    console.log(err)
  }
});

router.post("/user/equipments", async (req: Request, res: Response) => {
  try {
    const userEquipments = await findUsersByEquipments(req.body.equipments)
    return res.status(HttpStatusCodes.OK).json(userEquipments)
  }
  catch (err) {
    console.log(err)
  }
});

router.get("/user/fols", async (req: Request, res: Response) => {
  try {
    const users = await findUsersFols()
    return res.status(HttpStatusCodes.OK).json(users)
  }
  catch (err) {
    console.log(err)
  }
});

router.post("/fol/:folId", passport.authenticate('bearer', { session: false }), async (req: Request, res: Response) => {
  try {
    const foundUser: Partial<IUser> = (req.user)
    const blocked = await checkIfBlocked(foundUser.login)
    if (blocked) return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "User is blocked" })
    const response = await updateUserViewedFol(foundUser.login, req.params.folId)

    return res.status(HttpStatusCodes.OK).json(response.viewedFols)

  } catch (err) {
    console.log(err)
  }
});

export default router;
