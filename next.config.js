/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true"
const basePath = isGithubPages ? "/sushibutt-com-v0.01" : ""

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  ...(isGithubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath
      }
    : {}),
  images: {
    unoptimized: isGithubPages,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  }
}

module.exports = nextConfig
