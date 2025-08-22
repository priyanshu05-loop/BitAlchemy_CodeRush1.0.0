import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore but not using it for this version

// Helper function to convert base64 to ArrayBuffer (for potential audio, though not used here)
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

// Helper function to convert PCM to WAV (for potential audio, though not used here)
const pcmToWav = (pcm16, sampleRate) => {
    const dataLength = pcm16.length * 2; // 2 bytes per sample (Int16)
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // WAV header
    // RIFF identifier
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true); // file length - 8
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, 1, true); // audio format (1 = PCM)
    view.setUint16(22, 1, true); // num channels
    view.setUint32(24, sampleRate, true); // sample rate
    view.setUint32(28, sampleRate * 2, true); // byte rate (sample rate * num channels * bytes per sample)
    view.setUint16(32, 2, true); // block align (num channels * bytes per sample)
    view.setUint16(34, 16, true); // bits per sample
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true); // data chunk size

    // Write PCM data
    let offset = 44;
    for (let i = 0; i < pcm16.length; i++, offset += 2) {
        view.setInt16(offset, pcm16[i], true);
    }

    return new Blob([view], { type: 'audio/wav' });
};

const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
};

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const chatContainerRef = useRef(null);

    const appId = import.meta.env.VITE_APP_ID || 'default-app-id';
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
    const initialAuthToken = import.meta.env.VITE_INITIAL_AUTH_TOKEN || null;

    useEffect(() => {
        // Initialize Firebase
        if (Object.keys(firebaseConfig).length > 0) {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            // const db = getFirestore(app); // Not using firestore for this version

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    try {
                        if (initialAuthToken) {
                            await signInWithCustomToken(auth, initialAuthToken);
                        } else {
                            await signInAnonymously(auth);
                        }
                    } catch (error) {
                        console.error("Firebase authentication error:", error);
                    }
                }
            });
        }
    }, [firebaseConfig, initialAuthToken]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (userInput.trim() === '') return;

        const newUserMessage = { role: 'user', text: userInput };
        setChatHistory((prev) => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        // System instruction for the bot to adopt a Gen-Z, funny, and supportive persona, with a focus on shorter replies
        // Added instruction to start new steps on a new line
        const systemInstruction = {
            role: 'user', // Treat system instruction as a user message
            parts: [{ text: "You are a Mind Wellness Chatbot for Gen-Z. Respond in a funny, relatable, and encouraging way, using Gen-Z slang and keeping the tone light but supportive. Keep your responses concise and to the point. When giving steps or a list, ensure each item starts on a new line. No cap, help them navigate their feelings and give good advice without being cringe." }]
        };

        const currentChatHistoryForModel = [
            systemInstruction, // Add the system instruction
            ...chatHistory.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: newUserMessage.text }] } // The current user message
        ];

        let retryCount = 0;
        const maxRetries = 5;
        const baseDelay = 1000; // 1 second

        while (retryCount < maxRetries) {
            try {
                const payload = {
                    contents: currentChatHistoryForModel // Use the modified chat history with system instruction
                };

                const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
                
                // Check if API key is provided
                if (!apiKey || apiKey === "your-gemini-api-key-here") {
                    setChatHistory((prev) => [...prev, { role: 'bot', text: 'Oops! Looks like the API key is missing. Please add your Gemini API key to the .env file to get started!' }]);
                    setIsLoading(false);
                    return;
                }
                
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const botResponseText = result.candidates[0].content.parts[0].text;
                    setChatHistory((prev) => [...prev, { role: 'bot', text: botResponseText }]);
                } else {
                    setChatHistory((prev) => [...prev, { role: 'bot', text: 'Low-key, I\'m having a moment. Can\'t compute right now. Try again?' }]);
                    console.error("Unexpected API response structure:", result);
                }
                break; // Exit retry loop on success

            } catch (error) {
                console.error("Error calling Gemini API:", error);
                retryCount++;
                if (retryCount < maxRetries) {
                    const delay = baseDelay * Math.pow(2, retryCount - 1); // Exponential backoff
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    setChatHistory((prev) => [...prev, { role: 'bot', text: 'My internet connection is giving major main character energy, but not in a good way. Try again later!' }]);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4 font-sans antialiased">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl flex flex-col h-[85vh] overflow-hidden border border-orange-100">
                <div className="bg-orange-500 text-white p-5 rounded-t-3xl shadow-md">
                    <h1 className="text-3xl font-extrabold text-center tracking-tight">Mitra AI</h1>
                    {userId && <p className="text-sm text-center opacity-80 mt-1">User ID: {userId}</p>}
                </div>

                <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
                    {chatHistory.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-600 text-lg italic">
                            Spill the tea! How are you feeling today?
                        </div>
                    ) : (
                        chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm break-words
                                        ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-br-none'
                                            : 'bg-blue-50 text-gray-700 rounded-bl-none'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[75%] px-5 py-3 rounded-2xl shadow-sm bg-blue-50 text-gray-700 rounded-bl-none">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white rounded-b-3xl shadow-lg flex items-center space-x-3">
                    <input
                        type="text"
                        className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="How are you feeling today? No cap, tell me everything!"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || userInput.trim() === ''}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all duration-200
                                   disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;