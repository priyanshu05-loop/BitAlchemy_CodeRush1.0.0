import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smile } from 'lucide-react'
import MoodCheckIn from './MoodCheckIn'

const Hero = () => {
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);

  return (
    <div>
      {/* Container */}
      <div className="w-full max-w-[1400px] bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        {/* Nav */}
        <header className="flex items-center justify-between px-4 sm:px-10 py-4 sm:py-6 border-b border-slate-100">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-xl bg-orange-500 grid place-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shopping-cart" className="lucide lucide-shopping-cart w-5 h-5 text-white">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-orange-600">SoulSync</span>
          </motion.div>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 text-sm font-medium">
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <Link to="/blog" className="hover:text-slate-900 transition-colors text-slate-600">Blog</Link>
            <Link to="/contact" className="hover:text-slate-900 transition-colors text-slate-600">Contact</Link>
            <Link to="/research" className="hover:text-slate-900 transition-colors text-slate-600">Research</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="menu" className="lucide lucide-menu w-5 h-5">
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M4 6h16"></path>
              </svg>
            </button>
            <Link to="/chatbot" className="rounded-full bg-orange-500 text-white px-4 sm:px-8 py-2 sm:py-3 text-sm font-semibold shadow-lg hover:bg-orange-600 transition-colors">
              <span className="hidden sm:inline">Chat With Mitra</span>
              <span className="sm:hidden">App</span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
          {/* Rating avatars */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" className="w-8 h-8 rounded-full border-3 border-white shadow-sm" alt="User" />
              <img src="https://randomuser.me/api/portraits/men/22.jpg" className="w-8 h-8 rounded-full border-3 border-white shadow-sm" alt="User" />
              <img src="https://randomuser.me/api/portraits/women/65.jpg" className="w-8 h-8 rounded-full border-3 border-white shadow-sm" alt="User" />
              <img src="https://randomuser.me/api/portraits/men/41.jpg" className="w-8 h-8 rounded-full border-3 border-white shadow-sm" alt="User" />
              <div className="w-8 h-8 rounded-full bg-orange-500 border-3 border-white shadow-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">+50K</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 text-amber-400 fill-current">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 text-amber-400 fill-current">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 text-amber-400 fill-current">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 text-amber-400 fill-current">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 text-amber-400 fill-current">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <span className="text-xs sm:text-sm text-slate-600 ml-1">Trusted by 50,000+ families</span>
            </div>
          </motion.div>

          <motion.h1
            className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your <span className="highlight font-bold text-orange-600">Personal AI </span> Therapist Companion for Stress & Anxiety
          </motion.h1>

          <motion.p
            className="max-w-2xl text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Measure & improve your mental health with our AI therapist companion.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/chatbot" className="flex items-center justify-center gap-2 rounded-full bg-orange-500 text-white px-8 sm:px-10 py-3 sm:py-4 text-base font-semibold shadow-lg hover:bg-orange-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="smartphone" className="lucide lucide-smartphone w-5 h-5">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
              </svg>
              Chat with Penguin
            </Link>
            <button
              onClick={() => setShowMoodCheckIn(true)}
              className="flex items-center justify-center gap-2 rounded-full bg-white border-2 border-slate-200 hover:bg-slate-100 text-slate-700 px-8 sm:px-10 py-3 sm:py-4 text-base font-semibold transition-colors"
            >
              <Smile className="w-5 h-5" />
              😊 Check mood
            </button>
          </motion.div>
        </section>
      </div>

      {/* Mood Check In Modal */}
      {showMoodCheckIn && (
        <MoodCheckIn onClose={() => setShowMoodCheckIn(false)} />
      )}
    </div>
  )
}

export default Hero