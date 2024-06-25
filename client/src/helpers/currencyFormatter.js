export const currencyFormatter = (nominal) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(nominal);
};

export const sumTotalPrice = (productSold) => {
  let tempTotalPrice = 0;
  productSold.forEach((el) => {
    tempTotalPrice += Number(el.total_price);
  });
  return tempTotalPrice;
};
