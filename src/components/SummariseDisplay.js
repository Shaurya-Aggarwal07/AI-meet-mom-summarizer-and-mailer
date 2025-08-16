"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function SummariseDisplay({ summary }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Meeting Summary</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
          {summary}
        </div>
      </CardContent>
    </Card>
  );
}