import MainLayout from '@/components/layout/MainLayout';

const MapLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

export default MapLayout;