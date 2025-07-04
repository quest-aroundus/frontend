import MainLayout from '@/components/layout/MainLayout';

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

export default EventLayout;