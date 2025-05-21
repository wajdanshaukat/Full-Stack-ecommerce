import { FaTruck, FaBoxOpen, FaShieldAlt, FaClock } from "react-icons/fa";

const highlights = [
  {
    icon: <FaTruck className="text-2xl text-green-600" />,
    title: "Payment only after delivery",
    desc: "Trusted payment, fast refunding...",
  },
  {
    icon: <FaBoxOpen className="text-2xl text-purple-600" />,
    title: "New restocks and sales",
    desc: "Updated frequently with fresh deals...",
  },
  {
    icon: <FaShieldAlt className="text-2xl text-yellow-500" />,
    title: "Quality assurance",
    desc: "Top-quality brands & fresh products.",
  },
  {
    icon: <FaClock className="text-2xl text-blue-500" />,
    title: "Delivery from 1 hour",
    desc: "Fast shipping available in selected areas.",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="px-4 mt-10 mb-6">
      <div className="max-w-7xl mx-auto border-b border-gray-200 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="text-3xl">{item.icon}</div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlights;
