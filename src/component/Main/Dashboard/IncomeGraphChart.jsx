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
import { useGetIncomeRatioQuery } from "../../../redux/features/dashboard/dashboardApi";
import { useState } from "react";
import dayjs from "dayjs";

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: incomeData } = useGetIncomeRatioQuery(selectedYear);

  const chartData = incomeData?.map((monthData) => ({
    month: monthData.month,
    income: monthData.totalEarnings,
  }));

  const handleDateChange = (date) => {
    if (date) {
      setSelectedYear(date.year());
    }
  };

  return (
    <section className="w-full col-span-full md:col-span-4 bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold">Revenue For User</h1>
        <DatePicker
          onChange={handleDateChange}
          picker="year"
          defaultValue={dayjs(selectedYear.toString())}
        />
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            interval={0} // Ensure all months are shown
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" barSize={20} fill="#f7cc50" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
