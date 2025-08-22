import React from 'react'

const Feature = () => {
    return (
        <div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-orange-600 mb-4">How Aura Supports You</h2>
                            <p className="text-gray-600">Evidence-based techniques for mental wellness</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center shadow-lg border-0 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all rounded-xl">
                                <div className="p-8">
                                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">AI Chat Support</h3>
                                    <p className="text-gray-600">
                                        Talk to an empathetic AI that understands your emotions and provides
                                        personalized coping strategies using CBT techniques.
                                    </p>
                                </div>
                            </div>

                            <div className="text-center shadow-lg border-0 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all rounded-xl">
                                <div className="p-8">
                                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">Mood Journaling</h3>
                                    <p className="text-gray-600">
                                        Track your emotional patterns over time with daily check-ins and
                                        gain insights into your mental health journey.
                                    </p>
                                </div>
                            </div>

                            <div className="text-center shadow-lg border-0 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all rounded-xl">
                                <div className="p-8">
                                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 4.5l-4 4-4-4"></path>
                                            <path d="M16 19.5l-4-4-4 4"></path>
                                            <path d="M6 9h12l-6 9"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">Coping Strategies</h3>
                                    <p className="text-gray-600">
                                        Access breathing exercises, mindfulness practices, and CBT techniques
                                        tailored to your current emotional state.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Feature