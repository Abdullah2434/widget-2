import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CustomButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function CustomButton(props: CustomButtonProps) {
  const { children, isLoading = false, fullWidth = false, ...restProps } = props;

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-14 text-[24px] font-bold items-center justify-center rounded-3xl border-neutral-800 text-white bg-button-background',
        'disabled:pointer-events-none disabled:opacity-60',
        fullWidth && 'w-full',
      )}
      disabled={isLoading || restProps.disabled}
      {...restProps}
    >
      {isLoading ? (
        'loading'
      ) : (
        children
      )}
    </button>
  );
}
