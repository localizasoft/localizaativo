import React from 'react'
import { ModalBase } from '../../../../shared/Modal';
import OutlinedInput from '../../../../shared/Input/OutlinedInput';
import OutlinedButton from '../../../../shared/OutlinedButton';
import Button from '../../../../shared/Button';

type EditItemModalProps = {
    open: boolean;
    handleClose: () => void
}

export function EditItemModal({ open, handleClose }: EditItemModalProps) {
    return (
        <ModalBase
            open={open}
            handleClose={handleClose}
            title='Editar item'
        >
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3'>
                    <div className='w-full'>
                        <OutlinedInput
                            className='w-full text-base h-11'
                            placeholder='Produto 01'
                            name='localizacaoInput'
                            label='Produto'
                        />
                    </div>
                    <div className='w-full'>
                        <OutlinedInput
                            className='w-full text-base h-11'
                            placeholder='1111-2222-3333-4444'
                            name='localizacaoInput'
                            label='Sequencial'
                        />
                    </div>
                    <div className='w-full'>
                        <OutlinedInput
                            className='w-full text-base h-11'
                            placeholder='000000'
                            name='localizacaoInput'
                            label='Plaqueta'
                        />
                    </div>
                    <div className='w-full'>
                        <OutlinedInput
                            className='w-full text-base h-11'
                            placeholder='Trindade - Goiás - Brasil'
                            name='localizacaoInput'
                            label='Localização'
                        />
                    </div>
                    <div className='w-full'>
                        <OutlinedInput
                            className='w-full text-base h-11'
                            placeholder='3º'
                            name='localizacaoInput'
                            label='Andar'
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <OutlinedButton
                        className='border-none w-[60px]'
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        {`Cancelar`}
                    </OutlinedButton>
                    <Button className=' w-[80px]'>
                        {`Salvar`}
                    </Button>
                </div>
            </div>
        </ModalBase>
    )
}