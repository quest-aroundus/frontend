import Skeleton from '../common/Skeleton';

const CardSkeleton = () => {
  return (
    <aside className='flex bg-white w-[22.25rem] rounded-[10px] p-4 shadow-[0px_0px_10px_0px_#00000040]'>
      <div className='mr-2.5'>
        <Skeleton className='w-[5.625rem] h-3' />
        <Skeleton className='w-[13.375rem] h-[1.375rem]' />
        <Skeleton className='w-[13.375rem] h-9' />
        <div className='inline-flex gap-2 mt-2.5'>
          <Skeleton className='w-[5.5rem] h-6' />
          <Skeleton className='w-[4.375] h-6' />
        </div>
        <Skeleton className='w-[13.375rem] h-[1.125rem] mt-1' />
      </div>
      <Skeleton className='w-[6.25rem] h-40 rounded-[0.625rem]' />
    </aside>
  );
};

export default CardSkeleton;
