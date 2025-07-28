import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg border shadow-sm ${className || ''}`}
      {...props}
    />
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={`p-6 ${className || ''}`} {...props} />
}
