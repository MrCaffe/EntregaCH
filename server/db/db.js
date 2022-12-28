import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URL);

class DB {
  constructor(schema) {
    this.schema = schema;
  }

  async getData() {
    try {
      return await this.schema.find({});
    } catch (error) {
      console.log(
        "An error has occurred fetching the data from the table." +
          this.schema +
          "\n" +
          error
      );
      throw Error("error");
    }
  }

  async addData(data) {
    try {
      const result = await this.schema(data).save();
      return result;
    } catch (error) {
      console.log(
        "An error has occurred adding data to the collection." +
          this.schema +
          "\n" +
          error
      );
      throw Error("Error");
    }
  }
}

class Messages extends DB {
  constructor() {
    super(
      mongoose.model("messages", {
        author: {
          id: { type: String, required: false },
          name: { type: String, required: true },
          surname: { type: String, required: false },
          age: { type: Number, required: false },
          alias: { type: String, required: false },
          avatar: { type: String, required: false },
        },
        text: { type: String, required: true },
        date: {
          day: { type: String, required: true },
          hours: { type: String, required: true },
          minutes: { type: String, required: true },
          milliseconds: { type: String, required: true },
        },
      })
    );
  }

  async addMessage(mensaje) {
    await super.addData(mensaje);
  }

  async readMessages() {
    return await super.getData();
  }
}

class Products extends DB {
  constructor() {
    super(
      mongoose.model("products", {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        url: { type: String, required: true },
      })
    );
  }

  async addProduct(product) {
    await super.addData(product);
  }

  async readProducts() {
    return await super.getData();
  }
}

export { Products, Messages };
