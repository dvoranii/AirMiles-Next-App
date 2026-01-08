import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Partner } from "@/types";
import { Users, TrendingUp } from "lucide-react";

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{partner.logo}</span>
          <div>
            <h3 className="font-semibold">{partner.name}</h3>
            <p className="text-sm text-muted-foreground">{partner.category}</p>
          </div>
        </div>
        <Badge variant={partner.status === "active" ? "default" : "secondary"}>
          {partner.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Miles Issued</span>
            <span className="font-medium">
              {partner.milesIssued.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Miles Redeemed
            </span>
            <span className="font-medium">
              {partner.milesRedeemed.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Active Members
            </span>
            <span className="font-medium">
              {partner.activeMembers.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Conversion Rate
            </span>
            <span className="font-medium text-green-600">
              {(partner.conversionRate * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
