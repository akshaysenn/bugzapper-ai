import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { AnalysisResult, Issue } from "@/components/AnalysisResult";

const mockAnalyzeCode = async (code: string): Promise<Issue[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const issues: Issue[] = [];
  
  // Simple demo analysis
  if (code.includes('console.log')) {
    issues.push({
      type: 'warning',
      message: 'Console statements should be removed in production code',
      line: code.split('\n').findIndex(line => line.includes('console.log')) + 1,
      suggestion: 'Consider using a proper logging service instead'
    });
  }
  
  if (!code.includes(';')) {
    issues.push({
      type: 'error',
      message: 'Missing semicolons',
      suggestion: 'Add semicolons at the end of statements'
    });
  }
  
  return issues;
};

const Index = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const handleAnalyze = async (code: string) => {
    const analysisResult = await mockAnalyzeCode(code);
    setIssues(analysisResult);
  };

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        AI Code Analyzer
      </h1>
      <CodeEditor onAnalyze={handleAnalyze} />
      <AnalysisResult issues={issues} />
    </div>
  );
};

export default Index;