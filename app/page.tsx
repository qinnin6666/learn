import { AuthRequiredError } from '@/lib/exceptions'

const session = null

export default function Home() {
  if (session === '333') throw new AuthRequiredError()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world!
    </main>
  )
}
