"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Edit, Save, X } from "lucide-react";

export function SummariseDisplay({ summary, onSummaryUpdate }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedSummary : summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedSummary(summary);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSummaryUpdate) {
      onSummaryUpdate(editedSummary);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSummary(summary);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Meeting Summary</CardTitle>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handleSave}
                className="text-green-600 hover:text-green-700"
              >
                <Save size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancel}
                className="text-red-600 hover:text-red-700"
              >
                <X size={16} />
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit size={16} />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedSummary}
            onChange={(e) => setEditedSummary(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
            placeholder="Edit your meeting summary here..."
          />
        ) : (
          <div className="whitespace-pre-wrap bg-muted p-4 rounded-md font-mono text-sm">
            {summary}
          </div>
        )}
      </CardContent>
    </Card>
  );
}