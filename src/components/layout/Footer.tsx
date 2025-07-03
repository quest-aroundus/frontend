import CalendarIcon from '@/app/assets/CalendarIcon';
import CardIcon from '@/app/assets/CardIcon';
import MapIcon from '@/app/assets/MapIcon';

type CurrentTab = 'card' | 'map' | 'calendar'

const TabButton = ({ current }: { current: CurrentTab }) => {
  const mappedIcons = {
    'card': <CardIcon />,
    'map': <MapIcon />,
    'calendar': <CalendarIcon />
  }
  const IconComponent = mappedIcons[current] || <CardIcon />
  return (
    <button className='text-ms_lb active:text-main_b cursor-pointer'>
      {IconComponent}
    </button>
  )
}

const Footer = () => {
  return (
    <footer className='border-t border-t-border-md fixed w-full bottom-0 pt-[0.625rem] pb-11 px-[3.125rem]'>
      <div className='max-w-[35rem] mx-auto flex justify-between items-center'>
        <TabButton current='card' />
        <TabButton current='map' />
        <TabButton current='calendar' />
      </div>
    </footer>
  )
}

export default Footer;