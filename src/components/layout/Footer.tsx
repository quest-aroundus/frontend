"use client"
import CalendarIcon from '@/app/_assets/CalendarIcon';
import EventIcon from '@/app/_assets/EventIcon';
import MapIcon from '@/app/_assets/MapIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CurrentTab = 'event' | 'map' | 'calendar'

const TabButton = ({ current, name }: { current: CurrentTab, name: CurrentTab }) => {
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
    <footer className='border-t min-w-80 border-t-border-md fixed w-full bottom-0 pt-[0.625rem] pb-11 px-[3.125rem]'>
      <div className='max-w-[35rem] mx-auto flex justify-between items-center'>
        <TabButton current={currentTab} name='event' />
        <TabButton current={currentTab} name='map' />
        <TabButton current={currentTab} name='calendar' />
      </div>
    </footer>
  )
}

export default Footer;