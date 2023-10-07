const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const Address = require("./addressSchema");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Produkt jest wymagany"],
  },
  name: {
    type: String,
    required: [true, "Nazwa jest wymagana"],
  },
  price: {
    type: Number,
    required: [true, "Cena jest wymagana"],
    min: [0, "Cena nie może być ujemna"],
  },
  quantity: {
    type: Number,
    required: [true, "Ilość jest wymagana"],
    min: [1, "Ilość nie może być mniejsza niż 1"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Cena jest wymagana"],
    min: [0, "Cena nie może być ujemna"],
  },
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Użytkownik jest wymagany"],
  },
  items: [
    {
      type: orderItemSchema,
      required: [true, "Zamówienie musi zawierać produkty"],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["PayPal", "Przelew", "Karta", "Gotówka"],
    required: [true, "Metoda płatności jest wymagana"],
  },
  paymentOnDelivery: {
    type: Boolean,
    default: false,
  },
  address: {
    type: Address,
    required: [true, "Adres jest wymagany"],
  },
  deliveryPrice: {
    type: Number,
    min: [0, "Cena nie może być ujemna"],
  },
  totalPrice: {
    type: Number,
    min: [0, "Cena nie może być ujemna"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre("save", async function (next, session) {
  console.log(this.session);
  const user = await User.findById(this.customer).session(session);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Nie znaleziono użytkownika",
    });
  }
  next();
});

// orderSchema.pre("save", async function (next, session) {
//   try {
//     const productPromises = this.items.map(async (item) => {
//       const product = await Product.findById(item.product).session(session);
//       if (!product || product.stock < item.quantity) {
//         throw new Error(
//           `Produkt ${product.name} jest niedostępny w takiej ilości. Dostępna ilość: ${product.stock}`
//         );
//       }
//       product.stock -= item.quantity;
//       return product.save({ session });
//     });

//     await Promise.all(productPromises);
//     next();
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// orderSchema.pre("save", async function (next, session) {
//   this.totalPrice = this.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   if (this.totalPrice >= 200) {
//     this.deliveryPrice = 0;
//   }

//   this.totalPrice += this.deliveryPrice;
//   this.paymentOnDelivery = this.paymentMethod === "Gotówka";

//   await this.save({ session });
//   next();
// });

orderSchema.pre("findOneAndUpdate", async function (next, session) {
  try {
    const productPromises = this.items.map(async (item) => {
      const product = await Product.findById(item.product).session(session);
      if (!product || product.stock < item.quantity) {
        throw new Error(
          `Produkt ${product.name} jest niedostępny w takiej ilości. Dostępna ilość: ${product.stock}`
        );
      }
      product.stock += item.quantity;
      return product.save({ session });
    });

    await Promise.all(productPromises);
    next();
  } catch (error) {
    throw new Error(error);
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
