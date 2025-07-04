import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;