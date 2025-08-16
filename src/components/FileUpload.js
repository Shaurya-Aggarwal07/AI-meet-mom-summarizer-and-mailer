"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function FileUpload({ setTranscript }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const droppedFile = event.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      readFileContents(droppedFile);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      readFileContents(selectedFile);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    
    // Check if file is a text file or specific allowed types
    const validTypes = ['text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt, .docx, or .pdf file",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const readFileContents = async (file) => {
    setIsLoading(true);
    try {
      if (file.type === 'text/plain') {
        // For text files, use FileReader
        const reader = new FileReader();
        reader.onload = (e) => {
          setTranscript(e.target.result);
          setIsLoading(false);
        };
        reader.readAsText(file);
      } else {
        // For docx and pdf, we need to extract text on the server
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/extract', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to extract text from file');
        }

        const data = await response.json();
        setTranscript(data.text);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to read file contents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Meeting Transcript</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.docx,.pdf"
            className="hidden"
          />
          {file ? (
            <div className="space-y-4">
              <p className="text-sm">File uploaded: <strong>{file.name}</strong></p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Choose Another File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">Drag and drop your transcript file here, or click to browse.</p>
              <Button onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                {isLoading ? "Processing..." : "Choose File"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}