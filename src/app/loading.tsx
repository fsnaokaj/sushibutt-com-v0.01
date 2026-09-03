export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading campaigns...</span>
      </div>
    </div>
  )
}
