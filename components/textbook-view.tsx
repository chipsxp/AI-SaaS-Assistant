"use client";

import { cn } from "@/lib/utils";
import OpenAI from "openai";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface TextbookViewProps {
  messages: OpenAI.ChatCompletionMessage[];
}

export const TextbookView = ({ messages }: TextbookViewProps) => {
  if (!messages.length) return null;

  return (
    <div className="textbook-container max-w-4xl mx-auto bg-white p-12 shadow-sm">
      <div className="prose prose-lg mx-auto text-justify first-letter:text-4xl first-letter:font-serif first-letter:mr-3 first-letter:float-left space-y-2">
        {messages.map((message, index) => {
          // Skip empty messages
          if (!message.content) return null;

          return (
            <div 
              key={index}
              className={cn(
                "mb-6 leading-relaxed tracking-wide",
                message.role === "assistant" 
                  ? "text-gray-700" 
                  : "text-gray-800 font-medium border-l-4 border-gray-200 pl-4"
              )}
            >
              {message.content.split('\n').map((line, lineIndex) => {
                // Check if line is part of an ordered list
                const listMatch = line.match(/^(\d+)\.\s(.+)/);
                
                if (listMatch) {
                  // Handle ordered list items
                  return (
                    <div key={lineIndex} className="ml-4 my-2">
                      <span className="font-medium mr-2">{listMatch[1]}.</span>
                      {/* Process bold text and LaTeX within list items */}
                      {listMatch[2].split(/(\\\[.*?\\\]|\\\(.*?\\\)|\*\*.*?\*\*)/).map((part, i) => {
                        if (part.startsWith("\\[") && part.endsWith("\\]")) {
                          // Handle display LaTeX formula
                          const formula = part.slice(2, -2); // Remove \[ and \]
                          return (
                            <div key={i} className="my-4 flex justify-center">
                              <BlockMath math={formula} />
                            </div>
                          );
                        } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
                          // Handle inline LaTeX formula
                          const formula = part.slice(2, -2); // Remove \( and \)
                          return <InlineMath key={i} math={formula} />;
                        } else if (part.startsWith("**") && part.endsWith("**")) {
                          // Handle bold text
                          const text = part.slice(2, -2); // Remove **
                          return <span key={i} className="font-semibold">{text}</span>;
                        }
                        // Regular text
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  );
                }

                // Handle regular text with bold processing and LaTeX formulas
                return (
                  <div key={lineIndex} className="mb-2">
                    {line.split(/(\\\[.*?\\\]|\\\(.*?\\\)|\*\*.*?\*\*)/).map((part, i) => {
                      if (part.startsWith("\\[") && part.endsWith("\\]")) {
                        // Handle display LaTeX formula
                        const formula = part.slice(2, -2); // Remove \[ and \]
                        return (
                          <div key={i} className="my-4 flex justify-center">
                            <BlockMath math={formula} />
                          </div>
                        );
                      } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
                        // Handle inline LaTeX formula
                        const formula = part.slice(2, -2); // Remove \( and \)
                        return <InlineMath key={i} math={formula} />;
                      } else if (part.startsWith("**") && part.endsWith("**")) {
                        // Handle bold text
                        const text = part.slice(2, -2); // Remove **
                        return <span key={i} className="font-semibold">{text}</span>;
                      }
                      // Regular text
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
