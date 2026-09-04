import { seedCampaigns as campaigns } from "@/data/campaigns"
import { CampaignDetail } from "./CampaignDetail"

export function generateStaticParams() {
  return campaigns.map((c) => ({ id: c.id }))
}

export default function CampaignPage() {
  return <CampaignDetail />
}
