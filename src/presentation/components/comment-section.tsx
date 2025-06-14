import { useState } from 'react';
import { useAppState } from '../../infrastructure/store/appState';

type Props = {
  characterId: string;
};

export const CommentSection = ({ characterId }: Props) => {
  const [newComment, setNewComment] = useState('');
  const rawComments = useAppState((s) => s.comments[characterId]);
  const comments = rawComments || [];
  const addComment = useAppState((s) => s.addComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(characterId, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded px-3 py-1"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {comments.map((comment, i) => (
          <li key={i} className="bg-gray-100 rounded p-2 text-sm">
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};
