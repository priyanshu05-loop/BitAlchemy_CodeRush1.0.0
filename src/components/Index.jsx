import { useState, useEffect } from "react";
import { JournalEntry } from "./JournalEntry";
import { PenSelector } from "./PenSelector";
import { StreakTracker } from "./StreakTracker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";

// Since toast is used but not defined in the project, we'll create a simple implementation
const toast = {
  success: (message) => console.log("Success:", message),
  error: (message) => console.log("Error:", message)
};

interface JournalData {
  entries: Record<string, { text: string; drawing: string }>;
  streak: number;
  totalEntries: number;
  badges: string[];
  lastEntryDate: string;
}

const Index = () => {
  const [selectedPen, setSelectedPen] = useState<'pen' | 'pencil' | 'marker'>('pen');
  const [selectedColor, setSelectedColor] = useState<'blue' | 'black' | 'purple'>('black');
  const [journalData, setJournalData] = useState<JournalData>({
    entries: {},
    streak: 0,
    totalEntries: 0,
    badges: [],
    lastEntryDate: ''
  });

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const todayKey = new Date().toISOString().split('T')[0];

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('journalData');
    if (saved) {
      const data = JSON.parse(saved);
      setJournalData(data);
      updateStreak(data);
    }
  }, []);

  // Update streak calculation
  const updateStreak = (data: JournalData) => {
    const dates = Object.keys(data.entries).sort().reverse();
    if (dates.length === 0) return;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
      const entryDate = new Date(dates[i]);
      entryDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      
      if (entryDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    setJournalData(prev => ({ ...prev, streak }));
  };

  // Save journal entry
  const handleSaveEntry = (content: { text: string; drawing: string }) => {
    if (!content.text.trim() && !content.drawing.trim()) {
      toast.error("Please write something or draw before saving!");
      return;
    }

    const newData = {
      ...journalData,
      entries: { ...journalData.entries, [todayKey]: content },
      totalEntries: journalData.totalEntries + (journalData.entries[todayKey] ? 0 : 1),
      lastEntryDate: todayKey
    };

    // Award badges
    const newBadges = [...journalData.badges];
    if (newData.totalEntries === 1 && !newBadges.includes('first-entry')) {
      newBadges.push('first-entry');
      toast.success("🌟 First Entry badge earned!");
    }
    if (newData.streak >= 7 && !newBadges.includes('week-warrior')) {
      newBadges.push('week-warrior');
      toast.success("⚡ Week Warrior badge earned!");
    }
    if (newData.streak >= 30 && !newBadges.includes('month-master')) {
      newBadges.push('month-master');
      toast.success("🏆 Month Master badge earned! Free therapy session unlocked!");
    }

    newData.badges = newBadges;
    setJournalData(newData);
    localStorage.setItem('journalData', JSON.stringify(newData));
    updateStreak(newData);
    
    toast.success("Entry saved! Keep up the great work! ✨");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-warm shadow-paper">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="font-handwritten text-5xl text-ink-black mb-2">
              MindfulScribe 🌱
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Your personal mental health companion. Write, reflect, and grow one entry at a time.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Journal Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Message */}
            <Card className="paper-texture shadow-paper border-sage/30">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-dusty-rose" />
                  <h2 className="font-handwritten text-2xl text-ink-black">
                    Welcome back, friend! 💚
                  </h2>
                </div>
                <p className="font-inter text-muted-foreground">
                  Today is a new day to reflect, grow, and take care of your mental wellbeing. 
                  What's on your mind?
                </p>
              </div>
            </Card>

            {/* Pen Selector */}
            <PenSelector
              selectedPen={selectedPen}
              selectedColor={selectedColor}
              onPenChange={setSelectedPen}
              onColorChange={setSelectedColor}
            />

            {/* Journal Entry */}
            <JournalEntry
              date={today}
              onSave={handleSaveEntry}
              initialContent={journalData.entries[todayKey] || { text: '', drawing: '' }}
              selectedPen={selectedPen}
              selectedColor={selectedColor}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Tracker */}
            <StreakTracker
              currentStreak={journalData.streak}
              totalEntries={journalData.totalEntries}
              badges={journalData.badges}
            />

            {/* Quick Stats */}
            <Card className="paper-texture shadow-paper border-sage/30">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-warm-orange" />
                  <h3 className="font-handwritten text-xl text-ink-black">Mental Health Tips</h3>
                </div>
                <div className="space-y-3 text-sm font-inter">
                  <p className="text-muted-foreground">
                    💡 <strong>Daily Reflection:</strong> Writing helps process emotions and reduce stress.
                  </p>
                  <p className="text-muted-foreground">
                    🌸 <strong>Consistency:</strong> Small daily practices create lasting positive changes.
                  </p>
                  <p className="text-muted-foreground">
                    🎯 <strong>Goal:</strong> Reach a 30-day streak for your free therapy session!
                  </p>
                </div>
              </div>
            </Card>

            {/* Support */}
            <Card className="paper-texture shadow-paper border-sage/30">
              <div className="p-6 text-center">
                <h3 className="font-handwritten text-xl text-ink-black mb-3">
                  Need Support? 💙
                </h3>
                <p className="font-inter text-sm text-muted-foreground mb-4">
                  Remember, seeking help is a sign of strength, not weakness.
                </p>
                <Button variant="gentle" className="w-full">
                  Find Resources
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;