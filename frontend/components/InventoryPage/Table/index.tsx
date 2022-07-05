import React from 'react'
import DividerTable from '../../shared/Divider'
import Divider from '../../shared/Divider'
import TableCell from './TableCell'
import TableHead from './TableHead'

export default function Table() {
    return (
        <div className='bg-white rounded-xl py-5 px-6 w-full'>
            <div className="overflow-x-auto sm:pb-2 md:pb-2 lg:pb-2 xl:pb-2 2xl:pb-0">
                <table className='w-full'>
                    <TableHead />
                    <tbody className="flex flex-col gap-3 mt-2">
                        <DividerTable />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </tbody>
                </table>
            </div>
        </div>
    )
}