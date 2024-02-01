
import Image from 'next/image'
interface EmptyProps {
    label: string
}

const Empty = ({label
}: EmptyProps) => {

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <div className='relative w-72 h-72'>
                <Image src='/empty.png' fill alt='empty' />
            </div>
            <p className='text-center text-sm text-muted-foreground font-light'>
            {label}
            </p>
        </div>
    )
}

export default Empty