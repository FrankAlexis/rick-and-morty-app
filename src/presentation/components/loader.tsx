import { FC } from 'react';

type Props = {
  fullScreen?: boolean;
  message?: string;
};

export const Loader: FC<Props> = ({ fullScreen = false, message = 'Loading...' }) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin" />
      <p className="mt-3 text-sm text-gray-700">{message}</p>
    </div>
  );
};
