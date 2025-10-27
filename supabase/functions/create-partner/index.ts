import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PartnerData {
  companyId: string;
  twilioSid?: string;
  twilioToken?: string;
  legalName: string;
  llcName?: string;
  ein: string;
  businessType: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  businessWebsite: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  jobTitle: string;
  hasTwilio: 'yes' | 'no';
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create Supabase client with service role for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const partnerData: PartnerData = await req.json();
    
    console.log('Received partner creation request for companyId:', partnerData.companyId);

    // Validate that the agency with this companyId exists and was created recently (within 1 hour)
    const { data: agency, error: agencyError } = await supabase
      .from('agency')
      .select('id, companyId, created_at')
      .eq('companyId', partnerData.companyId)
      .gt('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .maybeSingle();

    if (agencyError) {
      console.error('Error fetching agency:', agencyError);
      return new Response(
        JSON.stringify({ error: 'Failed to validate company', details: agencyError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!agency) {
      console.error('Agency not found or too old for companyId:', partnerData.companyId);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired company ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate a unique locationId (using companyId as base)
    const locationId = `loc_${partnerData.companyId}`;

    // Prepare partner record
    const partnerRecord = {
      locationid: locationId,
      companyid: partnerData.companyId,
      name: partnerData.legalName,
      email: partnerData.contactEmail,
      phone: partnerData.contactPhone,
      address: partnerData.street,
      website: partnerData.businessWebsite,
      city: partnerData.city,
      state: partnerData.state,
      zipCode: partnerData.zip,
      twilio_sid: partnerData.hasTwilio === 'yes' ? partnerData.twilioSid : null,
      twilio_auth: partnerData.hasTwilio === 'yes' ? partnerData.twilioToken : null,
      llc_name: partnerData.llcName || null,
      ein: partnerData.ein,
      business_type: partnerData.businessType,
      industry: partnerData.industry,
      job_title: partnerData.jobTitle,
      onboardingDone: false,
    };

    console.log('Creating partner with locationId:', locationId);

    // Insert partner record
    const { data: partner, error: insertError } = await supabase
      .from('partners')
      .insert(partnerRecord)
      .select()
      .single();

    if (insertError) {
      console.error('Error creating partner:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create partner', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Partner created successfully:', partner.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        partner: {
          id: partner.id,
          locationId: partner.locationid,
          companyId: partner.companyid
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
