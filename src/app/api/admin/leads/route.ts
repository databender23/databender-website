import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getLeads, createLead } from "@/lib/leads/lead-service";
import type { LeadQueryParams, CreateLeadInput, LeadStatus, LeadTier, LeadFormType, ContactChannel } from "@/lib/leads/types";

const VALID_CONTACT_CHANNELS: ContactChannel[] = ["linkedin", "email", "phone", "other"];

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  try {
    // Parse date params (could be dateFrom/dateTo or startDate/endDate)
    const startDate = searchParams.get("startDate") || searchParams.get("dateFrom") || undefined;
    const endDate = searchParams.get("endDate") || searchParams.get("dateTo") || undefined;

    // Parse excludeChannels - comma-separated list
    const excludeChannelsParam = searchParams.get("excludeChannels");
    let excludeContactedVia: ContactChannel[] | undefined;
    if (excludeChannelsParam) {
      const channels = excludeChannelsParam.split(",").filter(
        (c) => VALID_CONTACT_CHANNELS.includes(c as ContactChannel)
      ) as ContactChannel[];
      if (channels.length > 0) {
        excludeContactedVia = channels;
      }
    }

    // Parse contactStatus filter (all, not_contacted, contacted)
    const contactStatus = searchParams.get("contactStatus");
    let contactedVia: ContactChannel[] | undefined;

    // If contactStatus is "not_contacted", we want leads with no contact history
    // If contactStatus is "contacted", we want leads with any contact history
    // The getLeads service handles this via excludeContactedVia and contactedVia params
    if (contactStatus === "contacted") {
      // Include leads contacted via any channel (leave contactedVia undefined, will filter in getLeads)
      contactedVia = VALID_CONTACT_CHANNELS;
    }

    const params: LeadQueryParams = {
      status: searchParams.get("status") as LeadStatus | undefined,
      tier: searchParams.get("tier") as LeadTier | undefined,
      industry: searchParams.get("industry") || undefined,
      formType: searchParams.get("formType") as LeadFormType | undefined,
      startDate,
      endDate,
      minScore: searchParams.get("minScore")
        ? parseInt(searchParams.get("minScore")!, 10)
        : undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") || searchParams.get("pageSize")
        ? parseInt(searchParams.get("limit") || searchParams.get("pageSize")!, 10)
        : 50,
      lastKey: searchParams.get("lastKey") || undefined,
      sortBy: (searchParams.get("sortBy") || searchParams.get("sortColumn") || "createdAt") as LeadQueryParams["sortBy"],
      sortOrder: (searchParams.get("sortOrder") || searchParams.get("sortDirection") || "desc") as LeadQueryParams["sortOrder"],
      excludeContactedVia,
      contactedVia: contactStatus === "contacted" ? contactedVia : undefined,
    };

    let result = await getLeads(params);

    // Additional client-side filtering for contactStatus === "not_contacted"
    // This filters leads that have no contact history at all
    if (contactStatus === "not_contacted") {
      result = {
        ...result,
        leads: result.leads.filter(
          (lead) => !lead.contactHistory || lead.contactHistory.length === 0
        ),
        totalCount: result.leads.filter(
          (lead) => !lead.contactHistory || lead.contactHistory.length === 0
        ).length,
      };
    }

    // Map to the format expected by the dashboard
    const mappedLeads = result.leads.map((lead) => ({
      id: lead.leadId,
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      company: lead.company || lead.identifiedCompany || null,
      status: lead.status,
      tier: lead.tier || "C",
      score: lead.behaviorScore || 0,
      source: lead.utmSource || lead.referrerSource || lead.firstTouchSource || "direct",
      industry: lead.industry || lead.identifiedIndustry || null,
      createdAt: lead.createdAt,
      contactHistory: lead.contactHistory,
    }));

    return NextResponse.json({
      leads: mappedLeads,
      total: result.totalCount,
      page: parseInt(searchParams.get("page") || "1", 10),
      pageSize: parseInt(searchParams.get("pageSize") || "50", 10),
      totalPages: Math.ceil(result.totalCount / parseInt(searchParams.get("pageSize") || "50", 10)),
      stats: {
        total: result.totalCount,
        newThisWeek: 0, // TODO: Calculate from actual data
        avgBehaviorScore: 0,
        conversionRate: 0,
      },
      lastKey: result.lastKey,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      error: "Failed to fetch leads",
      details: errorMessage,
      region: process.env.DYNAMODB_REGION || "us-east-1"
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.formType || !body.sourcePage) {
      return NextResponse.json(
        { error: "Missing required fields: email, firstName, lastName, formType, sourcePage" },
        { status: 400 }
      );
    }

    const input: CreateLeadInput = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company,
      phone: body.phone,
      message: body.message,
      formType: body.formType,
      resourceSlug: body.resourceSlug,
      resourceTitle: body.resourceTitle,
      sourcePage: body.sourcePage,
      visitorId: body.visitorId,
      sessionId: body.sessionId,
      behaviorScore: body.behaviorScore,
      behaviorTier: body.behaviorTier,
      pagesVisited: body.pagesVisited,
      pageJourney: body.pageJourney,
      identifiedCompany: body.identifiedCompany,
      identifiedDomain: body.identifiedDomain,
      identifiedIndustry: body.identifiedIndustry,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      utmTerm: body.utmTerm,
      utmContent: body.utmContent,
      referrerSource: body.referrerSource,
      referrerMedium: body.referrerMedium,
      firstTouchSource: body.firstTouchSource,
      firstTouchLandingPage: body.firstTouchLandingPage,
      firstVisitDate: body.firstVisitDate,
      assessmentScores: body.assessmentScores,
      assessmentTier: body.assessmentTier,
    };

    const lead = await createLead(input);

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
