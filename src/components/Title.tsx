import React from 'react'

interface Props {
    title: string;
}

const Title: React.FC<Props> = ({ title }) => {
    return (
        <div className='text-center text-2xl font-bold  mb-8'>
            {title}
        </div>
    )
}

export default Title
