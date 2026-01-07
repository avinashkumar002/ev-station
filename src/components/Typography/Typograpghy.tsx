/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { MouseEventHandler, ReactNode } from 'react';
import styles from "./Typography.module.css";

const allowedElements = ['h1', 'h2', 'h3','h4', 'p', 'span', 'div', 'a'] as const;
const variants = ['h1', 'h2', 'h3', 'h4', 'body', 'para', 'chip'] as const;

type El = typeof allowedElements[number];
export type TypographyVariant = typeof variants[number];

export interface TypographyProps {
  children?: string | ReactNode;
  
  /** HTML Element to use (h1, h2, h3, p, span, div, a) */
  el?: El;
  
  /** Typography variant based on Parkly design system */
  variant?: TypographyVariant;
  
  /** Custom color - can use CSS variables or hex/rgb */
  color?: string;
  
  /** Font weight (300, 400, 500, 600, 700) */
  weight?: 300 | 400 | 500 | 600 | 700;
  
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  
  /** Maximum number of lines before truncating with ellipsis */
  maxLines?: number;
  
  /** Text decoration */
  textDecoration?: React.CSSProperties['textDecoration'];
  
  /** Line height in pixels */
  lineHeight?: number;
  
  /** Letter spacing in rem */
  letterSpacing?: number;

  /** For anchor tags */
  href?: string;
  
  /** Title attribute for hover tooltip */
  title?: string;
  
  /** Click handler */
  onClick?: MouseEventHandler<HTMLElement>;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      el,
      variant = 'para',
      color,
      weight,
      align,
      maxLines,
      textDecoration,
      lineHeight,        // Add this
      letterSpacing,     // Add this
      href,
      title,
      onClick,
      className = '',
      style
    },
    ref
  ) => {
    // Auto-select element based on variant if not specified
    const getDefaultElement = (): El => {
      if (el) return el;
      switch (variant) {
        case 'h1': return 'h1';
        case 'h2': return 'h2';
        case 'h3': return 'h3';
        case 'h4': return 'h4';
        case 'body': return 'p';
        case 'para': return 'p';
        case 'chip': return 'span';
        default: return 'p';
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Tag: any = getDefaultElement();

    // Map variant to CSS class
    const variantClass = variant ? styles[`${variant}-txt`] : '';
    
    // Combine font weight class if specified
    const weightClass = weight ? styles[`font-${weight}`] : '';

    // Build className string
    const combinedClassName = [
      variantClass,
      weightClass,
      className
    ].filter(Boolean).join(' ');

    // Build inline styles
    const combinedStyle: React.CSSProperties = {
      color,
      textAlign: align,
      textDecoration,
      lineHeight: lineHeight ? `${lineHeight}px` : undefined,           
      letterSpacing: letterSpacing ? `${letterSpacing}rem` : undefined, 
      cursor: onClick || href ? 'pointer' : undefined,
      ...(maxLines && {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }),
      ...style
    };

    return (
      // eslint-disable-next-line react-hooks/static-components
      <Tag
        ref={ref}
        className={combinedClassName}
        style={combinedStyle}
        title={title}
        href={href}
        onClick={onClick}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;