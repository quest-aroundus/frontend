import { privacyPolicy } from '@/constants/setting';

const ServiceTermPage = () => {
  return (
    <main className='shadow-[0px_10px_34px_0px_#0000000F] bg-white p-5 mt-3'>
      {privacyPolicy.split('\n').map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </main>
  );
};
export default ServiceTermPage;
