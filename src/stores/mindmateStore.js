import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mood types
export const MOODS = ['great', 'calm', 'excited', 'sad', 'anxious', 'tired'];

// Get emoji for mood
export const getMoodEmoji = (mood) => {
  const emojis = {
    great: '😊',
    calm: '😌',
    excited: '🤩',
    sad: '😢',
    anxious: '😰',
    tired: '😴'
  };
  return emojis[mood] || '😐';
};

// Get color for mood
export const getMoodColor = (mood) => {
  const colors = {
    great: 'bg-green-500',
    calm: 'bg-blue-400',
    excited: 'bg-yellow-400',
    sad: 'bg-blue-500',
    anxious: 'bg-orange-500',
    tired: 'bg-purple-500'
  };
  return colors[mood] || 'bg-gray-500';
};

// Mood store
export const useMindMateStore = create(
  persist(
    (set, get) => ({
      // Profile
      profile: {
        name: 'User',
        communicationStyle: 'gen-z',
        avatar: '💜'
      },
      
      // Mood entries
      moodEntries: [],
      
      // Current mood
      currentMood: null,
      
      // Mood streak
      moodStreak: 0,
      
      // Actions
      addMoodEntry: (entry) => {
        const { moodEntries } = get();
        const newEntry = {
          id: Date.now(),
          ...entry,
          timestamp: new Date().toISOString()
        };
        
        set({ 
          moodEntries: [...moodEntries, newEntry],
          currentMood: entry.mood
        });
        
        // Update streak
        get().updateMoodStreak();
      },
      
      updateMoodStreak: () => {
        const { moodEntries } = get();
        if (moodEntries.length === 0) {
          set({ moodStreak: 0 });
          return;
        }
        
        // Sort entries by date
        const sortedEntries = [...moodEntries].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        
        // Count consecutive days
        let streak = 1;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lastEntryDate = new Date(sortedEntries[0].date);
        lastEntryDate.setHours(0, 0, 0, 0);
        
        // Check if last entry was today
        if (lastEntryDate.getTime() !== today.getTime()) {
          // If last entry wasn't today, streak is 1 if it was yesterday, 0 otherwise
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastEntryDate.getTime() === yesterday.getTime()) {
            streak = 1;
          } else {
            streak = 0;
          }
        } else {
          // If last entry was today, count consecutive days
          for (let i = 0; i < sortedEntries.length - 1; i++) {
            const currentDate = new Date(sortedEntries[i].date);
            currentDate.setHours(0, 0, 0, 0);
            
            const nextDate = new Date(sortedEntries[i + 1].date);
            nextDate.setHours(0, 0, 0, 0);
            
            const diffTime = currentDate.getTime() - nextDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              streak++;
            } else {
              break;
            }
          }
        }
        
        set({ moodStreak: streak });
      },
      
      getMoodStats: () => {
        const { moodEntries } = get();
        
        if (moodEntries.length === 0) {
          return {
            totalEntries: 0,
            averageMood: 0,
            moodDistribution: {}
          };
        }
        
        // Mood values for averaging (1-6)
        const moodValues = {
          great: 6,
          excited: 5,
          calm: 4,
          tired: 3,
          anxious: 2,
          sad: 1
        };
        
        let totalMoodValue = 0;
        const moodDistribution = {};
        
        moodEntries.forEach(entry => {
          totalMoodValue += moodValues[entry.mood] || 0;
          moodDistribution[entry.mood] = (moodDistribution[entry.mood] || 0) + 1;
        });
        
        const averageMood = totalMoodValue / moodEntries.length;
        
        return {
          totalEntries: moodEntries.length,
          averageMood,
          moodDistribution
        };
      },
      
      addChatMessage: (message) => {
        // This would typically add a message to a chat array
        // For now, we'll just log it
        console.log('Chat message added:', message);
      },
      
      setProfile: (profile) => set({ profile })
    }),
    {
      name: 'mindmate-storage',
      partialize: (state) => ({ 
        moodEntries: state.moodEntries,
        moodStreak: state.moodStreak,
        currentMood: state.currentMood
      })
    }
  )
);