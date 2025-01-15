import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface Issue {
  type: 'error' | 'warning';
  message: string;
  line?: number;
  suggestion?: string;
}

interface AnalysisResultProps {
  issues: Issue[];
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ issues }) => {
  if (!issues.length) return null;

  return (
    <Card className="p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Analysis Results</h2>
      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-secondary border border-border"
          >
            <div className="flex items-start gap-2">
              {issue.type === 'error' ? (
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={issue.type === 'error' ? "destructive" : "secondary"}>
                    {issue.type}
                  </Badge>
                  {issue.line && (
                    <span className="text-sm text-muted-foreground">
                      Line {issue.line}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-2">{issue.message}</p>
                {issue.suggestion && (
                  <div className="mt-2 p-2 rounded bg-muted">
                    <p className="text-sm font-code">{issue.suggestion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};