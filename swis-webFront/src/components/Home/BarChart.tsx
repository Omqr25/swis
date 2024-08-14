import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Home from "../../entities/Home";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  dataArray: Home[];
}

const BarChart = ({ dataArray }: Props) => {
  const labels = dataArray.map((item) => item.item_name);
  const quantityInData = dataArray.map((item) => item.total_quantity_in);
  const quantityOutData = dataArray.map((item) => item.total_quantity_out);
  const totalQuantityData = dataArray.map((item) => item.quantity_in_warehouse);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quantity In",
        data: quantityInData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        barThickness: 20,
      },
      {
        label: "",
        data: [0],
        backgroundColor : "rgba(255,255,255)",
        barThickness: 20,
      },
      {
        label: "Quantity Out",
        data: quantityOutData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 20,
      },
      {
        label: "",
        data: [0],
        backgroundColor : "rgba(255,255,255)",
        barThickness: 20,
      },
      {
        label: "Total Quantity Available in System",
        data: totalQuantityData,
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity",
        },
      },
      x: {
        type: "category",

        grid: {
          display: true,
        },
      },
    },
    elements: {
      bar: {
        barThickness: 200, // Adjust this value as needed
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Items Quantities",
      },
    },
  } as ChartOptions<"bar">;

  return <Bar data={data} options={options} height={120} />;
};

export default BarChart;
