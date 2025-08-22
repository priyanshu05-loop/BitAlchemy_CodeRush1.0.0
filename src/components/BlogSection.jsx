import React from 'react';
import { Link } from 'react-router-dom';
import { blogs, vlogs } from '../data';

function BlogSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Blog & Vlogs</h1>
      
      {/* Blogs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder.svg';
                }}
              />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.category.map((cat, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-orange-600 hover:text-orange-800 font-medium inline-flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Vlogs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Vlogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vlogs.map((vlog) => (
            <div key={vlog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={vlog.thumbnail}
                  alt={vlog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {vlog.category.map((cat, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{vlog.title}</h3>
                <p className="text-gray-600 mb-4">{vlog.description}</p>
                <a
                  href={vlog.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Watch Video
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BlogSection;