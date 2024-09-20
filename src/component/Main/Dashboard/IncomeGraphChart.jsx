/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
  { month: "Dec", income: 10000 },
  { month: "Jan", income: 0 },
  { month: "Feb", income: 2000 },
  { month: "Mar", income: 400 },
  { month: "Apr", income: 6000 },
  { month: "May", income: 100 },
  { month: "Jun", income: 10000 },
  { month: "Jul", income: 0 },
  { month: "Aug", income: 2000 },
  { month: "Sep", income: 4000 },
  { month: "Oct", income: 6000 },
  { month: "Nov", income: 8000 },
  { month: "Dec", income: 10000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded bg-[#e6f3ec] border border-[#457388] p-1">
        <p className="label">{`${label} : $${(payload[0].value / 1000).toFixed(
          1
        )}k`}</p>
      </div>
    );
  }

  return null;
};

const IncomeGraphChart = () => {
  return (
    <section className="w-full bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold">Income Ratio</h1>
        <DatePicker />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="month" />
          <YAxis
            ticks={[0, 2000, 4000, 6000, 8000, 10000]}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="income" fill="#457388" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
