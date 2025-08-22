import React from 'react';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
  const baseClasses = "rounded-xl border bg-card text-card-foreground shadow";
  
  const classes = `${baseClasses} ${className || ''}`;
  
  return (
    <div
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => {
  const classes = `flex flex-col space-y-1.5 p-6 ${className || ''}`;
  
  return (
    <div
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => {
  const classes = `text-2xl font-semibold leading-none tracking-tight ${className || ''}`;
  
  return (
    <h3
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => {
  const classes = `text-sm text-muted-foreground ${className || ''}`;
  
  return (
    <p
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const classes = `p-6 pt-0 ${className || ''}`;
  
  return (
    <div
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => {
  const classes = `flex items-center p-6 pt-0 ${className || ''}`;
  
  return (
    <div
      className={classes}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };