import * as React from 'react';
import EditIcon from '../../icons/Edit';
import PlusIcon from '../../icons/Plus';
import Button from '../shared/Button';
import OutlinedButton from '../shared/OutlinedButton';

type InventoryToolbar = {
    openRegisterCard: () => void
}

export default function InventoryToolbar({ openRegisterCard }: InventoryToolbar) {
    return (
        <div className='flex justify-between w-full items-center'>
            <span className='text-gray-700 text-[24px] sm:text-[26px] md:text-[28px] lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold'>{`Inventário`}</span>
            <OutlinedButton className='h-10 w-[10%] min-w-[6rem] text-cyan-500 ' onClick={() => { openRegisterCard() }}>
                <PlusIcon />
                <span className='sm: hidden md:block'>{`Adicionar`}</span>
            </OutlinedButton>
        </div>
    )
}