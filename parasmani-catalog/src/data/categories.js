import thushi from "../assets/thusi.png";
import craft from "../assets/ourcraft.png";

const categories = [
  {
    id: 1,
    name: "Thushi",
    slug: "thushi",
    image: thushi,
    featured: true,
    description: "Traditional Maharashtrian handcrafted gold bead necklaces.",
  },
  {
    id: 2,
    name: "Kolhapuri Saaj",
    slug: "kolhapuri-saaj",
    image: craft,
    featured: true,
    description: "Authentic heritage jewellery inspired by Kolhapur.",
  },
  {
    id: 3,
    name: "Traditional Mala",
    slug: "traditional-mala",
    image: craft,
    featured: true,
    description: "Elegant handcrafted malas for every collection.",
  },
  {
    id: 4,
    name: "Mangalsutra",
    slug: "mangalsutra",
    image: craft,
    featured: false,
    description: "Traditional handcrafted mangalsutra designs.",
  },
  {
    id: 5,
    name: "Earrings",
    slug: "earrings",
    image: craft,
    featured: false,
    description: "Elegant traditional earrings for every occasion.",
  },
  {
    id: 6,
    name: "Bangles",
    slug: "bangles",
    image: craft,
    featured: false,
    description: "Beautiful handcrafted bangles with timeless appeal.",
  },
];

export default categories;