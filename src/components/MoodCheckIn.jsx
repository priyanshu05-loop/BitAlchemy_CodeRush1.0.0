import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { useMindMateStore, getMoodEmoji } from "../stores/mindmateStore";

const MoodCheckIn = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState('emotion'); // 'emotion' | 'intensity' | 'coping'
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [energy, setEnergy] = useState('medium'); // 'low' | 'medium' | 'high'
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [copingStrategies, setCopingStrategies] = useState([]);

  const { addMoodEntry, addChatMessage, profile } = useMindMateStore();

  const primaryMoods = [
    { mood: 'great', emoji: '😊', label: 'Great', color: 'bg-green-500' },
    { mood: 'calm', emoji: '😌', label: 'Calm', color: 'bg-blue-400' },
    { mood: 'excited', emoji: '🤩', label: 'Excited', color: 'bg-yellow-400' },
    { mood: 'sad', emoji: '😢', label: 'Sad', color: 'bg-blue-500' },
    { mood: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-orange-500' },
    { mood: 'tired', emoji: '😴', label: 'Tired', color: 'bg-purple-500' },
  ];

  const moodInfluencers = [
    'Work', 'Relationships', 'Health', 'School', 'Money', 'Family', 
    'Weather', 'Sleep', 'Exercise', 'Social Media', 'Food', 'News'
  ];

  const getCopingStrategies = (mood) => {
    const strategies = {
      great: ['Share your joy with someone', 'Journal about what went well', 'Plan something fun'],
      calm: ['Enjoy this peaceful moment', 'Practice mindfulness', 'Take a gentle walk'],
      excited: ['Channel this energy positively', 'Start a new project', 'Dance to music'],
      sad: ['Reach out to a friend', 'Practice self-compassion', 'Watch comfort shows'],
      anxious: ['Try breathing exercises', 'Ground yourself (5-4-3-2-1)', 'Take a break'],
      tired: ['Rest when possible', 'Gentle stretching', 'Hydrate and nourish yourself']
    };
    return strategies[mood] || [];
  };

  const handleComplete = () => {
    if (!selectedMood) return;

    // Add mood entry
    addMoodEntry({
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      intensity,
      energy,
      notes,
      tags: selectedTags
    });

    // Add a chat message about the mood check-in
    const userName = profile?.name || 'friend';
    const style = profile?.communicationStyle || 'gen-z';
    
    const responses = {
      'gen-z': `Thanks for checking in, ${userName}! I see you're feeling ${selectedMood} ${getMoodEmoji(selectedMood)} Your mood streak is looking good! 💜`,
      'professional': `Thank you for completing your mood check-in, ${userName}. I've recorded that you're feeling ${selectedMood}. This helps us track your emotional patterns.`,
      'supportive': `I appreciate you taking time to check in with yourself, ${userName}. You're feeling ${selectedMood} right now ${getMoodEmoji(selectedMood)} - remember, all feelings are valid. 🌸`
    };

    addChatMessage({
      type: 'ai',
      content: responses[style],
      timestamp: new Date()
    });

    onClose();
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleCopingStrategy = (strategy) => {
    setCopingStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const stepVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const EmotionStep = () => (
    <motion.div
      key="emotion"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          How are you feeling right now?
        </h2>
        <p className="text-muted-foreground">
          Choose the emotion that best describes your current state
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {primaryMoods.map((moodOption) => (
          <motion.button
            key={moodOption.mood}
            onClick={() => setSelectedMood(moodOption.mood)}
            className={`p-4 rounded-2xl border-2 transition-all ${
              selectedMood === moodOption.mood
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-border bg-card hover:border-primary/50 hover:scale-102'
            }`}
            whileHover={{ scale: selectedMood === moodOption.mood ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-4xl mb-2">{moodOption.emoji}</div>
            <div className="font-medium text-foreground">{moodOption.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => setCurrentStep('intensity')}
          disabled={!selectedMood}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-3"
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const IntensityStep = () => (
    <motion.div
      key="intensity"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          How intense is this feeling?
        </h2>
        <p className="text-muted-foreground">
          Help us understand the strength of your emotion
        </p>
      </div>

      {selectedMood && (
        <div className="text-center p-6 bg-card rounded-2xl border">
          <div className="text-6xl mb-4">{getMoodEmoji(selectedMood)}</div>
          <div className="text-xl font-semibold text-foreground mb-2">
            {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
          </div>
          <div className="text-lg text-primary font-medium">
            Intensity: {intensity}/10
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="px-2">
          <Slider
            value={[intensity]}
            onValueChange={(value) => setIntensity(value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            How's your energy level?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setEnergy(level)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  energy === level
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-card border-border hover:border-secondary/50'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            What's influencing your mood? (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {moodInfluencers.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground hover:bg-accent/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Anything specific on your mind? (Optional)
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share what's on your mind..."
            className="rounded-xl"
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('emotion')}
          className="flex-1 rounded-xl py-3"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep('coping')}
          className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const CopingStep = () => {
    const strategies = selectedMood ? getCopingStrategies(selectedMood) : [];
    const isPositiveMood = selectedMood && ['great', 'calm', 'excited'].includes(selectedMood);

    return (
      <motion.div
        key="coping"
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isPositiveMood ? "What's helping you today?" : "What might help right now?"}
          </h2>
          <p className="text-muted-foreground">
            {isPositiveMood 
              ? "Let's celebrate what's working for you!" 
              : "Here are some strategies that might help"
            }
          </p>
        </div>

        <div className="space-y-4">
          {strategies.map((strategy) => (
            <motion.button
              key={strategy}
              onClick={() => toggleCopingStrategy(strategy)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                copingStrategies.includes(strategy)
                  ? 'bg-success/10 border-success text-success'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  copingStrategies.includes(strategy)
                    ? 'border-success bg-success'
                    : 'border-border'
                }`}>
                  {copingStrategies.includes(strategy) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{strategy}</span>
              </div>
            </motion.button>
          ))}

          <button
            onClick={() => toggleCopingStrategy("I'm good for now")}
            className="w-full p-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
          >
            I'm good for now 👍
          </button>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('intensity')}
            className="flex-1 rounded-xl py-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleComplete}
            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
          >
            Complete Check-in ✨
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-background rounded-3xl shadow-2xl border w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              <div className="w-2 h-2 rounded-full bg-primary/25"></div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 'emotion' && <EmotionStep />}
            {currentStep === 'intensity' && <IntensityStep />}
            {currentStep === 'coping' && <CopingStep />}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodCheckIn;