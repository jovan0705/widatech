import Loading from "../components/Loading";
import TimeseriesGraph from "../components/TimeseriesGraph";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInvoices } from "../store/actionCreators/invoiceAction";
import { currencyFormatter, sumTotalPrice } from "../helpers/currencyFormatter";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  const { invoiceReducer } = useSelector((store) => store.rootReducer);

  const cardData = useMemo(() => {
    return invoiceReducer.invoices.slice(first, rows + first) || [];
  }, [invoiceReducer.invoices, first]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchInvoices());
    }, 1000);
  }, []);

  return (
    <div>
      {invoiceReducer.invoices.length === 0 ? (
        <Loading />
      ) : (
        <div
          className="flex justify-content-center"
          style={{ padding: "24px" }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => navigate("/post")}>Register Invoice</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ textAlign: "start", margin: 0 }}>Invoices</h1>
            <div
              style={{
                display: "flex",
                marginBottom: "12px",
                marginTop: "12px",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {cardData.map((el) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "12px",
                    marginRight: "12px",
                    marginTop: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <Card className="md:w-25rem" style={{ width: "200px" }}>
                    <p
                      style={{
                        margin: 0,
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Customer Name:
                    </p>
                    <p style={{ margin: "0px 0 12px 0", textAlign: "left" }}>
                      {el.customer}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Salesperson Name:
                    </p>
                    <p style={{ margin: "0px 0 12px 0", textAlign: "left" }}>
                      {el.salesperson}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Total Amount Paid:
                    </p>
                    <p style={{ margin: "0px 0 12px 0", textAlign: "left" }}>
                      {currencyFormatter(sumTotalPrice(el.ProductSolds))}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Notes:
                    </p>
                    <p
                      style={{
                        margin: "0px 0 12px 0",
                        textAlign: "left",
                        wordBreak: "break-word",
                      }}
                    >
                      {el.notes}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={invoiceReducer.invoices.length}
              onPageChange={onPageChange}
            />
          </div>
          <div>
            <h1 style={{ textAlign: "start", margin: 0 }}>Income Graph</h1>
            <TimeseriesGraph invoiceData={invoiceReducer.invoices} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
