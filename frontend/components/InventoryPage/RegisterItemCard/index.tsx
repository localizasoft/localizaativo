import React, { useState } from 'react'
import Button from '../../shared/Button'
import OutlinedInput from '../../shared/Input/OutlinedInput'
import OutlinedButton from '../../shared/OutlinedButton'
import UploadZone from '../../shared/UploadZone'
import { When } from '../../shared/When'

type RegisterItemCardProps = {
    open: boolean
    close: () => void
}

export default function RegisterItemCard({ open, close }: RegisterItemCardProps) {
    const [uploadedPhoto, setUploadedPhoto] = useState<File>()

    function handlePhoto(file: File) {
        setUploadedPhoto(file)
    }

    return (
        <When value={open}>
            <div className='bg-white rounded-xl py-5 px-9 w-full flex flex-col gap-3'>
                <span className="md:text-base xl:text-lg 2xl:text-lg font-semibold text-gray-800 flex justify-start w-[10%] min-w-[6rem]">{`Cadastrar item`}</span>
                <div className="flex flex-row flex-wrap justify-between gap-y-2">
                    <div className='w-[22%] min-w-[200px]'>
                        <OutlinedInput
                            className='w-full text-sm'
                            placeholder='Produto 01'
                            name='produtoInput'
                            label='Produto'
                        />
                    </div>
                    <div className='w-[22%] min-w-[200px]'>
                        <OutlinedInput
                            className='w-full text-sm'
                            placeholder='1111-2222-3333-4444'
                            name='sequencialInput'
                            label='Sequencial'
                        />
                    </div>
                    <div className='w-[22%] min-w-[200px]'>
                        <OutlinedInput
                            className='w-full text-sm'
                            placeholder='000000'
                            name='plaquetaInput'
                            label='Plaqueta'
                        />
                    </div>
                    <div className='w-[22%] min-w-[200px]'>
                        <OutlinedInput
                            className='w-full text-sm'
                            placeholder='Trindade - Goías, Brasil'
                            name='localizacaoInput'
                            label='Localização'
                        />
                    </div>
                    <div className='w-[22%] min-w-[200px]'>
                        <OutlinedInput
                            className='w-full text-sm'
                            placeholder='3º'
                            name='localizacaoInput'
                            label='Andar'
                        />
                    </div>
                </div>
                <div className='w-full '>
                    <span className="md:text-sm xl:text-sm 2xl:text-[14px]">Foto do item</span>
                    <UploadZone handleUploadedFile={handlePhoto} />
                </div>
                <div className='w-full flex justify-end items-center gap-5 mt-3'>
                    <OutlinedButton
                        onClick={() => {
                            close()
                        }}
                        className='border border-gray-600 text-gray-600 w-[80px] '
                    >
                        {`Cancelar`}
                    </OutlinedButton>
                    <Button onClick={() => {
                        close()
                    }}
                        className=' text-gray-600 w-[80px]'
                    >
                        {`Salvar`}
                    </Button>
                </div>
            </div>
        </When>
    )
}