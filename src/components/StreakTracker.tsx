import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Zap, Heart, Star, Trophy } from "lucide-react";

interface StreakTrackerProps {
  currentStreak: number;
  totalEntries: number;
  badges: string[];
}

export const StreakTracker = ({
  currentStreak,
  totalEntries,
  badges
}: StreakTrackerProps) => {
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your journey today! 🌱";
    if (currentStreak < 7) return "Building momentum! 🚀";
    if (currentStreak < 30) return "You're on fire! 🔥";
    return "Amazing dedication! 🏆";
  };

  const getStreakColor = () => {
    if (currentStreak === 0) return "text-muted-foreground";
    if (currentStreak < 7) return "text-warm-orange";
    if (currentStreak < 30) return "text-dusty-rose";
    return "text-sage";
  };

  const badgeIcons = {
    'first-entry': Star,
    'week-warrior': Zap,
    'month-master': Trophy,
    'consistency-champion': Award,
    'heart-healer': Heart
  };

  const milestones = [
    { days: 7, title: "Week Warrior", description: "7 days strong!" },
    { days: 14, title: "Two Week Wonder", description: "Consistency is key" },
    { days: 30, title: "Month Master", description: "Free therapy session unlocked!" },
    { days: 60, title: "Mindful Master", description: "You're amazing!" },
    { days: 100, title: "Wellness Warrior", description: "Incredible dedication!" }
  ];

  const nextMilestone = milestones.find(m => m.days > currentStreak);

  return (
    <div className="space-y-4">
      {/* Current Streak */}
      <Card className="paper-texture shadow-paper border-sage/30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-warm-orange" />
            <h3 className="font-handwritten text-2xl text-ink-black">Current Streak</h3>
          </div>
          
          <div className="text-center space-y-2">
            <div className={`text-6xl font-bold ${getStreakColor()}`}>
              {currentStreak}
            </div>
            <p className="text-lg font-handwritten text-muted-foreground">
              {currentStreak === 1 ? 'day' : 'days'}
            </p>
            <p className="font-handwritten text-lg text-sage">
              {getStreakMessage()}
            </p>
          </div>

          {/* Progress to next milestone */}
          {nextMilestone && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-inter text-muted-foreground">
                  Next: {nextMilestone.title}
                </span>
                <span className="font-inter text-muted-foreground">
                  {currentStreak}/{nextMilestone.days} days
                </span>
              </div>
              <div className="w-full bg-sage-light/30 rounded-full h-2">
                <div 
                  className="bg-sage h-2 rounded-full transition-smooth"
                  style={{ width: `${Math.min((currentStreak / nextMilestone.days) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs font-handwritten text-dusty-rose text-center">
                {nextMilestone.description}
              </p>
            </div>
          )}

          {/* 30-day reward highlight */}
          {currentStreak >= 30 && (
            <div className="mt-4 p-4 bg-gradient-warm rounded-lg">
              <div className="flex items-center gap-2 text-center">
                <Trophy className="h-5 w-5 text-warm-orange" />
                <p className="font-handwritten text-lg text-ink-black">
                  🎉 Free therapy session unlocked! Check your rewards.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <Card className="paper-texture shadow-paper border-sage/30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-dusty-rose" />
            <h3 className="font-handwritten text-xl text-ink-black">Your Journey</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-dusty-rose">{totalEntries}</div>
              <p className="text-sm font-handwritten text-muted-foreground">Total Entries</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-orange">{badges.length}</div>
              <p className="text-sm font-handwritten text-muted-foreground">Badges Earned</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <Card className="paper-texture shadow-paper border-sage/30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-sage" />
            <h3 className="font-handwritten text-xl text-ink-black">Achievements</h3>
          </div>
          
          {badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, index) => {
                const Icon = badgeIcons[badge as keyof typeof badgeIcons] || Star;
                return (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="p-3 flex items-center gap-2 bg-sage-light text-ink-black"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-handwritten capitalize">
                      {badge.replace('-', ' ')}
                    </span>
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-handwritten">
              Start writing to earn your first badge! 🌟
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};