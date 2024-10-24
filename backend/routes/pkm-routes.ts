import {  Router  } from "https://deno.land/x/oak@v12.4.0/mod.ts";

import{ 
  getAllPkms,
  getPkmsBydexNo,
  upsertPkm,
  PostCheckoutPkms,
  getCheckedOutPkms,
  deletePkmsById
} from "../controllers/pkm-controller.ts"

const router = new Router();

router
  .get("/pkms", getAllPkms)
  //.get("/Pkms/:id,")
  .get("/pkms/dexNo/:dexNo", getPkmsBydexNo)
  //.get("/Pkms/:id/address",)
  .post("/pkms", upsertPkm)
  .post("/pkms/checkout", PostCheckoutPkms)
  .get("/pkms/checkout/:trainerId", getCheckedOutPkms)
  //.post("/Pkms/:id/address",)
  .delete("/Pkms/:id", deletePkmsById);

  export default router;