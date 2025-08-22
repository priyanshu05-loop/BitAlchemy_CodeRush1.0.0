import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas as FabricCanvas } from "fabric";
import { Palette, Pen, Edit3, Highlighter, Type, Brush } from "lucide-react";

interface JournalEntryProps {
  date: string;
  onSave: (content: { text: string; drawing: string }) => void;
  initialContent?: { text: string; drawing: string };
  selectedPen: 'pen' | 'pencil' | 'marker';
  selectedColor: string;
}

export const JournalEntry = ({ 
  date, 
  onSave, 
  initialContent = { text: '', drawing: '' }, 
  selectedPen,
  selectedColor 
}: JournalEntryProps) => {
  const [content, setContent] = useState(initialContent.text);
  const [activeTab, setActiveTab] = useState<'write' | 'draw'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 400,
      backgroundColor: 'transparent',
    });

    // Initialize the freeDrawingBrush
    canvas.freeDrawingBrush.color = getColorValue(selectedColor);
    canvas.freeDrawingBrush.width = getPenWidth(selectedPen);
    canvas.isDrawingMode = true;

    // Load initial drawing if exists
    if (initialContent.drawing) {
      canvas.loadFromJSON(initialContent.drawing, () => {
        canvas.renderAll();
      });
    }

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Update canvas settings when pen/color changes
  useEffect(() => {
    if (!fabricCanvas) return;
    
    fabricCanvas.freeDrawingBrush.color = getColorValue(selectedColor);
    fabricCanvas.freeDrawingBrush.width = getPenWidth(selectedPen);
  }, [selectedColor, selectedPen, fabricCanvas]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const getCursorClass = () => {
    switch (selectedPen) {
      case 'pen': return 'cursor-pen';
      case 'pencil': return 'cursor-pencil';
      case 'marker': return 'cursor-marker';
      default: return 'cursor-pen';
    }
  };

  const getTextColor = () => {
    switch (selectedColor) {
      case 'blue': return 'text-ink-blue';
      case 'black': return 'text-ink-black';
      case 'purple': return 'text-ink-purple';
      default: return 'text-ink-black';
    }
  };

  const getColorValue = (color: string) => {
    switch (color) {
      case 'blue': return '#2563eb';
      case 'black': return '#1f2937';
      case 'purple': return '#7c3aed';
      default: return '#1f2937';
    }
  };

  const getPenWidth = (pen: string) => {
    switch (pen) {
      case 'pen': return 2;
      case 'pencil': return 1;
      case 'marker': return 5;
      default: return 2;
    }
  };

  const handleSave = () => {
    const drawingData = fabricCanvas ? JSON.stringify(fabricCanvas.toJSON()) : '';
    onSave({ text: content, drawing: drawingData });
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = 'transparent';
      fabricCanvas.renderAll();
    }
  };

  return (
    <Card className="paper-texture shadow-paper border-2 border-sage/30">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-handwritten text-4xl text-ink-black mb-2">
            Dear Diary,
          </h1>
          <div className="flex items-center justify-between">
            <p className="font-handwritten text-xl text-muted-foreground">
              DATE: {date}
            </p>
            <Badge variant="secondary" className="font-handwritten text-sm">
              Today's Entry
            </Badge>
          </div>
        </div>

        {/* Writing Area */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'write' | 'draw')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-sage/20 border-sage/30">
            <TabsTrigger value="write" className="flex items-center gap-2 font-handwritten">
              <Type className="h-4 w-4" />
              Write
            </TabsTrigger>
            <TabsTrigger value="draw" className="flex items-center gap-2 font-handwritten">
              <Brush className="h-4 w-4" />
              Draw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-6 mt-6">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="How was your day? What made you smile? What challenged you? Write your thoughts here..."
              className={`
                w-full min-h-[400px] resize-none bg-transparent border-none outline-none
                font-handwritten text-lg leading-8 placeholder:text-muted-foreground/60
                ${getCursorClass()} ${getTextColor()}
              `}
              style={{ 
                backgroundImage: `repeating-linear-gradient(
                  transparent,
                  transparent 31px,
                  hsl(var(--border)) 32px
                )`,
                lineHeight: '32px',
                paddingTop: '0px'
              }}
            />
          </TabsContent>

          <TabsContent value="draw" className="space-y-6 mt-6">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className={`border-2 border-dashed border-sage/30 rounded-lg bg-paper-texture ${getCursorClass()}`}
              />
              <div className="absolute top-2 right-2">
                <Button
                  onClick={clearCanvas}
                  variant="outline"
                  size="sm"
                  className="font-handwritten text-xs bg-white/80 hover:bg-white/90"
                >
                  Clear
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSave}
            className="font-handwritten text-lg bg-sage hover:bg-sage/90 text-primary-foreground shadow-lg transition-smooth"
          >
            Save Entry
          </Button>
        </div>
      </div>
    </Card>
  );
};