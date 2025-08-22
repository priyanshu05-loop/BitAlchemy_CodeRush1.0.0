import React from 'react';
import BlogSection from './BlogSection';

function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">SoulSync Blog & Vlogs</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our collection of articles and videos on mental health, mindfulness, and Gen-Z wellness.
        </p>
      </div>
      
      <BlogSection />
      
      <div className="text-center mt-12">
        <a 
          href="/" 
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default Blog;