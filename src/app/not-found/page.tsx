import NotFoundIcon from "@/app/_assets/NotFoundIcon";
import Link from 'next/link';

const NotFoundPage = () => {
  const textClass = 'font-medium leading-6'
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='mb-5 w-[4.5rem] h-[4.5rem] inline-flex flex-col items-center justify-center rounded-full bg-main_lb'>
        <NotFoundIcon />
        <p className='text-ms_ob font-semibold mt-0.5'>404</p>
      </div>
      <div className='text-text_b text-center'>
        <strong className='leading-6'>
          Page not found.
        </strong>
        <p className={textClass}>
          We couldn’t find the page
        </p>
        <p className={textClass}>
          you’re looking for.
        </p>
      </div>
      <Link href='/event' className='bg-main_b rounded-4xl h-14 w-44 inline-flex items-center justify-center text-white font-semibold mt-[6.25rem]'>
        Go to home
      </Link>
    </section>
  )
}

export default NotFoundPage;