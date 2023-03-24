import Layout from 'components/Layout'
import SubLayout from 'components/SubLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function UsernameInfo() {
  const router = useRouter()
  const { uid } = router.query
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    if (uid != null) {
      fetch(`/api/user-info/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data)
        })
    }
  }, [uid])

  return (
    <>
      <h1 className="title">
        {userInfo.name}
      </h1>
    </>
  )
}

UsernameInfo.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  )
}
