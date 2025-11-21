import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTE } from '@app/data'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'

export default function Main() {
  const router = useRouter()
  const { user } = useSelector((state: IStore) => state)
  useEffect(() => {
    if (user.uid) router.replace(ROUTE.DASHBOARD)
    else router.replace(ROUTE.AUTH.SIGN_IN)
  }, [router])

  return null
}
