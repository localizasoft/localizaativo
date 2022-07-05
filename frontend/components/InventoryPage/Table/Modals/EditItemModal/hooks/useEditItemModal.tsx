import { useState } from "react";

export default function useEditItemModal(){
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    function handleEditModal(){
        setIsOpenEditModal(!isOpenEditModal)
    }

    return { isOpenEditModal, handleEditModal }
}