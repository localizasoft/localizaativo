import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import RegisterItemCard from '../components/InventoryPage/RegisterItemCard'
import InventoryToolbar from '../components/InventoryPage/Toolbar'
import OutlinedInput from '../components/shared/Input/OutlinedInput'
import Table from '../components/InventoryPage/Table'
import { Toolbar } from '../components/shared/Toolbar/Toolbar'

const Home: NextPage = () => {
  const [openRegisterItemCard, setOpenRegisterItemCard] = useState<boolean>(false)

  function openRegisterItemCardForm() {
    setOpenRegisterItemCard(true)
  }

  function closeRegisterItemCardForm() {
    setOpenRegisterItemCard(false)
  }

  return (
    <Box>
      <Toolbar />
      <div className="px-14 mt-5 flex flex-col gap-9">
        <InventoryToolbar openRegisterCard={openRegisterItemCardForm} />
        <div className='flex flex-col gap-5'>
          <RegisterItemCard open={openRegisterItemCard} close={closeRegisterItemCardForm} />
          <Table />
        </div>
      </div>
    </Box>
  )
}

export default Home

export const getServerSideProps = async (ctx: any) => {
  const { 'LocalizaAtivo-token': savedToken } = await parseCookies(ctx)

  if (!savedToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}