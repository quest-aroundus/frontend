'use client';

import type { ListSection, MenuItem } from '@/types/setting';
import Link from 'next/link';

const LinkOrButton = ({ item }: { item: MenuItem }) => {
  const className = 'h-[1.875rem] flex items-center align-middle';
  switch (item.kind) {
    case 'route':
      return (
        <Link href={item.href} className={className}>
          {item.text}
        </Link>
      );

    case 'external': {
      const isNewTab = item.newTab ?? false;
      return (
        <a
          href={item.href}
          target={isNewTab ? '_blank' : '_self'}
          rel={isNewTab ? 'noopener noreferrer' : 'undefined'}
          className={className}
        >
          {item.text}
        </a>
      );
    }

    case 'action':
      return (
        <button
          type='button'
          onClick={item.onClick}
          disabled={item.disabled}
          className={className}
        >
          {item.text}
        </button>
      );
    default:
      return <div className={className}>{item.text}</div>;
  }
};

const ListItem = (item: ListSection) => {
  return (
    <ul className='p-5 shadow-[0px_10px_32px_0px_#5055880F] bg-white'>
      <li className='mb-2.5 font-semibold leading-5'>{item.title}</li>
      {item.menu.map((menu) => (
        <li key={menu.text}>
          <LinkOrButton item={menu} />
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
