import HttpStatusCodes from "http-status-codes";
import { Request, Response, Router } from 'express';
import { getAccessLogging, updateAccessLogging } from "../../services/access";

const router: Router = Router();

router.get("/access", async (req: Request, res: Response) => {
  try {
    const foundLogging = await getAccessLogging()
    return res.status(HttpStatusCodes.OK).json(foundLogging)
  }
  catch (err) {
    console.log(err)
  }
});

router.post("/access", async (req: Request, res: Response) => {
  try {
    const foundLogging = await updateAccessLogging(req.body.hour)
    return res.status(HttpStatusCodes.OK).json(foundLogging)
  }
  catch (err) {
    console.log(err)
  }
});

export default router;