'use client';;
import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/animate-ui/effects/motion-highlight';

function Tabs({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props} />
  );
}

function TabsList({
  ref,
  children,
  className,
  activeClassName,

  transition = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  },

  ...props
}) {
  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);

  const [activeValue, setActiveValue] = React.useState(undefined);

  const getActiveValue = React.useCallback(() => {
    if (!localRef.current) return;
    const activeTab = localRef.current.querySelector('[data-state="active"]');
    if (!activeTab) return;
    setActiveValue(activeTab.getAttribute('data-value') ?? undefined);
  }, []);

  React.useEffect(() => {
    getActiveValue();

    const observer = new MutationObserver(getActiveValue);

    if (localRef.current) {
      observer.observe(localRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [getActiveValue]);

  return (
    <MotionHighlight
      controlledItems
      className={cn('rounded-sm bg-background shadow-sm', activeClassName)}
      value={activeValue}
      transition={transition}>
      <TabsPrimitive.List
        ref={localRef}
        data-slot="tabs-list"
        className={cn(
          'bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-[4px]',
          className
        )}
        {...props}>
        {children}
      </TabsPrimitive.List>
    </MotionHighlight>
  );
}

function TabsTrigger({
  className,
  value,
  ...props
}) {
  return (
    <MotionHighlightItem value={value} className="size-full">
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        className={cn(
          'inline-flex cursor-pointer items-center size-full justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-[1]',
          className
        )}
        value={value}
        {...props} />
    </MotionHighlightItem>
  );
}

function TabsContent({
  className,
  children,

  transition = {
    duration: 0.5,
    ease: 'easeInOut',
  },

  ...props
}) {
  return (
    <TabsPrimitive.Content asChild {...props}>
      <motion.div
        data-slot="tabs-content"
        className={cn('flex-1 outline-none', className)}
        layout
        initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        transition={transition}
        {...props}>
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  );
}

function TabsContents({
  children,
  className,
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}) {
  const containerRef = React.useRef(null);

  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const newHeight = entries?.[0]?.contentRect.height;
      if (!newHeight) return;
      requestAnimationFrame(() => {
        setHeight(newHeight);
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      const initialHeight = containerRef.current.getBoundingClientRect().height;
      setHeight(initialHeight);
    }
  }, [children]);

  return (
    <motion.div
      data-slot="tabs-contents"
      layout
      animate={{ height: height }}
      transition={transition}
      className={className}
      {...props}>
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents };
