import { motion } from 'framer-motion';
import Link from 'next/link';

import type { ContactInfo } from '@/components/ContactMe/Contact.config';
import { CopyV2 } from '@/components/CopyV2';

export const Contact = ({ info }: { info: ContactInfo[] }) => {
  return (
    <motion.div className="flex w-full flex-col items-center justify-center space-y-6 rounded-lg bg-gray-900 p-2">
      {info.map((contact) =>
        Object.entries(contact).map(([key, value]) => {
          const isLink = typeof value === 'object' && value.isLink;
          const actualValue = isLink ? value.value : value;
          return (
            <motion.div
              key={key}
              className=" grid w-full grid-cols-5 items-center rounded-md bg-gray-800 px-4  py-2 "
            >
              <h1 className="col-span-1  font-medium text-gray-300 sm:text-sm md:text-base lg:text-lg">
                {key}
              </h1>
              {isLink ? (
                <Link
                  href={actualValue as string}
                  className="col-span-3 overflow-auto font-medium text-blue-400 hover:border-b-0  hover:text-blue-500 hover:no-underline sm:text-sm md:text-base lg:text-lg"
                >
                  {actualValue as string}
                </Link>
              ) : (
                <span className="col-span-3  font-medium text-blue-400 sm:text-sm md:text-base lg:text-lg ">
                  {actualValue as string}
                </span>
              )}
              <div className="col-span-1">
                {' '}
                <CopyV2 text={actualValue as string} />
              </div>
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
};
