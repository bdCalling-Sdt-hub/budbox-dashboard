/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", income: 3000 },
  { month: "Feb", income: 2000 },
  { month: "Mar", income: 400 },
  { month: "Apr", income: 6000 },
  { month: "May", income: 100 },
  { month: "Jun", income: 10000 },
  { month: "Jul", income: 5000 },
  { month: "Aug", income: 2000 },
  { month: "Sep", income: 4000 },
  { month: "Oct", income: 6000 },
  { month: "Nov", income: 8000 },
  { month: "Dec", income: 10000 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`Month: ${label}`}</p>
        <p className="intro">{`Total Income: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const IncomeGraphChart = () => {
  return (
    <section className="w-full col-span-full md:col-span-4 bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold">Income Ratio</h1>
        <DatePicker />
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" barSize={20} fill="#f7cc50" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
