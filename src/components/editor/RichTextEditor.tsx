
import React, { useState } from 'react';
import { Bold, Italic, List, Link, Heading, Image, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  
  const formatDoc = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    updateContent();
  };
  
  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 p-2 border-b flex flex-wrap gap-1">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('bold')}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('italic')}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('insertUnorderedList')}
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-8" />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) formatDoc('createLink', url);
          }}
          className="h-8 w-8"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('formatBlock', '<h2>')}
          className="h-8 w-8"
        >
          <Heading className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) formatDoc('insertImage', url);
          }}
          className="h-8 w-8"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-8" />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('justifyLeft')}
          className="h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('justifyCenter')}
          className="h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => formatDoc('justifyRight')}
          className="h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[300px] focus:outline-none prose max-w-none"
        onInput={updateContent}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
