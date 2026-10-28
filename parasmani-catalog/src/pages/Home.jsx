import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Collections from "../components/Collections/Collections";
import Legacy from "../components/Legacy/Legacy";
import FeaturedDesigns from "../components/FeaturedDesigns/FeaturedDesigns";
import WorldOfMani from "../components/WorldOfMani/WorldOfMani";
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
        <WorldOfMani/>
        <OurCraft />
        <HowWeWork />
        <Footer />
    </>
  );
}

export default Home;