import AdminLayout from "../../layouts/AdminLayout";
import {
  Gem,
  FolderKanban,
  Star,
  Image,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: 245,
    icon: <Gem size={30} />,
  },
  {
    title: "Categories",
    value: 12,
    icon: <FolderKanban size={30} />,
  },
  {
    title: "Featured Products",
    value: 38,
    icon: <Star size={30} />,
  },
  {
    title: "Images",
    value: 1450,
    icon: <Image size={30} />,
  },
];

const recentProducts = [
  {
    code: "TH001",
    name: "Royal Thushi",
    category: "Thushi",
  },
  {
    code: "KS015",
    name: "Kolhapuri Saaj",
    category: "Saaj",
  },
  {
    code: "TM009",
    name: "Traditional Mala",
    category: "Mala",
  },
];

function Dashboard() {
  return (
    <AdminLayout>

      {/* Heading */}

      <div className="mb-10">

        <h1
          className="text-3xl md:text-4xl text-[#18322F]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-600">
          Here's an overview of your jewellery catalogue.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-[#18322F]">
                  {item.value}
                </h2>

              </div>

              <div className="text-[#C8A044]">

                {item.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Recent Products */}

      <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-6 border-b">

          <h2
            className="text-2xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Recently Added Products
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#F8F5EE]">

              <tr>

                <th className="text-left p-5">Product Code</th>

                <th className="text-left p-5">Product Name</th>

                <th className="text-left p-5">Category</th>

              </tr>

            </thead>

            <tbody>

              {recentProducts.map((product) => (

                <tr
                  key={product.code}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-5 font-medium">

                    {product.code}

                  </td>

                  <td className="p-5">

                    {product.name}

                  </td>

                  <td className="p-5">

                    {product.category}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;