import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

import type { AnimateProps } from './AnimateText.config';
import { animationVariants } from './AnimateText.config';

const ParagraphBreak = () => <div className={'w-full grow bg-gray-400'} />;

export const AnimateText: React.FC<AnimateProps> = ({
  text,
  delay = 0.1,
  variant = 'default',
  splitBy = 'word',
  speed = 0.1,
  restartButton = true,
}: {
  text: string;
  delay?: number;
  variant?: AnimateProps['variant'];
  splitBy?: AnimateProps['splitBy'];
  speed?: number;
  restartButton?: boolean;
}) => {
  const [isSkipping, setIsSkipping] = useState<boolean>(false);
  const textArray = useMemo(() => {
    if (!text) {
      return [];
    }
    const lines = text.split('\n');
    let result = [];

    for (const line of lines) {
      if (splitBy === 'word') {
        result.push(line.split(' '));
      } else if (splitBy === 'letter') {
        result.push(line.split(/(?=[\s\S])/g));
      }
    }

    // Flatten the array and include line breaks
    result = result.reduce((acc, val, index) => {
      if (index !== 0) {
        acc.push('\n'); // Include line breaks between lines
      }
      return acc.concat(val);
    }, []);

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, variant, splitBy, speed]);
  return (
    <div className={' flex h-full flex-col  gap-4'}>
      <div className="flex flex-wrap gap-2 rounded bg-gray-700/50  p-2">
        {textArray?.map((part, index) =>
          part.includes('\n') ? (
            <ParagraphBreak key={nanoid()} />
          ) : (
            <motion.span
              key={nanoid()}
              initial={
                isSkipping ? undefined : animationVariants[variant]?.initial
              }
              animate={
                isSkipping ? undefined : animationVariants[variant]?.animate
              }
              transition={
                isSkipping
                  ? undefined
                  : animationVariants[variant]?.transition(index, delay, speed)
              }
              onAnimationComplete={() => {
                if (index === textArray.length - 1) {
                  setIsSkipping(true);
                }
              }}
            >
              {part}
            </motion.span>
          )
        )}
      </div>
      {restartButton && (
        <Button onClick={() => setIsSkipping(!isSkipping)} variant={'default'}>
          {isSkipping ? 'Restart' : 'Skip to end'}
        </Button>
      )}
    </div>
  );
};
