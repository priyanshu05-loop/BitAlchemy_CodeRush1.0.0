import React from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from '../data';

function BlogPost() {
  const { id } = useParams();
  const blog = blogs.find(blog => blog.id === parseInt(id));
  
  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Blog Post Not Found</h1>
        <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-64 object-cover rounded-lg mb-6"
          onError={(e) => {
            e.target.src = '/placeholder.svg';
          }}
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.category.map((cat, index) => (
            <span key={index} className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded">
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
        <p className="text-gray-600 mb-6">{blog.description}</p>
        
        <div className="prose max-w-none text-gray-700">
          <p>
            This is where you would display the full content of your blog post. You can use this structure to create detailed articles
            with rich content, images, and formatting.
          </p>
          
          <h2 className="text-gray-800">Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2 className="text-gray-800">Key Points</h2>
          <ul>
            <li>Point 1: Important information about the topic</li>
            <li>Point 2: Additional insights and details</li>
            <li>Point 3: Practical applications and examples</li>
          </ul>
          
          <h2 className="text-gray-800">Conclusion</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;