'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-teal-600 hover:bg-teal-700 text-white',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-slate-300 hover:bg-slate-100 text-slate-700 bg-transparent',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
        ghost: 'hover:bg-slate-100 text-slate-700',
        link: 'text-teal-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-teal-100 text-teal-700',
        secondary: 'border-transparent bg-slate-100 text-slate-900',
        destructive: 'border-transparent bg-red-100 text-red-700',
        outline: 'text-slate-700 border-slate-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-100 bg-white shadow-sm transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
