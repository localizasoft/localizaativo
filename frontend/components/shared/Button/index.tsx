import React, { ReactNode } from 'react'

type ButtonProps = {
    children: ReactNode,
    className?: string,
    onClick?: () => void | void,
    type?: 'button' | 'submit' | "reset" | undefined,
    id?: string
}

export default function Button({ children, className, type, onClick, id }: ButtonProps) {
    return (
        <button
            id={id}
            type={type}
            className={`w-full h-9 bg-cyan-600 rounded-md text-white shadow-sm px-3 py-2 text-sm flex items-center justify-center gap-2 hover:opacity-80 duration-200 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}