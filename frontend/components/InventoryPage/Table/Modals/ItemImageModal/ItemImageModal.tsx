import React from 'react'
import Button from '../../../../shared/Button';
import { ModalBase } from '../../../../shared/Modal';
import useModal from '../../../../shared/Modal/hook/useModal';
import OutlinedButton from '../../../../shared/OutlinedButton';
import UploadZone from '../../../../shared/UploadZone';
import { When } from '../../../../shared/When';
import useItemImageModal from './hooks/useItemImageModal';

type EditItemModalProps = {
    open: boolean;
    handleClose: () => void
}

export function ItemImageModal({ open, handleClose }: EditItemModalProps) {
    const { onChangeImage, handleChangeImage, image, handleImage } = useItemImageModal()

    return (
        <ModalBase
            open={open}
            handleClose={handleClose}
            title={onChangeImage ? "Alterar imagem" : "Visualizar imagem"}
        >
            <div className='flex flex-col gap-5 mt-5'>
                <When value={onChangeImage}>
                    <>
                        <UploadZone handleUploadedFile={handleImage} />
                        <div className='w-full flex items-center justify-between'>
                            <OutlinedButton
                                className='border-none w-[60px]'
                                onClick={() => {
                                    handleChangeImage()
                                }}
                            >
                                {`Voltar`}
                            </OutlinedButton>
                            <Button className=' w-[80px]'>
                                {`Salvar`}
                            </Button>
                        </div>
                    </>
                </When>
                <When value={!onChangeImage}>
                    <>
                        <img src='./cortina-temp.jpg' className='w-full h-[300px] object-cover rounded-lg object-center' />
                        <OutlinedButton onClick={() => { handleChangeImage() }} className='h-12 text-cyan-400'>{`Alterar imagem`}</OutlinedButton>
                        <Button className='h-12'>{`Baixar imagem`}</Button>
                    </>
                </When>
            </div>
        </ModalBase>
    )
}