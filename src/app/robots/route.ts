export const dynamic = "force-static"

export async function GET() {
  const baseUrl = "https://closet-e-commerce-store.vercel.app"

  const robots = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`.trim()

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
