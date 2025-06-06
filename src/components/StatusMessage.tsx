'use client';

interface StatusMessageProps {
  success: boolean;
  message: string;
  target?: string;
}

export default function StatusMessage({ success, message, target }: StatusMessageProps) {
  return (
    <div className={`p-4 rounded-lg ${success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      {message} {target && `(${target})`}
    </div>
  );
} 