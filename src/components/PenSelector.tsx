import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pen, Edit3, Highlighter, Palette } from "lucide-react";

interface PenSelectorProps {
  selectedPen: 'pen' | 'pencil' | 'marker';
  selectedColor: 'blue' | 'black' | 'purple';
  onPenChange: (pen: 'pen' | 'pencil' | 'marker') => void;
  onColorChange: (color: 'blue' | 'black' | 'purple') => void;
}

export const PenSelector = ({
  selectedPen,
  selectedColor,
  onPenChange,
  onColorChange
}: PenSelectorProps) => {
  const pens = [
    { id: 'pen' as const, name: 'Pen', icon: Pen },
    { id: 'pencil' as const, name: 'Pencil', icon: Edit3 },
    { id: 'marker' as const, name: 'Marker', icon: Highlighter }
  ];

  const colors = [
    { id: 'black' as const, name: 'Black', class: 'bg-ink-black' },
    { id: 'blue' as const, name: 'Blue', class: 'bg-ink-blue' },
    { id: 'purple' as const, name: 'Purple', class: 'bg-ink-purple' }
  ];

  return (
    <Card className="paper-texture shadow-paper border-sage/30">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-sage" />
          <h3 className="font-handwritten text-xl text-ink-black">Writing Tools</h3>
        </div>
        
        {/* Pen Type Selector */}
        <div className="space-y-3 mb-6">
          <p className="font-inter text-sm text-muted-foreground">Choose your pen type:</p>
          <div className="grid grid-cols-3 gap-2">
            {pens.map((pen) => {
              const Icon = pen.icon;
              return (
                <Button
                  key={pen.id}
                  onClick={() => onPenChange(pen.id)}
                  variant={selectedPen === pen.id ? "default" : "outline"}
                  className={`
                    h-16 flex flex-col gap-1 transition-smooth
                    ${selectedPen === pen.id 
                      ? 'bg-sage text-primary-foreground shadow-lg' 
                      : 'hover:bg-sage-light border-sage/30'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-handwritten">{pen.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-3">
          <p className="font-inter text-sm text-muted-foreground">Choose ink color:</p>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorChange(color.id)}
                className={`
                  w-8 h-8 rounded-full ${color.class} transition-smooth
                  ${selectedColor === color.id 
                    ? 'ring-2 ring-sage ring-offset-2 ring-offset-background scale-110' 
                    : 'hover:scale-105'
                  }
                `}
                title={color.name}
              />
            ))}
          </div>
          <Badge variant="outline" className="font-handwritten text-xs">
            Selected: {colors.find(c => c.id === selectedColor)?.name} {pens.find(p => p.id === selectedPen)?.name}
          </Badge>
        </div>
      </div>
    </Card>
  );
};