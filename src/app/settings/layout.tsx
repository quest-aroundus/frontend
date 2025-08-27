import SettingHeader from '@/components/settings/Header';

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-fit min-h-screen'>
      <SettingHeader />
      {children}
    </div>
  );
};

export default SettingLayout;
