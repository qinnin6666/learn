async function getData() {
  const res = await fetch('http://127.0.0.1:4523/m1/1601753-0-default/pet', {
    method: 'post',
    next: {
      revalidate: 10
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function page() {
  await wait(5000)
  const { data } = await getData()

  return <div>{JSON.stringify(data)}</div>
}

export default page
