import { Pkm, Checkout } from "../models/pkm-model.ts"

import * as uuid from "jsr:@std/uuid";
import { Context} from "https://deno.land/x/oak@v17.1.0/mod.ts";

const kv = await Deno.openKv();

export async function getAllPkms(ctx: Context) {
  const Pkms = [];
  //for await (const res of kv.list<Pkm>({ prefix: ["Pkm"] })) {
  for await (const res of kv.list({ prefix: ["Pkm"] })) {
    Pkms.push(res.value);
  }
  console.log("GET ALL");
  ctx.response.body = JSON.stringify(Pkms);
}

export async function getPkmsBydexNo(ctx: Context) {  
    const Pkms = [];
    for await (const res of kv.list<Pkm>({ prefix: ["Pkm"] })) {
      if(res.value.dexNo == Number(ctx.params.dexNo))
        Pkms.push(res.value);
    }
  ctx.response.body = JSON.stringify(Pkms);
  }

export async function deletePkmsById(ctx: Context) {

  console.log("DELETE " + ctx.params.id );

  ctx.response.body = await kv.atomic()
    .delete(["Pkm", ctx.params.id])
    .commit();
 
}


export async function upsertPkm(ctx: Context) {

  console.log("POST PKM!");
  const Pkm: Pkm = await ctx.request.body.json();

  console.log(Pkm);

    if (Pkm.id == "0") Pkm.id = uuid.v1.generate();
    const PkmKey = ["Pkm", Pkm.id]; 
  
    const oldPkm = await kv.get<Pkm>(PkmKey);

      const ok = await kv.atomic()
        .check(oldPkm)
        .set(PkmKey, Pkm)
        .commit();
      if (!ok) ctx.response.status = 500;
      else ctx.response.body = JSON.stringify(Pkm);
   
  }

export async function PostCheckoutPkms(ctx: Context) {

  const Checkout: Checkout = await ctx.request.body.json();

  console.log("POST CHECKOUT " + Checkout.TrainerId);
 //TODO DELETE CHECKOUT FROM KV

  const CheckoutKey = ["TrainerId", Checkout.TrainerId];

  const oldCheckout = await kv.get<Checkout>(CheckoutKey);

    const ok = await kv.atomic()
      .check(oldCheckout)
      .set(CheckoutKey, Checkout)
      .commit();
    if (!ok) ctx.response.status = 500;
    else ctx.response.body = JSON.stringify(Checkout);

 
}

export async function getCheckedOutPkms(ctx: Context) {

  console.log("POST CHECKOUT " + ctx.params.trainerId);

  const entry = await kv.get(["TrainerId", ctx.params.trainerId]);
  if (entry.value) {
    ctx.response.body = JSON.stringify(entry.value?.Pokemons);
    console.log("GET: CHECKOUT TrainerId " + ctx.params.trainerId);
    console.log(entry.value?.Pokemons);
  }
  else ctx.response.body = null;
 
}

