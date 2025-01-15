import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Copy, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CodeEditorProps {
  onAnalyze: (code: string, language: string) => Promise<void>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ onAnalyze }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to analyze");
      return;
    }
    setIsAnalyzing(true);
    try {
      await onAnalyze(code, language);
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

  const lines = code.split('\n');

  return (
    <Card className="p-4 bg-code-background">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Code Input</h2>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          disabled={!code}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="relative font-mono text-sm">
        <div className="flex">
          <div className="pr-4 text-gray-500 select-none text-right">
            {lines.map((_, i) => (
              <div key={i + 1} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 font-code min-h-[200px] bg-code-background text-code-foreground resize-none leading-6 outline-none"
            placeholder="Enter your code here..."
            style={{
              lineHeight: '1.5rem',
              padding: 0,
              border: 'none',
            }}
          />
        </div>
      </div>
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