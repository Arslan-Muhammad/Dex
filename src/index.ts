import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

let ETH_BLNC = 200;
let USDC = 700000;

app.get("/", (req, res) => {
  res.json({
    message: "hi",
  });
});
app.post("/buy-asset", (req: Request, res: Response) => {
  const quantity = req.body.quantity;
  const updatedEthQuantity = ETH_BLNC - quantity;
  const updatedUsdcBlanace = (ETH_BLNC * USDC) / updatedEthQuantity;
  const paidAmount = updatedUsdcBlanace - ETH_BLNC;

  ETH_BLNC = updatedEthQuantity;
  USDC = updatedUsdcBlanace;

  res.json({
    message: `You paid ${paidAmount} USDC for ${quantity} ETH`,
  });
});

app.post("/sell-asset", (req: Request, res: Response) => {
  const quantity = req.body.quantity;
  const updatedEthQuantity = ETH_BLNC + quantity;
  const updatedUsdcBlanace = (ETH_BLNC * USDC) / updatedEthQuantity;
  const gottenUsdc = USDC - updatedUsdcBlanace;

  ETH_BLNC = updatedEthQuantity;
  USDC = updatedUsdcBlanace;

  res.json({
    message: `You get ${gottenUsdc} USDC for ${quantity} EH`,
  });
});

app.listen(3000);
