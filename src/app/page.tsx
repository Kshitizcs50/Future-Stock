import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/main/Hero";
import Features from "./components/main/Feature";
import Footer from "./components/Footer";
import TrendingStocks from "./components/main/TrendingStocks";
import UnlistedSharesPage from "./unlisted-shares/page";
import NewsArticles from "./components/main/NewsArticle";
import HowItWorks from "./components/main/HowitsWork";
import TestimonialSection from "./components/main/TestimonialSection";


export default function Home() {
  return (
    <>
    <Header/>
    <Hero/>
    <TrendingStocks/>
    <Features/>
    <UnlistedSharesPage/>
    <NewsArticles/>
    <HowItWorks/>
    <TestimonialSection/>
    <Footer/>
   
    </>
  );
}
