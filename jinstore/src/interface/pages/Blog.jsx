import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumbs from "../../interface/components/Breadcrumbs";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaUserCircle,
} from "react-icons/fa";

const POSTS_PER_PAGE = 3;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blogs/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);

  const paginatedPosts = blogs.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-8xl mx-auto px-4 py-4">
        <Breadcrumbs />
      </div>

      <div className="max-w-5xl mx-auto px-10 flex flex-col lg:flex-row gap-8 py-4">
        {/* Main Blog List */}
        <div className="flex-1 space-y-10 lg:flex-none space-x-4">
          {paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-90 overflow-hidden rounded">
                <img
                  src={post.image_path}
                  alt={post.title}
                  className="w-full h-90 object-cover"
                />
              </div>
              <div className="p-5 space-y-2 px-0">
                <h2 className="text-xl font-bold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">
                  By {post.author_name} ·{" "}
                  {new Date(post.upload_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {post.description}
                </p>
                <div
                  className="inline-block mt-3 text-sm text-white bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                >
                  Read More
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo(0, 0);
                }}
                className={`w-8 h-8 border rounded ${
                  page === i + 1 ? "bg-blue-600 text-white" : "text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[300px] space-y-6 mt-8 lg:mt-0">
          {/* Profile Widget */}
          <div className="bg-gray-100 rounded p-4 text-center">
            <FaUserCircle className="mx-auto text-gray-600 w-20 h-20 mb-2" />
            <h3 className="text-lg font-semibold">Admin Profile</h3>
            <p className="text-sm text-gray-500">Author of the blog section</p>
          </div>

          {/* Social Media Widget */}
          <div className="bg-gray-100 rounded p-4">
            <h4 className="text-md font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-3 justify-center">
              <a href="#" className="bg-blue-600 text-white p-2 rounded-full">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-blue-400 text-white p-2 rounded-full">
                <FaTwitter />
              </a>
              <a href="#" className="bg-blue-700 text-white p-2 rounded-full">
                <FaLinkedinIn />
              </a>
              <a href="#" className="bg-pink-500 text-white p-2 rounded-full">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* CTA Widget */}
          <div className="bg-green-100 rounded p-4 text-center">
            <h4 className="text-md font-semibold mb-2">Join Our Newsletter</h4>
            <p className="text-sm text-gray-600 mb-2">
              Get the latest blog posts directly in your inbox!
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
              Subscribe
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
