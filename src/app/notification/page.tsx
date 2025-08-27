import NotificationHeader from '@/components/notification/NotificationHeader';
import NotificationList from '@/components/notification/NotificationList';

const NotificationPage = () => {
  return (
    <div className='flex flex-col h-fit min-h-screen bg-bg'>
      <NotificationHeader />
      <NotificationList />
    </div>
  );
};

export default NotificationPage;
