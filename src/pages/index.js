import Head from 'next/head'

// Components
import Button from '@/components/high-level/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ripple Effect Button</title>
        <meta name="description" content="A Ripple Effect Button Using NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-screen h-screen bg-zinc-800 flex justify-center items-center'>
        <Button opacity={0.3} >
          <span>Ripple Button</span>
        </Button>
      </main>
    </>
  )
}
