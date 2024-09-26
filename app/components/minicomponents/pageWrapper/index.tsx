// PageWrapper.tsx
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string,
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div className={`px-4 md:px-8 lg:px-16 pt-20 md:pt-28 ${className}`}>
      {children}
    </div>
  );
};
 
export default PageWrapper;
