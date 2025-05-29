import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blogs/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, []);

  return (
    <section className="px-4 py-16">
      <div className="w-full max-w-7xl xl:max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Our Blogs</h2>
            <p className="text-sm text-gray-500">
              Some of the new posts this week.
            </p>
          </div>
          <Link
            to="/blog"
            className="text-sm text-gray-700 hover:text-black font-medium flex items-center gap-1"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((post) => (
            <Link to="/blog" key={post.id} className="text-left block">
              <div className="relative">
                <img
                  src={post.image_path}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {post.category && (
                  <span className="absolute top-2 left-2 bg-white text-xs text-gray-800 px-2 py-1 rounded font-medium">
                    {post.category}
                  </span>
                )}
              </div>
              <h3 className="text-md font-semibold mt-3 leading-snug text-gray-800">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 mb-3 line-clamp-3">
                {post.description}
              </p>
              <p className="text-xs text-gray-400">
                By {post.author_name} ·{" "}
                {new Date(post.upload_date).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
