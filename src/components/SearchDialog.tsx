
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { blogPosts } from "@/data/blogPosts";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredPosts = blogPosts.filter(post => {
    const searchContent = `${post.title} ${post.content} ${post.author}`.toLowerCase();
    return searchQuery.length > 0 ? searchContent.includes(searchQuery.toLowerCase()) : false;
  });

  const handleSelect = (postId: string) => {
    navigate(`/post/${postId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Search Posts</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput 
            placeholder="Search posts..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            autoFocus
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredPosts.map((post) => (
                <CommandItem
                  key={post.id}
                  onSelect={() => handleSelect(post.id)}
                  className="flex items-center gap-2 p-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-sm text-gray-500 truncate max-w-[500px]">
                      {post.content.substring(0, 100)}...
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
