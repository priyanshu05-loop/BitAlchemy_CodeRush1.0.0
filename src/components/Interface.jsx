import React, { useState } from 'react'

// Placeholder components
const Tabs = ({ defaultValue, className, children }) => (
  <div className={className}>
    {children}
  </div>
)

const TabsList = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

const TabsTrigger = ({ value, className, children, onClick }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
)

const TabsContent = ({ value, className, children }) => (
  <div className={className}>
    {children}
  </div>
)

const MoodCheckIn = ({ onMoodSubmit }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
    <div className="flex justify-center space-x-4">
      {['😊', '😐', '😢', '😡', '😴'].map((emoji, index) => (
        <button 
          key={index} 
          className="text-4xl p-2 hover:bg-gray-100 rounded-full"
          onClick={() => onMoodSubmit(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  </div>
)

const MoodJournal = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Mood Journal</h3>
    <textarea 
      className="w-full p-3 border rounded-lg" 
      rows="5" 
      placeholder="Write about your day, thoughts, and feelings..."
    ></textarea>
    <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">
      Save Entry
    </button>
  </div>
)

const CopingStrategies = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Coping Strategies</h3>
    <ul className="space-y-3">
      <li className="flex items-center">
        <span className="mr-2">1.</span>
        <span>Deep breathing exercises</span>
      </li>
      <li className="flex items-center">
        <span className="mr-2">2.</span>
        <span>Mindfulness meditation</span>
      </li>
      <li className="flex items-center">
        <span className="mr-2">3.</span>
        <span>Progressive muscle relaxation</span>
      </li>
    </ul>
  </div>
)

const ChatInterface = ({ initialMessage }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Chat with Penguin</h3>
    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
      <p>{initialMessage}</p>
    </div>
    <div className="flex">
      <input 
        type="text" 
        className="flex-1 p-3 border rounded-l-lg" 
        placeholder="Type your message..."
      />
      <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg">
        Send
      </button>
    </div>
  </div>
)

// Icon components
const BookOpen = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
  </svg>
)

const Sparkles = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4.5l-4 4-4-4"></path>
    <path d="M16 19.5l-4-4-4 4"></path>
    <path d="M6 9h12l-6 9"></path>
  </svg>
)

const MessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const Interface = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('journal')
  
  const handleMoodSubmit = (mood) => {
    console.log('Mood submitted:', mood)
    setHasCheckedIn(true)
  }
  
  return (
    <div>
      <section className="py-16" id="mood-checkin">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {!hasCheckedIn ? (
              <div className="max-w-2xl mx-auto">
                <MoodCheckIn onMoodSubmit={handleMoodSubmit} />
              </div>
            ) : (
              <Tabs className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 rounded-lg p-1">
                  <TabsTrigger 
                    value="journal" 
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md ${activeTab === 'journal' ? 'bg-white shadow' : ''}`}
                    onClick={() => setActiveTab('journal')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Journal
                  </TabsTrigger>
                  <TabsTrigger 
                    value="strategies" 
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md ${activeTab === 'strategies' ? 'bg-white shadow' : ''}`}
                    onClick={() => setActiveTab('strategies')}
                  >
                    <Sparkles className="w-4 h-4" />
                    Strategies
                  </TabsTrigger>
                  <TabsTrigger 
                    value="chat" 
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md ${activeTab === 'chat' ? 'bg-white shadow' : ''}`}
                    onClick={() => setActiveTab('chat')}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </TabsTrigger>
                </TabsList>

                {activeTab === 'journal' && (
                  <TabsContent value="journal">
                    <MoodJournal />
                  </TabsContent>
                )}

                {activeTab === 'strategies' && (
                  <TabsContent value="strategies">
                    <CopingStrategies />
                  </TabsContent>
                )}

                {activeTab === 'chat' && (
                  <TabsContent value="chat">
                    <div className="max-w-4xl mx-auto">
                      <ChatInterface 
                        initialMessage="Great job checking in today! I saw you logged your mood. How are you feeling right now? I'm here to listen and support you. 💙" 
                      />
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Interface