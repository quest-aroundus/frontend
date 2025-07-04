"use client"
import CalendarIcon from '@/app/_assets/CalendarIcon';
import EventIcon from '@/app/_assets/EventIcon';
import MapIcon from '@/app/_assets/MapIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CurrentTab = 'event' | 'map' | 'calendar'

interface TabButtonProps {
  current: CurrentTab;
  name: CurrentTab;
}

const TabButton = ({ current, name }: TabButtonProps) => {
  const mappedIcons = {
    'event': <EventIcon />,
    'map': <MapIcon />,
    'calendar': <CalendarIcon />
  }
  const IconComponent = mappedIcons[name] || <EventIcon />
  return (
    <Link href={`/${name}`} className={`${current === name ? 'text-main_b' : 'text-ms_lb'} cursor-pointer`}>
      {IconComponent}
    </Link>
  )
}

const Footer = () => {
  const pathname = usePathname() || '/';
  const currentTab = pathname.split('/').pop() as CurrentTab;

  return (
    <footer className='border-t min-w-80 border-t-border_md fixed w-full bottom-0 pt-[0.625rem] pb-11 px-[3.125rem]'>
      <div className='max-width flex justify-between items-center'>
        <TabButton current={currentTab} name='event' />
        <TabButton current={currentTab} name='map' />
        <TabButton current={currentTab} name='calendar' />
      </div>
    </footer>
  )
}

export default Footer;