// lib/stocksData.ts
import type { CandlestickData } from "lightweight-charts";

export type Stock = {
  name: string;
  slug: string;
  fullName: string;
  logo: string;
  price: string;
  marketCap: string;
  change: string;
  changeType: "up" | "down";
  description: string;
  fundamentals: Record<string, string>;
  chart: CandlestickData[];
};

export const stocksData: Record<string, Stock> = {
  nse: {
    name: "NSE",
    slug: "nse",
    fullName: "National Stock Exchange of India",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/27/National_Stock_Exchange_of_India_Logo.svg",
    price: "₹2,060.00",
    marketCap: "₹5.10 Lakh Cr",
    change: "+66%",
    changeType: "up",
    description: "The National Stock Exchange of India is a leading stock exchange.",
    fundamentals: {
      "P/E Ratio": "20.5",
      "Dividend Yield": "1.5%",
    },
    chart: [
      { time: "2024-08-01", open: 2000, high: 2100, low: 1950, close: 2060 },
      { time: "2024-08-02", open: 2060, high: 2120, low: 2020, close: 2080 },
    ],
  },
  "tata-capital": {
    name: "TATA Capital",
    slug: "tata-capital",
    fullName: "Tata Capital Ltd.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Tata_Capital_Logo.png",
    price: "₹800.00",
    marketCap: "₹2.96 Lakh Cr",
    change: "-11%",
    changeType: "down",
    description: "Tata Capital is a financial services company under the Tata Group.",
    fundamentals: {
      "P/E Ratio": "15.2",
      "Dividend Yield": "0.8%",
    },
    chart: [
      { time: "2024-08-01", open: 780, high: 820, low: 770, close: 800 },
      { time: "2024-08-02", open: 800, high: 810, low: 790, close: 795 },
    ],
  },
  "reliance-jio": {
    name: "Reliance Jio",
    slug: "reliance-jio",
    fullName: "Reliance Jio Infocomm Ltd.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Reliance_Jio_Logo.svg",
    price: "₹1,450.00",
    marketCap: "₹6.30 Lakh Cr",
    change: "+25%",
    changeType: "up",
    description: "Reliance Jio is India's leading telecom operator.",
    fundamentals: {
      "P/E Ratio": "18.3",
      "Dividend Yield": "0.5%",
    },
    chart: [
      { time: "2024-08-01", open: 1400, high: 1500, low: 1380, close: 1450 },
      { time: "2024-08-02", open: 1450, high: 1480, low: 1420, close: 1460 },
    ],
  },
};
