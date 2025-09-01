"use client";
import dynamic from "next/dynamic";


export default function TrendingStocks() {
    const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(
  () => import("recharts").then((mod) => mod.Line),
  { ssr: false }
);
  const stocks = [
    {
      name: "Apple (AAPL)",
      price: "$189.55",
      data: [150, 160, 155, 170, 180, 189],
      change: "+2.1%",
    },
    {
      name: "Tesla (TSLA)",
      price: "$248.12",
      data: [220, 230, 240, 250, 260, 248],
      change: "-1.5%",
    },
    {
      name: "Amazon (AMZN)",
      price: "$142.77",
      data: [130, 135, 140, 145, 150, 142],
      change: "+0.9%",
    },
    {
      name: "Microsoft (MSFT)",
      price: "$327.45",
      data: [310, 315, 320, 330, 335, 327],
      change: "-0.3%",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          📈 Trending Stocks
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Stay updated with the latest market movers.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stocks.map((stock, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-gray-50 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {stock.name}
            </h3>
            <p className="text-gray-600">{stock.price}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                stock.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {stock.change}
            </p>

            <div className="w-full h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stock.data.map((val, i) => ({ index: i, val }))}>
                  <Line
                    type="monotone"
                    dataKey="val"
                    stroke={stock.change.startsWith("+") ? "#16a34a" : "#dc2626"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
