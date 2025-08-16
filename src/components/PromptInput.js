"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export function PromptInput({ onSummarise, isDisabled, isLoading }) {
  const [customPrompt, setCustomPrompt] = useState(
    "Summarize the key points of this meeting transcript, including any decisions made and action items."
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customise Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter custom instructions for the AI..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="min-h-[100px]"
        />
        <Button 
          onClick={() => onSummarise(customPrompt)} 
          disabled={isDisabled}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Summary...
            </>
          ) : (
            "Generate Summary"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
