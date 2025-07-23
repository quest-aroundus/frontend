import CardSkeleton from './CardSkeleton';

const MapSkeleton = () => {
  return (
    <>
      <div className='w-full h-full bg-bg' />
      <section className='absolute bottom-5 right-5 z-50 w-full h-full inline-flex flex-col items-end justify-end gap-5'>
        <div className='inline-flex gap-2.5'>
          <CardSkeleton />
        </div>
      </section>
    </>
  )
}

export default MapSkeleton;