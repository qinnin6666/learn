import { FC } from 'react'

interface pageProps {
  params: {
    postID: string
  }
  searchParams: {
    id: string
  }
}

export async function generateStaticParams() {
  const posts = ['post-one', 'post-two']
  return posts.map(post => ({
    postID: post
  }))
}

const page: FC<pageProps> = ({ params, searchParams }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="mr-4">{params.postID}</h1>
      <h2>{searchParams.id}</h2>
    </div>
  )
}

export default page
