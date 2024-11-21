import * as React from 'react';

export function LayoutView({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {

  return (
    
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}
