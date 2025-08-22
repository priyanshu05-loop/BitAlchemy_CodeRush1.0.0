import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">About SoulSync</h1>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-600 mb-6">
          SoulSync is your personal AI therapist companion designed specifically for Gen-Z to manage stress and anxiety. 
          We understand the unique challenges faced by today's youth and provide accessible, judgment-free mental health support.
        </p>
        
        <div className="bg-orange-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Our Mission</h2>
          <p className="text-gray-700">
            To make mental health support accessible, relatable, and effective for Gen-Z through innovative AI technology 
            that combines evidence-based therapeutic techniques with a modern, engaging interface.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Support</h3>
            <p className="text-gray-600">
              Our advanced AI uses cognitive behavioral therapy (CBT) and mindfulness techniques to provide personalized 
              mental health support anytime, anywhere.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Gen-Z Focused</h3>
            <p className="text-gray-600">
              Designed with Gen-Z preferences in mind, featuring a friendly interface, creative therapy options, 
              and content that resonates with modern youth experiences.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Choose SoulSync?</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>24/7 availability for immediate support when you need it most</li>
          <li>Completely anonymous and private conversations</li>
          <li>Evidence-based therapeutic techniques adapted for digital interaction</li>
          <li>Creative therapy options like doodle therapy and mood tracking</li>
          <li>Personalized insights and progress tracking</li>
        </ul>
        
        <div className="text-center">
          <a 
            href="/chatbot" 
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;