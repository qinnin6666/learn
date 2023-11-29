import { AuthRequiredError } from '@/lib/exceptions'

const session = null

export default async function Home() {

  if (session === '333') throw new AuthRequiredError()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>hello world!</p>
    </main>
  )
}
