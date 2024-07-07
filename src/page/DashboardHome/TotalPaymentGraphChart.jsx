/* eslint-disable react/prop-types */
import { DatePicker } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', payment: 3000 },
    { month: 'Feb', payment: 2000 },
    { month: 'Mar', payment: 400 },
    { month: 'Apr', payment: 6000 },
    { month: 'May', payment: 100 },
    { month: 'Jun', payment: 10000 },
    { month: 'Jul', payment: 5000 },
    { month: 'Aug', payment: 2000 },
    { month: 'Sep', payment: 4000 },
    { month: 'Oct', payment: 6000 },
    { month: 'Nov', payment: 8000 },
    { month: 'Dec', payment: 10000 }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip rounded bg-[#e6f3ec] border border-[#457388] p-1">
                <p className="label">{`${label} : $${(payload[0].value / 1000).toFixed(1)}k`}</p>
            </div>
        );
    }

    return null;
};

const TotalPaymentGraphChart = () => {
    return (
        <section className='w-full col-span-full md:col-span-4'>
            <div className='flex justify-between items-center py-3'>
                <h1 className='font-semibold'>Total Payment Volume </h1>
                <DatePicker />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid />
                    <XAxis dataKey="month" />
                    <YAxis
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="payment" fill="#457388" />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};

export default TotalPaymentGraphChart;
