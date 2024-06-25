import { Chart } from "chart.js";
import { Chart as PrimeChart } from "primereact/chart";
import { useState, useMemo } from "react";
import { SelectButton } from "primereact/selectbutton";
import { sumTotalPrice } from "../helpers/currencyFormatter";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

const TimeseriesGraph = ({ invoiceData }) => {
  const [value, setValue] = useState("daily");
  const items = [
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
    { name: "Monthly", value: "monthly" },
  ];

  const chartData2 = useMemo(() => {
    const result = invoiceData.reduce((acc, item) => {
      let key;
      const date = new Date(item.date);

      switch (value) {
        case "weekly":
          const firstDayOfWeek = new Date(
            date.setDate(
              date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
            )
          );
          firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
          key = firstDayOfWeek.toISOString().split("T")[0];
          break;
        case "monthly":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
          break;
        default:
          date.setDate(date.getDate() + 1);
          key = date.toISOString().split("T")[0];
          break;
      }

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += sumTotalPrice(item.ProductSolds);
      return acc;
    }, {});
    const groupedData = Object.entries(result)
      .map(([date, total_price]) => ({
        date,
        total_price,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartLabel = groupedData.map((el) => {
      return el.date;
    });
    const chartData = groupedData.map((el) => {
      return el.total_price;
    });
    const data = {
      labels: chartLabel,
      datasets: [
        {
          label: "Invoices",
          data: chartData,
          fill: false,
          borderColor: "#06b6d4",
          tension: 0.4,
        },
      ],
    };

    return data;
  }, [invoiceData, value]);

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#dfe7ef",
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#dfe7ef",
        },
      },
    },
  };

  return (
    <div>
      <SelectButton
        value={value}
        onChange={(e) => setValue(e.value)}
        optionLabel="name"
        options={items}
      />
      <PrimeChart type="line" data={chartData2} options={options} />
    </div>
  );
};

export default TimeseriesGraph;
