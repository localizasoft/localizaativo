import PopupState, { bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import DeleteIcon from '../../../icons/DeleteIcon'
import EditIcon from '../../../icons/Edit'
import GaleryIcon from '../../../icons/Galery'
import DeletePopover from './Modals/DeletePopover/DeletPopover'
import { EditItemModal } from './Modals/EditItemModal/EditItemModal'
import useEditItemModal from './Modals/EditItemModal/hooks/useEditItemModal'
import useItemImageModal from './Modals/ItemImageModal/hooks/useItemImageModal'
import { ItemImageModal } from './Modals/ItemImageModal/ItemImageModal'

export default function TableCell() {
    const { isOpenEditModal, handleEditModal } = useEditItemModal()
    const { isOpenImageModal, handleImageModal } = useItemImageModal()

    return (
        <tr className='flex gap-6 items-center h-8 w-full bg-gray-100 rounded-lg px-3'>
            <td className="md:text-xs xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[10%] min-w-[6rem]">
                {`Produto`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[15%] min-w-[12rem]">
                {`Sequencial Localiza`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[10%] min-w-[6rem]">
                {`Plaqueta`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[10%] min-w-[4rem]">
                {`Andar`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[10%] min-w-[4rem]">
                {`Lido`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[15%] min-w-[4rem]">
                {`Localização`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-start w-[15%] min-w-[12rem]">
                {`Data inclusão`}
            </td>
            <td className="md:text-sm xl:text-sm 2xl:text-sm font-medium text-gray-800 flex justify-end w-[15%] min-w-[12rem]">
                <PopupState variant="popover" popupId="popup-popover">
                    {(popupState) => (
                        <>
                            <div className="flex items-center gap-2">
                                <button onClick={() => { handleEditModal() }} className="h-6 px-1 rounded-full justify-center hover:bg-slate-300 duration-200 ">
                                    <EditIcon />
                                </button>
                                <button onClick={() => { handleImageModal() }} className="h-6 px-1 rounded-full justify-center hover:bg-slate-300 duration-200 ">
                                    <GaleryIcon />
                                </button>
                                <button className="h-6 px-1 rounded-full justify-center hover:bg-slate-300 duration-200 " {...bindTrigger(popupState)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                            <DeletePopover popupState={popupState} />
                        </>
                    )}
                </PopupState>
                <EditItemModal open={isOpenEditModal} handleClose={handleEditModal} />
                <ItemImageModal open={isOpenImageModal} handleClose={handleImageModal} />
            </td>
        </tr>
    )
}