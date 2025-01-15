import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Copy, Check } from "lucide-react";

interface CodeEditorProps {
  onAnalyze: (code: string) => Promise<void>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ onAnalyze }) => {
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to analyze");
      return;
    }
    setIsAnalyzing(true);
    try {
      await onAnalyze(code);
    } catch (error) {
      toast.error("Failed to analyze code");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Code copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <Card className="p-4 bg-code-background">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Code Input</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          disabled={!code}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-code min-h-[200px] bg-code-background text-code-foreground"
        placeholder="Enter your code here..."
      />
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !code.trim()}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Code"
          )}
        </Button>
      </div>
    </Card>
  );
};