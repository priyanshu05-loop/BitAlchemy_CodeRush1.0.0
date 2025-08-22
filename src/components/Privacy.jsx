import React from 'react'

// Icon components
const Shield = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const Clock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const Heart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const Privacy = () => {
    return (
        <div>
            {/* Privacy & Trust */}
            <section className="py-16 bg-orange-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Shield className="w-16 h-16 mx-auto mb-6 text-orange-500" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Privacy Matters</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            All conversations are private and secure. We never share your personal information,
                            and you can delete your data anytime.
                        </p>
                        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                End-to-End Encrypted
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Available 24/7
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                Judgment-Free Zone
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Privacy