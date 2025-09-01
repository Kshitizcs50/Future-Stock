import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/main/Hero";
import Features from "./components/main/Feature";
import Footer from "./components/Footer";
import TrendingStocks from "./components/main/TrendingStocks";

export default function Home() {
  return (
    <>
    <Header/>
    <Hero/>
    <TrendingStocks/>
    <Features/>
    <Footer/>
    </>
  );
}
