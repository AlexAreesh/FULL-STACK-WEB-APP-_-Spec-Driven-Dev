import { ClipboardList } from 'lucide-react';
import { InteractiveButton } from '@/components/InteractiveElements';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title, 
  description, 
  actionText, 
  onActionClick, 
  icon 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
        {icon || <ClipboardList className="h-8 w-8 text-primary-500" />}
      </div>
      <h3 className="mt-4 text-lg font-medium text-neutral-800">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500">{description}</p>
      {actionText && onActionClick && (
        <div className="mt-6">
          <InteractiveButton onClick={onActionClick}>
            {actionText}
          </InteractiveButton>
        </div>
      )}
    </div>
  );
}