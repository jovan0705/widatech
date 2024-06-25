import axios from "axios";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../store/actionCreators/productAction";
import { errorAlert, successAlert } from "../helpers/alerts";
import { currencyFormatter } from "../helpers/currencyFormatter";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

const PostInvoicePage = () => {
  const paymentType = [
    { name: "Cash", code: "CASH" },
    { name: "Credit", code: "CREDIT" },
    { name: "Not Cash / Credit", code: "NOTCASHORCREDIT" },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState({
    date: "",
    customer: "",
    salesperson: "",
    notes: "",
    paymentType: "",
    products: [],
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const search = (event) => {
    setTimeout(() => {
      let _filteredProducts;

      if (!event.query.trim().length) {
        _filteredProducts = [...products];
      } else {
        _filteredProducts = products.filter((product) => {
          return product.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredProducts(_filteredProducts);
    }, 250);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProduct()).then((res) => {
        setProducts(res);
      });
    }, 1000);
  }, []);

  const itemTemplate = (item) => {
    return (
      <div
        border={"1px solid black"}
        borderRadius={"4px"}
        style={{ display: "flex", width: "100%" }}
      >
        <Image
          src={item.picture}
          alt="pic"
          width={"100px"}
          height={"100px"}
        ></Image>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ margin: 0 }}>{item.name}</p>
          <p style={{ margin: 0 }}>Stock: {item.stock}</p>
          <p style={{ margin: 0 }}>Price: {currencyFormatter(item.price)}</p>
        </div>
      </div>
    );
  };

  const imageTemplate = (src) => {
    return <Image src={src.picture} width="64px" height="64px"></Image>;
  };

  const quantityTemplate = (data, options) => {
    const handleChange = (value) => {
      const tempSelected = [];
      selectedProduct.forEach((el) => {
        if (el.id === data.id) {
          tempSelected.push({
            ...data,
            quantity: value,
            total_price: Number(value) * Number(data.price),
          });
        } else {
          tempSelected.push(el);
        }
      });
      setSelectedProduct(tempSelected);
    };
    return (
      <InputNumber
        min={1}
        max={data.stock}
        value={1}
        onChange={(e) => handleChange(e.value)}
        inputStyle={{ width: "60px" }}
        style={{ width: "60px" }}
      ></InputNumber>
    );
  };

  const priceTemplate = (data) => {
    return currencyFormatter(data.price);
  };

  const totalPriceTemplate = (data) => {
    if (data.total_price) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(data.total_price);
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(1 * Number(data.price));
  };

  const handleChangeInvoice = async (e) => {
    const name = e.target.name;
    if (name === "paymentType") {
      const value = e.value;
      setInvoice({ ...invoice, [name]: value });
    } else if (name === "products") {
      const value = await e.value.map((el) => {
        return { ...el, quantity: 1 };
      });
      setSelectedProduct(value);
    } else {
      const value = e.target.value;
      setInvoice({ ...invoice, [name]: value });
    }
  };

  const handlePost = async () => {
    try {
      await axios.post("http://localhost:3000/invoice/post", {
        ...invoice,
        products: selectedProduct,
      });
      await successAlert("Succesfully Post Invoice");
      navigate("/");
    } catch (error) {
      if (error.response.data.message) {
        errorAlert(error.response.data.message);
      } else {
        errorAlert(error.response.data.errors[0].message);
      }
    }
  };

  return (
    <div>
      {products.length === 0 ? (
        <Loading />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", padding: "24px" }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => navigate("/")}>Back</Button>
          </div>
          <h1>Invoice Form</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              border: "1px solid black",
              marginLeft: "10vw",
              marginRight: "10vw",
              padding: "12px 24px 24px 24px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "35%",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p className="formInputLabel">Date</p>
                  <p
                    className="formInputTooltip"
                    style={{
                      display: !invoice.date ? "block" : "none",
                    }}
                  >
                    *date cannot be empty
                  </p>
                </div>
                <Calendar
                  invalid={!invoice.date}
                  name="date"
                  onChange={handleChangeInvoice}
                ></Calendar>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p className="formInputLabel">Customer Name</p>
                  <p
                    className="formInputTooltip"
                    style={{
                      display: !invoice.customer ? "block" : "none",
                    }}
                  >
                    *customer name cannot be empty
                  </p>
                </div>
                <InputText
                  invalid={!invoice.customer}
                  required
                  name="customer"
                  onChange={handleChangeInvoice}
                ></InputText>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p className="formInputLabel">Salesperson Name</p>
                  <p
                    className="formInputTooltip"
                    style={{
                      display: !invoice.salesperson ? "block" : "none",
                    }}
                  >
                    *salesperson name cannot be empty
                  </p>
                </div>
                <InputText
                  invalid={!invoice.salesperson}
                  name="salesperson"
                  onChange={handleChangeInvoice}
                ></InputText>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p className="formInputLabel">Notes</p>
                  <p
                    className="formInputTooltip"
                    style={{
                      display: !invoice.notes ? "block" : "none",
                    }}
                  >
                    *notes cannot be empty
                  </p>
                </div>
                <InputTextarea
                  invalid={!invoice.notes}
                  name="notes"
                  onChange={handleChangeInvoice}
                ></InputTextarea>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p className="formInputLabel">Payment Type</p>
                  <p
                    className="formInputTooltip"
                    style={{
                      display: !invoice.paymentType ? "block" : "none",
                    }}
                  >
                    *payment type cannot be empty
                  </p>
                </div>
                <Dropdown
                  invalid={!invoice.paymentType}
                  name="paymentType"
                  value={invoice.paymentType}
                  onChange={handleChangeInvoice}
                  options={paymentType}
                  optionLabel="name"
                  placeholder="Select payment type"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div
              style={{
                width: "65%",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p className="formInputLabel">Products</p>
                  <p
                    className="formInputTooltip"
                    style={{
                      display:
                        !selectedProduct || selectedProduct.length === 0
                          ? "block"
                          : "none",
                    }}
                  >
                    *products cannot be empty
                  </p>
                </div>
                {products.length > 0 && (
                  <AutoComplete
                    name="products"
                    field="name"
                    value={selectedProduct}
                    suggestions={filteredProducts}
                    completeMethod={search}
                    onChange={handleChangeInvoice}
                    itemTemplate={itemTemplate}
                    multiple
                    invalid={!selectedProduct || selectedProduct.length === 0}
                  />
                )}
              </div>
              <DataTable value={selectedProduct}>
                <Column
                  field="picture"
                  header="Picture"
                  body={imageTemplate}
                ></Column>
                <Column field="name" header="Name"></Column>
                <Column
                  field="price"
                  header="Price"
                  body={priceTemplate}
                ></Column>
                <Column field="stock" header="Stock"></Column>
                <Column
                  field="quantity"
                  header="Quantity"
                  body={(data, options) => quantityTemplate(data, options)}
                ></Column>
                <Column
                  value={0}
                  field="total_price"
                  header="Total Price"
                  body={totalPriceTemplate}
                ></Column>
              </DataTable>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <Button onClick={handlePost}>Post</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInvoicePage;
