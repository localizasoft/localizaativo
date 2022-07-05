import { useState } from "react";

export default function useItemImageModal(){
    const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
    const [onChangeImage, setOnChangeImage] = useState<boolean>(false)
    const [image, setImage] = useState<File>();

    function handleChangeImage(){
        setOnChangeImage(!onChangeImage)
    }

    function handleImageModal(){
        setIsOpenImageModal(!isOpenImageModal)
    }

    function handleImage(image: File){
        setImage(image)
    }

    return { isOpenImageModal, handleImageModal, onChangeImage, handleChangeImage, image, handleImage }
}