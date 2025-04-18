'use client';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { MenuItem } from '@/data/navigation';

export const Navigation = ({ items }: { items: MenuItem[] }) => {
  const pathname = usePathname();

  return (
    <div className='links flex justify-between items-center gap-8'>
      {items.map((item, index) => (
        <div key={index} className='relative group'>
          <Link
            href={item.href}
            className={`text-accent-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 font-medium ${
              pathname === item.href ? 'text-primary' : ''
            }`}
          >
            {item.title}
            {item.subMenus && (
              <ChevronDown className='h-4 w-4 transition-transform duration-200 group-hover:rotate-180' />
            )}
          </Link>
          {item.subMenus && (
            <div className='absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all mt-2 -left-4 bg-background rounded-lg shadow-xl p-4 min-w-[350px] border-t-4 border-primary'>
              <div className='flex flex-col space-y-2'>
                {item.subMenus.map((subMenu, subIndex) => (
                  <div
                    key={subIndex}
                    className='relative group/submenu'
                  >
                    <Link
                      href=''
                      className='text-background-foreground hover:text-primary flex items-center justify-between p-2 rounded-md hover:bg-muted transition-all'
                    >
                      {subMenu.title}
                      <ChevronRight className='h-4 w-4' />
                    </Link>
                    <div className='absolute invisible group-hover/submenu:visible hover:text-primary left-full top-0 ml-6 bg-background rounded-lg shadow-xl p-4 min-w-[350px] border-l-4 border-secondary transition-all'>
                      <div className='grid grid-cols-1 gap-2'>
                        {subMenu.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className='text-accent-foreground hover:text-primary p-2 rounded-md hover:bg-gray-50 transition-all duration-200'
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
