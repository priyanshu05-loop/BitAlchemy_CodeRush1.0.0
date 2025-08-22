import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, TrendingUp, Award, BarChart3, Plus, ChevronLeft, ChevronRight, Sparkles, Target } from "lucide-react";
import { Button } from "./ui/button";
import { useMindMateStore, getMoodEmoji, getMoodColor } from "../stores/mindmateStore";
import MoodCheckIn from "./MoodCheckIn";

const MoodDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const { moodEntries, currentMood, profile, moodStreak, getMoodStats } = useMindMateStore();

  const stats = getMoodStats();
  const today = new Date().toISOString().split('T')[0];
  
  // Get last 28 days for calendar view
  const getLast28Days = () => {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last28Days = getLast28Days();
  
  const getMoodForDate = (date) => {
    return moodEntries.find(entry => entry.date === date);
  };

  const getMotivationalMessage = () => {
    if (moodStreak >= 7) {
      return "Amazing! You're on a 7+ day check-in streak! 🔥";
    } else if (moodStreak >= 3) {
      return "Great job staying consistent! Keep it up! ⭐";
    } else if (stats.totalEntries === 0) {
      return "Welcome! Start your mood tracking journey today 💜";
    } else {
      return "Every check-in helps you understand yourself better ✨";
    }
  };

  const getWeeklyInsight = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    
    const recentEntries = moodEntries.filter(entry => entry.date >= weekAgoStr);
    if (recentEntries.length === 0) return null;
    
    const mostCommonMood = recentEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    
    const dominant = Object.entries(mostCommonMood)
      .sort(([,a], [,b]) => b - a)[0];
    
    return {
      mood: dominant[0],
      count: dominant[1],
      total: recentEntries.length
    };
  };

  const weeklyInsight = getWeeklyInsight();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background p-4">
        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center" variants={cardVariants}>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mood Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your emotional journey and discover patterns
            </p>
          </motion.div>

          {/* Current Status */}
          <motion.div 
            className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border rounded-3xl p-6 text-center relative overflow-hidden"
            variants={cardVariants}
          >
            <div className="absolute top-4 right-4">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            
            <div className="text-6xl mb-4 animate-bounce">
              {currentMood ? getMoodEmoji(currentMood) : (profile?.avatar || '💜')}
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Today you're feeling <span className="text-primary">{currentMood || 'unknown'}</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {getMotivationalMessage()}
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-2 rounded-full">
                <Award className="w-4 h-4" />
                <span className="font-medium">{moodStreak} day streak</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-2 rounded-full">
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">{stats.totalEntries} total entries</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Check-in */}
          <motion.div 
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 text-white relative overflow-hidden"
            variants={cardVariants}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-20"></div>
            
            <div className="flex items-center justify-between relative">
              <div>
                <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Quick Check-in
                </h3>
                <p className="text-white/80 text-sm">How are you feeling right now?</p>
              </div>
              <Button 
                onClick={() => setShowMoodCheckIn(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-0 shadow-lg hover:scale-105 transition-transform"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Check In
              </Button>
            </div>
          </motion.div>

          {/* Weekly Insight */}
          {weeklyInsight && (
            <motion.div 
              className="bg-card border rounded-3xl p-6"
              variants={cardVariants}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                This Week's Insight
              </h3>
              
              <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-2xl">
                <div className="text-4xl">{getMoodEmoji(weeklyInsight.mood)}</div>
                <div>
                  <p className="font-medium text-foreground">
                    You've been feeling mostly <span className="text-accent capitalize">{weeklyInsight.mood}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {weeklyInsight.count} out of {weeklyInsight.total} check-ins this week
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Mood Calendar */}
          <motion.div 
            className="bg-card border rounded-3xl p-6"
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Mood Calendar
              <span className="text-sm font-normal text-muted-foreground ml-auto">Last 28 days</span>
            </h3>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {last28Days.map((date) => {
                const moodEntry = getMoodForDate(date);
                const isToday = date === today;
                const isSelected = selectedDate === date;
                
                return (
                  <motion.button
                    key={date}
                    onClick={() => setSelectedDate(isSelected ? null : date)}
                    className={`aspect-square rounded-xl border transition-all relative ${
                      isToday 
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20' 
                        : isSelected
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-1 text-xs h-full flex flex-col items-center justify-center">
                      <div className={`font-medium mb-1 ${
                        isToday ? 'text-primary' : 'text-foreground'
                      }`}>
                        {new Date(date).getDate()}
                      </div>
                      {moodEntry && (
                        <div className="text-lg leading-none">
                          {getMoodEmoji(moodEntry.mood)}
                        </div>
                      )}
                      {isToday && !moodEntry && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedDate && (
              <motion.div 
                className="mt-4 p-4 bg-muted/50 rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {(() => {
                  const entry = getMoodForDate(selectedDate);
                  const date = new Date(selectedDate);
                  return (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        {date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h4>
                      {entry ? (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                          <div>
                            <p className="font-medium capitalize">{entry.mood}</p>
                            <p className="text-sm text-muted-foreground">
                              Intensity: {entry.intensity}/10 • Energy: {entry.energy}
                            </p>
                            {entry.notes && (
                              <p className="text-sm text-muted-foreground mt-1 italic">
                                "{entry.notes}"
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No mood entry for this day</p>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </motion.div>

          {/* Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-card border rounded-3xl p-6"
              variants={cardVariants}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Your Trends
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-xl">
                  <span className="text-sm font-medium text-foreground">Average mood</span>
                  <span className="font-bold text-secondary">{stats.averageMood.toFixed(1)}/6</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-xl">
                  <span className="text-sm font-medium text-foreground">Current streak</span>
                  <span className="font-bold text-success">{moodStreak} days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/10 rounded-xl">
                  <span className="text-sm font-medium text-foreground">Total check-ins</span>
                  <span className="font-bold text-accent">{stats.totalEntries}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card border rounded-3xl p-6"
              variants={cardVariants}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Mood Distribution
              </h3>
              
              <div className="space-y-3">
                {Object.entries(stats.moodDistribution)
                  .sort(([,a], [,b]) => b - a)
                  .map(([mood, count]) => {
                    const percentage = stats.totalEntries > 0 ? (count / stats.totalEntries) * 100 : 0;
                    return (
                      <div key={mood} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getMoodEmoji(mood)}</span>
                            <span className="text-sm font-medium capitalize">{mood}</span>
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`rounded-full h-2 transition-all duration-500 ${getMoodColor(mood)}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMoodCheckIn && (
          <MoodCheckIn onClose={() => setShowMoodCheckIn(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MoodDashboard;