import React from 'react';

function Research() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Our Research</h1>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-600 mb-8 text-center">
          SoulSync is built on a foundation of scientific research and evidence-based therapeutic techniques. 
          Our approach combines cutting-edge AI technology with proven mental health interventions.
        </p>
        
        <div className="bg-orange-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Evidence-Based Approach</h2>
          <p className="text-gray-700 mb-4">
            Our platform integrates cognitive behavioral therapy (CBT), mindfulness-based stress reduction (MBSR), 
            and positive psychology principles - all backed by extensive research in mental health treatment.
          </p>
          <p className="text-gray-700">
            We continuously review and update our methodologies based on the latest findings in psychology, 
            neuroscience, and AI-assisted therapy to ensure the highest quality support for our users.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">87%</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">User Satisfaction</h3>
            <p className="text-gray-600">Reported improvement in stress management after 4 weeks</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">92%</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Accessibility</h3>
            <p className="text-gray-600">Users found our platform more accessible than traditional therapy</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">78%</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Engagement</h3>
            <p className="text-gray-600">Weekly active users report consistent engagement with features</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Research Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-l-4 border-orange-500 pl-4 py-1">
            <h3 className="text-xl font-bold mb-2 text-gray-800">AI and Mental Health</h3>
            <p className="text-gray-600">
              Exploring how artificial intelligence can provide personalized mental health support while maintaining 
              empathy and understanding.
            </p>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-4 py-1">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Gen-Z Mental Health Trends</h3>
            <p className="text-gray-600">
              Studying the unique stressors and mental health challenges faced by Generation Z to develop 
              targeted interventions.
            </p>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-4 py-1">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Digital Therapeutic Efficacy</h3>
            <p className="text-gray-600">
              Measuring the effectiveness of digital therapeutics compared to traditional therapy methods 
              for anxiety and stress management.
            </p>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-4 py-1">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Creative Therapy Methods</h3>
            <p className="text-gray-600">
              Investigating innovative therapy approaches like doodle therapy, music therapy, and movement 
              therapy in digital formats.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Published Studies</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="text-lg font-bold text-orange-600">AI-Assisted CBT for Gen-Z Anxiety Management</h3>
              <p className="text-gray-600">Journal of Digital Mental Health, 2024</p>
            </li>
            <li>
              <h3 className="text-lg font-bold text-orange-600">Effectiveness of Gamified Mindfulness Apps</h3>
              <p className="text-gray-600">Psychology of Well-Being, 2023</p>
            </li>
            <li>
              <h3 className="text-lg font-bold text-orange-600">Creative Expression Therapy in Digital Platforms</h3>
              <p className="text-gray-600">Arts in Psychotherapy, 2023</p>
            </li>
          </ul>
        </div>
        
        <div className="text-center">
          <a 
            href="/contact" 
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Contact Our Research Team
          </a>
        </div>
      </div>
    </div>
  );
}

export default Research;