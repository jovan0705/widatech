const { Invoice, Product, ProductSold } = require("../models");
const axios = require("axios");

const createInvoice = async (req, res, next) => {
  try {
    const invoicesLength = await getInvoicesLength();
    const { date, customer, salesperson, paymentType, notes, products } =
      req.body;
    if (!products) {
      throw { name: "EMPTY_PRODUCT" };
    }
    // check if stock available
    const productSoldData = [];
    const flag = false;
    const productNotAvailable = [];
    await products.forEach((el) => {
      if (el.stock < el.quantity) {
        flag = true;
        productNotAvailable.push(el.name);
      }
    });
    if (flag) {
      // throw error stock ad yg ga cukup
      throw new Error({
        name: "STOCK_NOT_AVAILABLE",
        payload: productNotAvailable.join(", "),
      });
    }
    const invoice = await Invoice.create({
      invoice_no: invoicesLength + 1,
      date,
      customer,
      salesperson,
      payment_type: paymentType.code,
      notes,
    });

    await products.forEach((el, idx) => {
      productSoldData.push({
        invoiceId: invoice.id,
        productId: el.id,
        quantity: el.quantity,
        total_price: Number(el.quantity) * Number(el.price),
      });
      Product.update(
        { stock: Number(el.stock) - Number(el.quantity) },
        {
          where: {
            id: el.id,
          },
        }
      );
    });

    await ProductSold.bulkCreate(productSoldData);

    res.status(201).json("Invoice Created");
  } catch (error) {
    next(error);
  }
};

const getAllInvoice = async (req, res, next) => {
  try {
    const invoices = await Invoice.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: ProductSold,
        },
      ],
    });
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

const getInvoicesLength = async () => {
  const invoices = await Invoice.findAll({
    include: [
      {
        model: ProductSold,
      },
    ],
  });
  return invoices.length;
};

module.exports = {
  createInvoice,
  getAllInvoice,
};
