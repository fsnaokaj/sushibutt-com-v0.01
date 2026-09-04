import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-2">🍣</p>
        <p className="text-4xl font-extrabold mb-2">404</p>
        <Link href="/" className="text-primary font-extrabold">sushibutt.com</Link>
      </div>
    </div>
  )
}
