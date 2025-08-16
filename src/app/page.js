"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { PromptInput } from "@/components/PromptInput";
import { SummariseDisplay } from "@/components/SummariseDisplay";
import { EmailShare } from "@/components/EmailShare";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();

  const handleSummarise = async (customPrompt) => {
    setIsLoading(true);
    
    try {
      console.log("Sending transcript length:", transcript?.length);
      console.log("Sending prompt:", customPrompt);
      
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript,
          customPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("API Error:", errorData);
        throw new Error(`Failed to generate summary: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } 
    catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-10">
      
      <h1 className="text-3xl font-bold text-center mb-10">
        AI Meeting Notes Summariser
      </h1>

      <div className="grid gap-8">
        <FileUpload setTranscript={setTranscript} />

        <PromptInput 
          onSummarise={handleSummarise} 
          isDisabled={!transcript || isLoading} 
          isLoading={isLoading}
        />

        {summary && (
          <>
            <SummariseDisplay summary={summary} />
            <EmailShare summary={summary} />
          </>
        )}
      </div>

    </main>

  );
}
