import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-4xl font-bold mb-2">404</p>
        <p className="text-muted-foreground mb-6">This campaign could not be found.</p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Back to marketplace
        </Link>
      </div>
    </div>
  )
}
