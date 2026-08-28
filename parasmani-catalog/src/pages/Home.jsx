import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Collections from "../components/Collections/Collections";
import Legacy from "../components/Legacy/Legacy";
import FeaturedDesigns from "../components/FeaturedDesigns/FeaturedDesigns";
import OurCraft from "../components/OurCraft/OurCraft";
import HowWeWork from "../components/HowWeWork/HowWeWork";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <>
      <Header />
      <Hero />
        <Collections />
        <Legacy />
        <FeaturedDesigns />
        <OurCraft />
        <HowWeWork />
        <Footer />
    </>
  );
}

export default Home;