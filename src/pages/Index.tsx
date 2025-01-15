import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { AnalysisResult, Issue } from "@/components/AnalysisResult";

const mockAnalyzeCode = async (code: string, language: string): Promise<Issue[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const issues: Issue[] = [];
  const lines = code.split('\n');
  
  // Language-specific analysis rules
  switch (language) {
    case 'javascript':
    case 'typescript':
      // Check for console.log statements
      const consoleLogLine = lines.findIndex(line => line.includes('console.log'));
      if (consoleLogLine !== -1) {
        issues.push({
          type: 'warning',
          message: 'Console statements should be removed in production code',
          line: consoleLogLine + 1,
          code: lines[consoleLogLine].trim(),
          suggestion: 'Consider using a proper logging service instead'
        });
      }
      
      // Check for missing semicolons
      const firstLineWithoutSemicolon = lines.findIndex(line => 
        line.trim().length > 0 && !line.trim().endsWith(';') && 
        !line.trim().endsWith('{') && !line.trim().endsWith('}')
      );
      if (firstLineWithoutSemicolon !== -1) {
        issues.push({
          type: 'error',
          message: 'Missing semicolons',
          line: firstLineWithoutSemicolon + 1,
          code: lines[firstLineWithoutSemicolon].trim(),
          suggestion: 'Add semicolons at the end of statements'
        });
      }
      break;

    case 'python':
      // Check for print statements
      const printLine = lines.findIndex(line => line.includes('print('));
      if (printLine !== -1) {
        issues.push({
          type: 'warning',
          message: 'Print statements should be replaced with proper logging',
          line: printLine + 1,
          code: lines[printLine].trim(),
          suggestion: 'Use logging module instead of print statements'
        });
      }
      
      // Check for incorrect indentation
      lines.forEach((line, index) => {
        if (line.trim().length > 0 && line.startsWith(' ') && line.length % 4 !== 0) {
          issues.push({
            type: 'error',
            message: 'Incorrect indentation',
            line: index + 1,
            code: line,
            suggestion: 'Use 4 spaces for indentation'
          });
        }
      });
      break;

    case 'java':
      // Check for System.out.println
      const printlnLine = lines.findIndex(line => line.includes('System.out.println'));
      if (printlnLine !== -1) {
        issues.push({
          type: 'warning',
          message: 'System.out.println should be replaced with proper logging',
          line: printlnLine + 1,
          code: lines[printlnLine].trim(),
          suggestion: 'Use a logging framework like SLF4J'
        });
      }
      break;

    case 'cpp':
      // Check for cout statements
      const coutLine = lines.findIndex(line => line.includes('cout'));
      if (coutLine !== -1) {
        issues.push({
          type: 'warning',
          message: 'Consider using proper logging instead of cout',
          line: coutLine + 1,
          code: lines[coutLine].trim(),
          suggestion: 'Use a logging library for C++'
        });
      }
      break;
  }
  
  return issues;
};

const Index = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const handleAnalyze = async (code: string, language: string) => {
    const analysisResult = await mockAnalyzeCode(code, language);
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