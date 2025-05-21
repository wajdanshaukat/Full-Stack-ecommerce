import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-gray-500 py-2 px-4">
      <Link to="/" className={`mr-1 ${paths.length === 0 ? "text-blue-500" : "text-gray-500"}`}>
        Home
      </Link>
      {paths.map((path, idx) => {
        const isLast = idx === paths.length - 1;
        const fullPath = "/" + paths.slice(0, idx + 1).join("/");
        return (
          <span key={idx}>
            &gt;{" "}
            <Link
              to={fullPath}
              className={`ml-1 ${isLast ? "text-blue-500" : "text-gray-500"}`}
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>{" "}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
