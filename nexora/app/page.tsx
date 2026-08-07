import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import TrustedPartners from "@/components/home/TrustedPartners";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";
import Countries from "@/components/home/Countries";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <TrustedPartners />
      <Categories />
      <Featured />
      <Countries />
      <Stats />
      <Testimonials />
      <Newsletter />
<Footer />
    </>
  );
}