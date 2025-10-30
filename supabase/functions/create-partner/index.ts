import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PartnerData {
  companyId?: string;
  key?: string;
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
  contactFirstName: string;
  contactLastName: string;
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
    console.log('Received partner data:', { companyId: partnerData.companyId, key: partnerData.key });

    let resolvedCompanyId = partnerData.companyId;
    
    // If key is provided instead of companyId, look up the agency
    if (partnerData.key && !partnerData.companyId) {
      console.log('Looking up agency by key:', partnerData.key);
      
      const { data: agencyByKey, error: keyError } = await supabase
        .from('agency')
        .select('companyId')
        .eq('key', partnerData.key)
        .maybeSingle();
      
      if (keyError || !agencyByKey) {
        console.error('Error fetching agency by key:', keyError);
        return new Response(
          JSON.stringify({ error: 'Invalid agency key' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      resolvedCompanyId = agencyByKey.companyId;
      console.log('Resolved companyId from key:', resolvedCompanyId);
    }
    
    if (!resolvedCompanyId) {
      return new Response(
        JSON.stringify({ error: 'Missing companyId or key' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate that the agency exists
    // For key-based flow, skip the time constraint since the agency may be older
    let agencyQuery = supabase
      .from('agency')
      .select('id, companyId, created_at')
      .eq('companyId', resolvedCompanyId);
    
    // Only add time constraint if using companyId (not key)
    if (partnerData.companyId && !partnerData.key) {
      agencyQuery = agencyQuery.gt('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());
    }
    
    const { data: agency, error: agencyError } = await agencyQuery.maybeSingle();

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

    // Generate a unique locationId (using resolved companyId)
    const locationId = resolvedCompanyId;

    // Prepare partner record
    const partnerRecord = {
      locationid: locationId,
      companyid: resolvedCompanyId,
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
      clientName: partnerData.contactFirstName,
      clientLastName: partnerData.contactLastName,
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
