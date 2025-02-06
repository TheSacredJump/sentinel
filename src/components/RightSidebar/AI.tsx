import React, { useState } from 'react';
import { Send, Loader2, RefreshCw, Copy } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

const AIEmailAssistant = ({ theme, themeConfig }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (error) {
      console.error('Error generating email:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-6">
      <Card className={`${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
        <CardHeader>
          <CardTitle className={`text-lg font-medium ${theme == 'dark' ? 'text-white' : 'text-black'}`}>AI Email Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme == 'dark' ? 'text-white' : 'text-black'}`}>
                Describe what you want to write
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Write a professional email to decline a meeting invitation..."
                className={`w-full h-32 resize-none ${themeConfig[theme].inputBg} border ${themeConfig[theme].cardBorder} ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              />
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={!prompt || isLoading}
              className={`w-full ${themeConfig[theme].buttonBg} bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400 text-white hover:opacity-90`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Generate Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedEmail && (
        <Card className={`${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
          <CardHeader>
            <CardTitle className={`${theme == 'dark' ? 'text-white' : 'text-black'} text-lg font-medium`}>Generated Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={generatedEmail}
                readOnly
                className={`w-full h-48 resize-none ${themeConfig[theme].inputBg} border ${themeConfig[theme].cardBorder} ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              />
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleCopy}
                  className={`flex-1 ${themeConfig[theme].buttonBg} hover:opacity-90 ${theme == 'dark' ? 'text-white' : 'text-black hover:bg-neutral-200'}`}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={handleRegenerate}
                  className={`flex-1 ${themeConfig[theme].buttonBg} hover:opacity-90 ${theme == 'dark' ? 'text-white' : 'text-black hover:bg-neutral-200'}`}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIEmailAssistant;