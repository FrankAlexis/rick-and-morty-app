import {useState, useEffect} from "react";
import {CommentManager} from "../../domain/use-cases/comment-manager";

export const useCommentsController = (characterId: string) => {
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    const manager = new CommentManager();
    setComments(manager.getComments(characterId));
  }, [characterId]);

  const addComment = (text: string) => {
    const manager = new CommentManager();
    const updated = manager.addComment(characterId, text);
    setComments(updated);
  };

  return {comments, addComment};
};
