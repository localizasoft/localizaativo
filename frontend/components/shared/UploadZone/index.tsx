import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

type UploadZoneProps = {
    handleUploadedFile: (file: File) => void
}

export default function UploadZone({ handleUploadedFile }: UploadZoneProps) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        isDragAccept
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1
    });

    const statusMessage = (isDragActive: boolean, isDragReject: boolean) => {
        if (!isDragActive) return <p className='text-disabled'>Clique ou arraste aqui.</p>
        if (isDragReject) return <p className='text-reject'>Formato não suportado.</p>
        return <p className='text-accept'>Solte os arquivos.</p>
    }

    useEffect(() => {
        handleUploadedFile(acceptedFiles[(acceptedFiles.length - 1)])
    }, [acceptedFiles])

    return (
        <div {...getRootProps({ className: `dropzone ${isDragAccept ? 'dropzone-accept' : ''} ${isDragReject ? 'dropzone-error' : ''}` })}>
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
                <p className='text-uploaded'>{acceptedFiles[(acceptedFiles.length - 1)].name}</p>
            ) : (
                statusMessage(isDragActive, isDragReject)
            )}
        </div>
    )
}