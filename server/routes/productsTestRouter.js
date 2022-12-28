import { Router } from "express";
import { faker } from "@faker-js/faker";
import { fork } from "child_process";

faker.locale = "es";
const { commerce, image } = faker;

const productsTestRouter = Router();

productsTestRouter.get("/products-test/", (req, res, next) => {
  try {
    let data = { products: [] };

    for (let i = 0; i < 5; i++) {
      data.products.push({
        name: commerce.product(),
        price: commerce.price(),
        url: image.technics(),
      });
    }
    console.log(data);
    res.render("products", data);
  } catch (error) {
    next(error);
  }
});

productsTestRouter.get("/randoms", (req, res, next) => {
  try {
    const { quantity = 1000000 } = req.query;
    if (isNaN(Number(quantity))) {
      res.json({ error: "You send a string, it must be a number" });
    } else {
      console.log(quantity);
      const child = fork("calc.js");

      child.on("message", (result) => {
        if (result == "ready") {
          child.send(Number(quantity));
        } else {
          console.log("I end here");
          res.json(result);
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

export default productsTestRouter;
