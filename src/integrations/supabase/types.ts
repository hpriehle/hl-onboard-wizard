export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      acquisition_opportunites: {
        Row: {
          created_at: string
          folderId: string | null
          id: number
          name: string | null
          sheetId: string | null
        }
        Insert: {
          created_at?: string
          folderId?: string | null
          id?: number
          name?: string | null
          sheetId?: string | null
        }
        Update: {
          created_at?: string
          folderId?: string | null
          id?: number
          name?: string | null
          sheetId?: string | null
        }
        Relationships: []
      }
      agency: {
        Row: {
          access_token: string | null
          adminEmails: Json | null
          agency_partner: number | null
          "claude-apiKey": string | null
          "commio-password": string | null
          "commio-username": string | null
          companyId: string | null
          companyName: string | null
          created_at: string
          customMenuLink: string | null
          "customMenuLink-messaging": string | null
          "dc-recordingId1": string | null
          "dc-recordingId2": string | null
          "dc-recordingId3": string | null
          dropCowboy_poolId: string | null
          "dropCowboy-apiKey": string | null
          "dropCowboy-brandId": string | null
          "dropCowboy-teamId": string | null
          email: string | null
          firstName: string | null
          id: number
          "instantly-apiKey": string | null
          instantlyCampaignId: string | null
          key: string | null
          lastName: string | null
          managed: boolean | null
          nameTitle: string | null
          "openAI-apiKey": string | null
          phone: string | null
          refresh_token: string | null
          reoonApiKey: string | null
          retell_apiKey: string | null
          retellAgentId: string | null
          sms_provider: string | null
          snapshotId: string | null
          twilio_auth: string | null
          twilio_primarySID: string | null
          twilio_sid: string | null
          website: string | null
          whiteLabelDomain: string | null
        }
        Insert: {
          access_token?: string | null
          adminEmails?: Json | null
          agency_partner?: number | null
          "claude-apiKey"?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyId?: string | null
          companyName?: string | null
          created_at?: string
          customMenuLink?: string | null
          "customMenuLink-messaging"?: string | null
          "dc-recordingId1"?: string | null
          "dc-recordingId2"?: string | null
          "dc-recordingId3"?: string | null
          dropCowboy_poolId?: string | null
          "dropCowboy-apiKey"?: string | null
          "dropCowboy-brandId"?: string | null
          "dropCowboy-teamId"?: string | null
          email?: string | null
          firstName?: string | null
          id?: number
          "instantly-apiKey"?: string | null
          instantlyCampaignId?: string | null
          key?: string | null
          lastName?: string | null
          managed?: boolean | null
          nameTitle?: string | null
          "openAI-apiKey"?: string | null
          phone?: string | null
          refresh_token?: string | null
          reoonApiKey?: string | null
          retell_apiKey?: string | null
          retellAgentId?: string | null
          sms_provider?: string | null
          snapshotId?: string | null
          twilio_auth?: string | null
          twilio_primarySID?: string | null
          twilio_sid?: string | null
          website?: string | null
          whiteLabelDomain?: string | null
        }
        Update: {
          access_token?: string | null
          adminEmails?: Json | null
          agency_partner?: number | null
          "claude-apiKey"?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyId?: string | null
          companyName?: string | null
          created_at?: string
          customMenuLink?: string | null
          "customMenuLink-messaging"?: string | null
          "dc-recordingId1"?: string | null
          "dc-recordingId2"?: string | null
          "dc-recordingId3"?: string | null
          dropCowboy_poolId?: string | null
          "dropCowboy-apiKey"?: string | null
          "dropCowboy-brandId"?: string | null
          "dropCowboy-teamId"?: string | null
          email?: string | null
          firstName?: string | null
          id?: number
          "instantly-apiKey"?: string | null
          instantlyCampaignId?: string | null
          key?: string | null
          lastName?: string | null
          managed?: boolean | null
          nameTitle?: string | null
          "openAI-apiKey"?: string | null
          phone?: string | null
          refresh_token?: string | null
          reoonApiKey?: string | null
          retell_apiKey?: string | null
          retellAgentId?: string | null
          sms_provider?: string | null
          snapshotId?: string | null
          twilio_auth?: string | null
          twilio_primarySID?: string | null
          twilio_sid?: string | null
          website?: string | null
          whiteLabelDomain?: string | null
        }
        Relationships: []
      }
      ai_text_operations: {
        Row: {
          contactId: string | null
          created_at: string
          id: number
          locationId: string | null
          messageBody: string | null
          replied: boolean | null
        }
        Insert: {
          contactId?: string | null
          created_at?: string
          id?: number
          locationId?: string | null
          messageBody?: string | null
          replied?: boolean | null
        }
        Update: {
          contactId?: string | null
          created_at?: string
          id?: number
          locationId?: string | null
          messageBody?: string | null
          replied?: boolean | null
        }
        Relationships: []
      }
      comp_profile: {
        Row: {
          business_type: string | null
          buy_box: string | null
          company_id: string | null
          created_at: string | null
          curated_by: string
          geographic_focus: string | null
          id: string
          is_active: boolean | null
          key_criteria: Json | null
          preferred_client_profile: string | null
          primary_contact_name: string | null
          primary_contact_role: string | null
          recommended_prioritization: string | null
          special_requirements: string | null
          target_aum: string | null
          title: string
          total_addressable_opportunity: string | null
          transcript: string | null
          updated_at: string | null
          zoomInfo_filter_url: string | null
          zoomInfo_filters: Json | null
        }
        Insert: {
          business_type?: string | null
          buy_box?: string | null
          company_id?: string | null
          created_at?: string | null
          curated_by: string
          geographic_focus?: string | null
          id?: string
          is_active?: boolean | null
          key_criteria?: Json | null
          preferred_client_profile?: string | null
          primary_contact_name?: string | null
          primary_contact_role?: string | null
          recommended_prioritization?: string | null
          special_requirements?: string | null
          target_aum?: string | null
          title: string
          total_addressable_opportunity?: string | null
          transcript?: string | null
          updated_at?: string | null
          zoomInfo_filter_url?: string | null
          zoomInfo_filters?: Json | null
        }
        Update: {
          business_type?: string | null
          buy_box?: string | null
          company_id?: string | null
          created_at?: string | null
          curated_by?: string
          geographic_focus?: string | null
          id?: string
          is_active?: boolean | null
          key_criteria?: Json | null
          preferred_client_profile?: string | null
          primary_contact_name?: string | null
          primary_contact_role?: string | null
          recommended_prioritization?: string | null
          special_requirements?: string | null
          target_aum?: string | null
          title?: string
          total_addressable_opportunity?: string | null
          transcript?: string | null
          updated_at?: string | null
          zoomInfo_filter_url?: string | null
          zoomInfo_filters?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "comp_profile_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          access_password: string
          client: boolean | null
          company_name: string
          contact_id: string | null
          created_at: string | null
          current: boolean | null
          id: string
          is_active: boolean | null
          report_status: boolean | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          access_password: string
          client?: boolean | null
          company_name: string
          contact_id?: string | null
          created_at?: string | null
          current?: boolean | null
          id?: string
          is_active?: boolean | null
          report_status?: boolean | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          access_password?: string
          client?: boolean | null
          company_name?: string
          contact_id?: string | null
          created_at?: string | null
          current?: boolean | null
          id?: string
          is_active?: boolean | null
          report_status?: boolean | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      conversation_flows: {
        Row: {
          active: boolean | null
          created_at: string
          draft_workflow_json: Json | null
          id: string
          language: string | null
          locationid: string | null
          locationId: string | null
          name: string
          partner_config: number | null
          partner_id: number | null
          retell_agent_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          draft_workflow_json?: Json | null
          id?: string
          language?: string | null
          locationid?: string | null
          locationId?: string | null
          name?: string
          partner_config?: number | null
          partner_id?: number | null
          retell_agent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          draft_workflow_json?: Json | null
          id?: string
          language?: string | null
          locationid?: string | null
          locationId?: string | null
          name?: string
          partner_config?: number | null
          partner_id?: number | null
          retell_agent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_flows_partner_config_fkey"
            columns: ["partner_config"]
            isOneToOne: false
            referencedRelation: "partner_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_flows_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "conversation_flows_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      ix_users: {
        Row: {
          created_at: string
          email: string
          id: string
          location_id: string | null
          name: string
          password_hash: string | null
          plain_text_password: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          location_id?: string | null
          name: string
          password_hash?: string | null
          plain_text_password?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          location_id?: string | null
          name?: string
          password_hash?: string | null
          plain_text_password?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      lead_app_database: {
        Row: {
          campaignId: number | null
          city: string | null
          claimed: boolean | null
          company_annual_revenue: string | null
          company_annual_revenue_clean: string | null
          company_city: string | null
          company_country: string | null
          company_description: string | null
          company_domain: string | null
          company_founded_year: string | null
          company_full_address: string | null
          company_linkedin: string | null
          company_linkedin_uid: string | null
          company_name: string | null
          company_phone: string | null
          company_postal_code: string | null
          company_size: number | null
          company_state: string | null
          company_street_address: string | null
          company_technologies: string | null
          company_total_funding: string | null
          company_total_funding_clean: string | null
          company_website: string | null
          contactId: string | null
          cost_breakdown: Json | null
          country: string | null
          created_at: string
          email: string | null
          enrich_cost: number | null
          enriched: boolean | null
          facebook: string | null
          first_name: string | null
          full_name: string | null
          functional_level: string | null
          has_email: boolean | null
          has_mobile: boolean | null
          headline: string | null
          id: string
          industry: string | null
          instagram: string | null
          job_title: string | null
          keywords: string | null
          last_name: string | null
          leadFetchId: number | null
          linkedin: string | null
          mobile: string | null
          mobile_source: string | null
          partnerId: number | null
          personal_email: string | null
          pinterest: string | null
          seniority_level: string | null
          state: string | null
          tiktok: string | null
          twitter: string | null
          whatsapp: string | null
          youtube: string | null
        }
        Insert: {
          campaignId?: number | null
          city?: string | null
          claimed?: boolean | null
          company_annual_revenue?: string | null
          company_annual_revenue_clean?: string | null
          company_city?: string | null
          company_country?: string | null
          company_description?: string | null
          company_domain?: string | null
          company_founded_year?: string | null
          company_full_address?: string | null
          company_linkedin?: string | null
          company_linkedin_uid?: string | null
          company_name?: string | null
          company_phone?: string | null
          company_postal_code?: string | null
          company_size?: number | null
          company_state?: string | null
          company_street_address?: string | null
          company_technologies?: string | null
          company_total_funding?: string | null
          company_total_funding_clean?: string | null
          company_website?: string | null
          contactId?: string | null
          cost_breakdown?: Json | null
          country?: string | null
          created_at?: string
          email?: string | null
          enrich_cost?: number | null
          enriched?: boolean | null
          facebook?: string | null
          first_name?: string | null
          full_name?: string | null
          functional_level?: string | null
          has_email?: boolean | null
          has_mobile?: boolean | null
          headline?: string | null
          id?: string
          industry?: string | null
          instagram?: string | null
          job_title?: string | null
          keywords?: string | null
          last_name?: string | null
          leadFetchId?: number | null
          linkedin?: string | null
          mobile?: string | null
          mobile_source?: string | null
          partnerId?: number | null
          personal_email?: string | null
          pinterest?: string | null
          seniority_level?: string | null
          state?: string | null
          tiktok?: string | null
          twitter?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Update: {
          campaignId?: number | null
          city?: string | null
          claimed?: boolean | null
          company_annual_revenue?: string | null
          company_annual_revenue_clean?: string | null
          company_city?: string | null
          company_country?: string | null
          company_description?: string | null
          company_domain?: string | null
          company_founded_year?: string | null
          company_full_address?: string | null
          company_linkedin?: string | null
          company_linkedin_uid?: string | null
          company_name?: string | null
          company_phone?: string | null
          company_postal_code?: string | null
          company_size?: number | null
          company_state?: string | null
          company_street_address?: string | null
          company_technologies?: string | null
          company_total_funding?: string | null
          company_total_funding_clean?: string | null
          company_website?: string | null
          contactId?: string | null
          cost_breakdown?: Json | null
          country?: string | null
          created_at?: string
          email?: string | null
          enrich_cost?: number | null
          enriched?: boolean | null
          facebook?: string | null
          first_name?: string | null
          full_name?: string | null
          functional_level?: string | null
          has_email?: boolean | null
          has_mobile?: boolean | null
          headline?: string | null
          id?: string
          industry?: string | null
          instagram?: string | null
          job_title?: string | null
          keywords?: string | null
          last_name?: string | null
          leadFetchId?: number | null
          linkedin?: string | null
          mobile?: string | null
          mobile_source?: string | null
          partnerId?: number | null
          personal_email?: string | null
          pinterest?: string | null
          seniority_level?: string | null
          state?: string | null
          tiktok?: string | null
          twitter?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_app_database_campaignId_fkey"
            columns: ["campaignId"]
            isOneToOne: false
            referencedRelation: "campaign_analytics"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "lead_app_database_campaignId_fkey"
            columns: ["campaignId"]
            isOneToOne: false
            referencedRelation: "lead_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_app_database_leadFetchId_fkey"
            columns: ["leadFetchId"]
            isOneToOne: false
            referencedRelation: "lead_fetch_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_app_database_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "lead_app_database_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_campaigns: {
        Row: {
          campaign_id: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          failed_leads: number | null
          failed_sends: number | null
          id: number
          last_lead_sent_at: string | null
          location_searched: string | null
          name: string | null
          partnerId: number | null
          search_query: string | null
          source_file: string | null
          started_at: string | null
          status: string
          successful_leads: number | null
          successful_sends: number | null
          target_audience: Json | null
          target_criteria: Json | null
          total: number | null
          total_leads: number | null
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          failed_leads?: number | null
          failed_sends?: number | null
          id?: number
          last_lead_sent_at?: string | null
          location_searched?: string | null
          name?: string | null
          partnerId?: number | null
          search_query?: string | null
          source_file?: string | null
          started_at?: string | null
          status?: string
          successful_leads?: number | null
          successful_sends?: number | null
          target_audience?: Json | null
          target_criteria?: Json | null
          total?: number | null
          total_leads?: number | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          failed_leads?: number | null
          failed_sends?: number | null
          id?: number
          last_lead_sent_at?: string | null
          location_searched?: string | null
          name?: string | null
          partnerId?: number | null
          search_query?: string | null
          source_file?: string | null
          started_at?: string | null
          status?: string
          successful_leads?: number | null
          successful_sends?: number | null
          target_audience?: Json | null
          target_criteria?: Json | null
          total?: number | null
          total_leads?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_campaigns_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "lead_campaigns_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_database: {
        Row: {
          age: string | null
          assigned: string | null
          business_email_1: string | null
          business_email_2: string | null
          campaignId: number | null
          claimed: boolean | null
          claimed_by: number | null
          company_address: string | null
          company_description: string | null
          company_domain: string | null
          company_employee_count: string | null
          company_linkedin_url: string | null
          company_name: string | null
          contact_channels: string | null
          contactId: string | null
          created_at: string
          date_added: string | null
          department: string | null
          email: string | null
          file_name: string | null
          first_name: string | null
          has_email: string | null
          has_linkedin: string | null
          has_phone: string | null
          id: string
          income_numeric: string | null
          income_range: string | null
          industry: string | null
          industry_confidence: number | null
          industry_duplicate: string | null
          industry_update_source: string | null
          industry_updated_at: string | null
          is_contactable: string | null
          is_sweet_spot: string | null
          job_title: string | null
          last_name: string | null
          lead_cost: number | null
          lead_score: string | null
          lead_tier: string | null
          linkedin: string | null
          location: string | null
          locationId: string | null
          mobile_phone: string | null
          mobile_phone_1: string | null
          needs_enrichment: boolean | null
          net_worth: string | null
          net_worth_numeric: string | null
          original_industry: string | null
          personal_city: string | null
          personal_state: string | null
          revenue: string | null
          revenue_numeric: string | null
          revenue_plus: string | null
          seniority_level: string | null
          source: string | null
          timestamp: string | null
          unique_id: string | null
          updated_at: string
        }
        Insert: {
          age?: string | null
          assigned?: string | null
          business_email_1?: string | null
          business_email_2?: string | null
          campaignId?: number | null
          claimed?: boolean | null
          claimed_by?: number | null
          company_address?: string | null
          company_description?: string | null
          company_domain?: string | null
          company_employee_count?: string | null
          company_linkedin_url?: string | null
          company_name?: string | null
          contact_channels?: string | null
          contactId?: string | null
          created_at?: string
          date_added?: string | null
          department?: string | null
          email?: string | null
          file_name?: string | null
          first_name?: string | null
          has_email?: string | null
          has_linkedin?: string | null
          has_phone?: string | null
          id?: string
          income_numeric?: string | null
          income_range?: string | null
          industry?: string | null
          industry_confidence?: number | null
          industry_duplicate?: string | null
          industry_update_source?: string | null
          industry_updated_at?: string | null
          is_contactable?: string | null
          is_sweet_spot?: string | null
          job_title?: string | null
          last_name?: string | null
          lead_cost?: number | null
          lead_score?: string | null
          lead_tier?: string | null
          linkedin?: string | null
          location?: string | null
          locationId?: string | null
          mobile_phone?: string | null
          mobile_phone_1?: string | null
          needs_enrichment?: boolean | null
          net_worth?: string | null
          net_worth_numeric?: string | null
          original_industry?: string | null
          personal_city?: string | null
          personal_state?: string | null
          revenue?: string | null
          revenue_numeric?: string | null
          revenue_plus?: string | null
          seniority_level?: string | null
          source?: string | null
          timestamp?: string | null
          unique_id?: string | null
          updated_at?: string
        }
        Update: {
          age?: string | null
          assigned?: string | null
          business_email_1?: string | null
          business_email_2?: string | null
          campaignId?: number | null
          claimed?: boolean | null
          claimed_by?: number | null
          company_address?: string | null
          company_description?: string | null
          company_domain?: string | null
          company_employee_count?: string | null
          company_linkedin_url?: string | null
          company_name?: string | null
          contact_channels?: string | null
          contactId?: string | null
          created_at?: string
          date_added?: string | null
          department?: string | null
          email?: string | null
          file_name?: string | null
          first_name?: string | null
          has_email?: string | null
          has_linkedin?: string | null
          has_phone?: string | null
          id?: string
          income_numeric?: string | null
          income_range?: string | null
          industry?: string | null
          industry_confidence?: number | null
          industry_duplicate?: string | null
          industry_update_source?: string | null
          industry_updated_at?: string | null
          is_contactable?: string | null
          is_sweet_spot?: string | null
          job_title?: string | null
          last_name?: string | null
          lead_cost?: number | null
          lead_score?: string | null
          lead_tier?: string | null
          linkedin?: string | null
          location?: string | null
          locationId?: string | null
          mobile_phone?: string | null
          mobile_phone_1?: string | null
          needs_enrichment?: boolean | null
          net_worth?: string | null
          net_worth_numeric?: string | null
          original_industry?: string | null
          personal_city?: string | null
          personal_state?: string | null
          revenue?: string | null
          revenue_numeric?: string | null
          revenue_plus?: string | null
          seniority_level?: string | null
          source?: string | null
          timestamp?: string | null
          unique_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_database_campaignId_fkey"
            columns: ["campaignId"]
            isOneToOne: false
            referencedRelation: "campaign_analytics"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "lead_database_campaignId_fkey"
            columns: ["campaignId"]
            isOneToOne: false
            referencedRelation: "lead_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_database_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "lead_database_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_fetch_requests: {
        Row: {
          created_at: string | null
          credits_used: number | null
          estimated_cost: number | null
          filters: Json | null
          id: number
          industry: string | null
          leads_requested: number | null
          metadata: Json | null
          partner_id: number
          quantity: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used?: number | null
          estimated_cost?: number | null
          filters?: Json | null
          id?: number
          industry?: string | null
          leads_requested?: number | null
          metadata?: Json | null
          partner_id: number
          quantity: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number | null
          estimated_cost?: number | null
          filters?: Json | null
          id?: number
          industry?: string | null
          leads_requested?: number | null
          metadata?: Json | null
          partner_id?: number
          quantity?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_fetch_requests_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "lead_fetch_requests_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_industry_changes: {
        Row: {
          batch_id: string | null
          changed_at: string | null
          confidence: number | null
          id: string
          lead_id: string | null
          new_industry: string | null
          new_original_industry: string | null
          old_industry: string | null
          old_original_industry: string | null
          update_source: string | null
        }
        Insert: {
          batch_id?: string | null
          changed_at?: string | null
          confidence?: number | null
          id?: string
          lead_id?: string | null
          new_industry?: string | null
          new_original_industry?: string | null
          old_industry?: string | null
          old_original_industry?: string | null
          update_source?: string | null
        }
        Update: {
          batch_id?: string | null
          changed_at?: string | null
          confidence?: number | null
          id?: string
          lead_id?: string | null
          new_industry?: string | null
          new_original_industry?: string | null
          old_industry?: string | null
          old_original_industry?: string | null
          update_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_industry_changes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead_database"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_call: {
        Row: {
          aiDetection: string | null
          aiImprovement: string | null
          aiImprovementReason: string | null
          appointmentDateTime: string | null
          assistantName: string | null
          callCost: string | null
          callDuration: number | null
          callDurationSec: number | null
          callId: string | null
          callOutcome: string | null
          callOutcomeReason: string | null
          callRecording: string | null
          callSummary: string | null
          callType: string | null
          contactId: string | null
          email: string | null
          endCallReason: string | null
          followUpTimestamp: string | null
          id: string
          name: string | null
          number: string | null
          numberOfCalls: number | null
          partnerId: number | null
          promptUsed: string | null
          timestamp: string | null
          transcript: string | null
        }
        Insert: {
          aiDetection?: string | null
          aiImprovement?: string | null
          aiImprovementReason?: string | null
          appointmentDateTime?: string | null
          assistantName?: string | null
          callCost?: string | null
          callDuration?: number | null
          callDurationSec?: number | null
          callId?: string | null
          callOutcome?: string | null
          callOutcomeReason?: string | null
          callRecording?: string | null
          callSummary?: string | null
          callType?: string | null
          contactId?: string | null
          email?: string | null
          endCallReason?: string | null
          followUpTimestamp?: string | null
          id?: string
          name?: string | null
          number?: string | null
          numberOfCalls?: number | null
          partnerId?: number | null
          promptUsed?: string | null
          timestamp?: string | null
          transcript?: string | null
        }
        Update: {
          aiDetection?: string | null
          aiImprovement?: string | null
          aiImprovementReason?: string | null
          appointmentDateTime?: string | null
          assistantName?: string | null
          callCost?: string | null
          callDuration?: number | null
          callDurationSec?: number | null
          callId?: string | null
          callOutcome?: string | null
          callOutcomeReason?: string | null
          callRecording?: string | null
          callSummary?: string | null
          callType?: string | null
          contactId?: string | null
          email?: string | null
          endCallReason?: string | null
          followUpTimestamp?: string | null
          id?: string
          name?: string | null
          number?: string | null
          numberOfCalls?: number | null
          partnerId?: number | null
          promptUsed?: string | null
          timestamp?: string | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call-incoming_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "call-incoming_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_email: {
        Row: {
          bccEmails: string | null
          bouncedAt: string | null
          bounceReason: string | null
          bounceType: string | null
          cadenceNum: string | null
          campaignId: string | null
          ccEmails: string | null
          clickCount: number | null
          clickedAt: string | null
          contactId: string
          conversationId: string | null
          costPerEmail: number | null
          createdAt: string
          deliveryStatus: string | null
          direction: string
          fromEmail: string
          id: string
          leadDisposition: string | null
          messageContent: string
          messageId: string | null
          openCount: number | null
          openedAt: string | null
          partnerId: number
          replyToEmail: string | null
          responseTime: number | null
          sentAt: string
          sentiment: string | null
          spintax_variants: Json | null
          spintaxContent: string | null
          spintaxVariant: string | null
          stepNumber: number | null
          subject: string | null
          tagsApplied: string | null
          threadId: string | null
          toEmail: string
          unsubscribed: boolean | null
          updatedAt: string
        }
        Insert: {
          bccEmails?: string | null
          bouncedAt?: string | null
          bounceReason?: string | null
          bounceType?: string | null
          cadenceNum?: string | null
          campaignId?: string | null
          ccEmails?: string | null
          clickCount?: number | null
          clickedAt?: string | null
          contactId: string
          conversationId?: string | null
          costPerEmail?: number | null
          createdAt?: string
          deliveryStatus?: string | null
          direction: string
          fromEmail: string
          id?: string
          leadDisposition?: string | null
          messageContent: string
          messageId?: string | null
          openCount?: number | null
          openedAt?: string | null
          partnerId: number
          replyToEmail?: string | null
          responseTime?: number | null
          sentAt?: string
          sentiment?: string | null
          spintax_variants?: Json | null
          spintaxContent?: string | null
          spintaxVariant?: string | null
          stepNumber?: number | null
          subject?: string | null
          tagsApplied?: string | null
          threadId?: string | null
          toEmail: string
          unsubscribed?: boolean | null
          updatedAt?: string
        }
        Update: {
          bccEmails?: string | null
          bouncedAt?: string | null
          bounceReason?: string | null
          bounceType?: string | null
          cadenceNum?: string | null
          campaignId?: string | null
          ccEmails?: string | null
          clickCount?: number | null
          clickedAt?: string | null
          contactId?: string
          conversationId?: string | null
          costPerEmail?: number | null
          createdAt?: string
          deliveryStatus?: string | null
          direction?: string
          fromEmail?: string
          id?: string
          leadDisposition?: string | null
          messageContent?: string
          messageId?: string | null
          openCount?: number | null
          openedAt?: string | null
          partnerId?: number
          replyToEmail?: string | null
          responseTime?: number | null
          sentAt?: string
          sentiment?: string | null
          spintax_variants?: Json | null
          spintaxContent?: string | null
          spintaxVariant?: string | null
          stepNumber?: number | null
          subject?: string | null
          tagsApplied?: string | null
          threadId?: string | null
          toEmail?: string
          unsubscribed?: boolean | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_email_partnerid_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "messages_email_partnerid_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_rvm: {
        Row: {
          cadenceNum: string | null
          callResult: string | null
          contactId: string
          conversationId: string | null
          costPerRvm: number | null
          createdAt: string
          deliveredAt: string | null
          deliveryStatus: string | null
          id: string
          messageId: string | null
          metadata: Json | null
          partnerId: number
          recordingId: string
          sentAt: string
          stepNumber: number | null
          tagsApplied: string | null
          toPhone: string | null
          transcription: string | null
          updatedAt: string
        }
        Insert: {
          cadenceNum?: string | null
          callResult?: string | null
          contactId: string
          conversationId?: string | null
          costPerRvm?: number | null
          createdAt?: string
          deliveredAt?: string | null
          deliveryStatus?: string | null
          id?: string
          messageId?: string | null
          metadata?: Json | null
          partnerId: number
          recordingId: string
          sentAt?: string
          stepNumber?: number | null
          tagsApplied?: string | null
          toPhone?: string | null
          transcription?: string | null
          updatedAt?: string
        }
        Update: {
          cadenceNum?: string | null
          callResult?: string | null
          contactId?: string
          conversationId?: string | null
          costPerRvm?: number | null
          createdAt?: string
          deliveredAt?: string | null
          deliveryStatus?: string | null
          id?: string
          messageId?: string | null
          metadata?: Json | null
          partnerId?: number
          recordingId?: string
          sentAt?: string
          stepNumber?: number | null
          tagsApplied?: string | null
          toPhone?: string | null
          transcription?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_rvm_outbound_partnerid_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "messages_rvm_outbound_partnerid_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_sms: {
        Row: {
          contactId: string | null
          conversationId: string | null
          costPerMessage: number | null
          createdAt: string | null
          deliveredAt: string | null
          direction: string
          fromNumber: string | null
          id: string
          leadDisposition: string | null
          messageContent: string
          messageId: string | null
          messageLength: number | null
          optOutStatus: boolean | null
          partnerId: number | null
          segments: number | null
          sentAt: string
          spintax_variants: Json | null
          spintaxVariant: string | null
          stepNumber: number | null
          tagsApplied: string | null
          tokens: number | null
          toNumber: string | null
          updatedAt: string | null
        }
        Insert: {
          contactId?: string | null
          conversationId?: string | null
          costPerMessage?: number | null
          createdAt?: string | null
          deliveredAt?: string | null
          direction: string
          fromNumber?: string | null
          id?: string
          leadDisposition?: string | null
          messageContent: string
          messageId?: string | null
          messageLength?: number | null
          optOutStatus?: boolean | null
          partnerId?: number | null
          segments?: number | null
          sentAt?: string
          spintax_variants?: Json | null
          spintaxVariant?: string | null
          stepNumber?: number | null
          tagsApplied?: string | null
          tokens?: number | null
          toNumber?: string | null
          updatedAt?: string | null
        }
        Update: {
          contactId?: string | null
          conversationId?: string | null
          costPerMessage?: number | null
          createdAt?: string | null
          deliveredAt?: string | null
          direction?: string
          fromNumber?: string | null
          id?: string
          leadDisposition?: string | null
          messageContent?: string
          messageId?: string | null
          messageLength?: number | null
          optOutStatus?: boolean | null
          partnerId?: number | null
          segments?: number | null
          sentAt?: string
          spintax_variants?: Json | null
          spintaxVariant?: string | null
          stepNumber?: number | null
          tagsApplied?: string | null
          tokens?: number | null
          toNumber?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_sms_partnerid_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "messages_sms_partnerid_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_label: string | null
          action_type: string
          action_url: string | null
          created_at: string
          description: string
          id: string
          is_done: boolean
          is_read: boolean
          partner_id: number
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_label?: string | null
          action_type?: string
          action_url?: string | null
          created_at?: string
          description: string
          id?: string
          is_done?: boolean
          is_read?: boolean
          partner_id: number
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_label?: string | null
          action_type?: string
          action_url?: string | null
          created_at?: string
          description?: string
          id?: string
          is_done?: boolean
          is_read?: boolean
          partner_id?: number
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "notifications_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach: {
        Row: {
          business_description: string | null
          business_name: string | null
          call_total_cost: number | null
          call_total_received: number | null
          call_total_sent: number | null
          campaign: string | null
          closing_fee_collected: number | null
          closing_value: number | null
          contact_id: string
          created_at: string | null
          email: string | null
          email_api_cost: number | null
          email_total_cost: number | null
          email_total_received: number | null
          email_total_sent: number | null
          first_name: string | null
          full_address: string | null
          industries: string | null
          last_name: string | null
          lead_cost: number | null
          lead_source: string | null
          linkedin: string | null
          listing_fee_collected: number | null
          listing_value: number | null
          location_id: string | null
          naics_code: string | null
          opportunity_stage: string | null
          partnerId: number | null
          phone: string | null
          revenue: number | null
          rvm_total_cost: number | null
          rvm_total_sent: number | null
          sms_total_cost: number | null
          sms_total_received: number | null
          sms_total_sent: number | null
          text_api_cost: number | null
          title: string | null
          updated_at: string | null
          verified_enriched: string | null
          voice_api_cost: number | null
          website: string | null
        }
        Insert: {
          business_description?: string | null
          business_name?: string | null
          call_total_cost?: number | null
          call_total_received?: number | null
          call_total_sent?: number | null
          campaign?: string | null
          closing_fee_collected?: number | null
          closing_value?: number | null
          contact_id: string
          created_at?: string | null
          email?: string | null
          email_api_cost?: number | null
          email_total_cost?: number | null
          email_total_received?: number | null
          email_total_sent?: number | null
          first_name?: string | null
          full_address?: string | null
          industries?: string | null
          last_name?: string | null
          lead_cost?: number | null
          lead_source?: string | null
          linkedin?: string | null
          listing_fee_collected?: number | null
          listing_value?: number | null
          location_id?: string | null
          naics_code?: string | null
          opportunity_stage?: string | null
          partnerId?: number | null
          phone?: string | null
          revenue?: number | null
          rvm_total_cost?: number | null
          rvm_total_sent?: number | null
          sms_total_cost?: number | null
          sms_total_received?: number | null
          sms_total_sent?: number | null
          text_api_cost?: number | null
          title?: string | null
          updated_at?: string | null
          verified_enriched?: string | null
          voice_api_cost?: number | null
          website?: string | null
        }
        Update: {
          business_description?: string | null
          business_name?: string | null
          call_total_cost?: number | null
          call_total_received?: number | null
          call_total_sent?: number | null
          campaign?: string | null
          closing_fee_collected?: number | null
          closing_value?: number | null
          contact_id?: string
          created_at?: string | null
          email?: string | null
          email_api_cost?: number | null
          email_total_cost?: number | null
          email_total_received?: number | null
          email_total_sent?: number | null
          first_name?: string | null
          full_address?: string | null
          industries?: string | null
          last_name?: string | null
          lead_cost?: number | null
          lead_source?: string | null
          linkedin?: string | null
          listing_fee_collected?: number | null
          listing_value?: number | null
          location_id?: string | null
          naics_code?: string | null
          opportunity_stage?: string | null
          partnerId?: number | null
          phone?: string | null
          revenue?: number | null
          rvm_total_cost?: number | null
          rvm_total_sent?: number | null
          sms_total_cost?: number | null
          sms_total_received?: number | null
          sms_total_sent?: number | null
          text_api_cost?: number | null
          title?: string | null
          updated_at?: string | null
          verified_enriched?: string | null
          voice_api_cost?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outreach_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "outreach_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_audit_log: {
        Row: {
          changed_at: string | null
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          partner_id: number
          user_id: string
        }
        Insert: {
          changed_at?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          partner_id: number
          user_id: string
        }
        Update: {
          changed_at?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          partner_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_audit_log_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "partner_audit_log_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_config: {
        Row: {
          ai_name: string | null
          ai_relationship_statement: string | null
          ai_role: string | null
          approved_transition_phrases: Json | null
          authority_reveal: string | null
          business_context: string | null
          business_name: string | null
          business_name_usage_rule: string | null
          campaign_objective: string | null
          close_formula: string | null
          contrarian_insight: string | null
          conversation_flow_id: string | null
          core_offering: string | null
          cost_of_inaction: string | null
          created_at: string | null
          current_urgency: string | null
          data_gap_handling_rules: Json | null
          decision_making_style: string | null
          default_message_length: string | null
          dream_outcome: string | null
          effort_required: string | null
          empathy_level: string | null
          escalation_rules: Json | null
          failure_completion_rules: Json | null
          forbidden_elements_list: Json | null
          forbidden_phrases_list: Json | null
          formality_level: string | null
          future_vision: string | null
          id: number
          industry_context: string | null
          industry_usage_rule: string | null
          intelligence_display: string | null
          likelihood_of_success: string | null
          location_usage_rule: string | null
          longer_message_conditions: string | null
          maximum_message_length: string | null
          objections: Json | null
          opening_hook: string | null
          partner_id: number
          partner_name: string
          pattern_recognition: string | null
          persistence_level_description: string | null
          persistence_style: string | null
          personal_experience: string | null
          required_elements_list: Json | null
          revenue_usage_rule: string | null
          right_to_contact: string | null
          smallest_ask: string | null
          sms_campaign_config: Json | null
          specialized_knowledge: string | null
          specific_observation: string | null
          success_completion_rule: string | null
          successful_exit_message: string | null
          target_audience: string | null
          target_audience_description: string | null
          time_investment: string | null
          track_record: string | null
          trust_building_tactics: Json | null
          unique_access: string | null
          unsuccessful_exit_message: string | null
          unusual_requests: Json | null
          updated_at: string | null
          value_adding_tactics: Json | null
          voice_agent_config: Json | null
          voicemail_scripts_config: Json | null
          what_they_care_about: string | null
        }
        Insert: {
          ai_name?: string | null
          ai_relationship_statement?: string | null
          ai_role?: string | null
          approved_transition_phrases?: Json | null
          authority_reveal?: string | null
          business_context?: string | null
          business_name?: string | null
          business_name_usage_rule?: string | null
          campaign_objective?: string | null
          close_formula?: string | null
          contrarian_insight?: string | null
          conversation_flow_id?: string | null
          core_offering?: string | null
          cost_of_inaction?: string | null
          created_at?: string | null
          current_urgency?: string | null
          data_gap_handling_rules?: Json | null
          decision_making_style?: string | null
          default_message_length?: string | null
          dream_outcome?: string | null
          effort_required?: string | null
          empathy_level?: string | null
          escalation_rules?: Json | null
          failure_completion_rules?: Json | null
          forbidden_elements_list?: Json | null
          forbidden_phrases_list?: Json | null
          formality_level?: string | null
          future_vision?: string | null
          id?: number
          industry_context?: string | null
          industry_usage_rule?: string | null
          intelligence_display?: string | null
          likelihood_of_success?: string | null
          location_usage_rule?: string | null
          longer_message_conditions?: string | null
          maximum_message_length?: string | null
          objections?: Json | null
          opening_hook?: string | null
          partner_id: number
          partner_name: string
          pattern_recognition?: string | null
          persistence_level_description?: string | null
          persistence_style?: string | null
          personal_experience?: string | null
          required_elements_list?: Json | null
          revenue_usage_rule?: string | null
          right_to_contact?: string | null
          smallest_ask?: string | null
          sms_campaign_config?: Json | null
          specialized_knowledge?: string | null
          specific_observation?: string | null
          success_completion_rule?: string | null
          successful_exit_message?: string | null
          target_audience?: string | null
          target_audience_description?: string | null
          time_investment?: string | null
          track_record?: string | null
          trust_building_tactics?: Json | null
          unique_access?: string | null
          unsuccessful_exit_message?: string | null
          unusual_requests?: Json | null
          updated_at?: string | null
          value_adding_tactics?: Json | null
          voice_agent_config?: Json | null
          voicemail_scripts_config?: Json | null
          what_they_care_about?: string | null
        }
        Update: {
          ai_name?: string | null
          ai_relationship_statement?: string | null
          ai_role?: string | null
          approved_transition_phrases?: Json | null
          authority_reveal?: string | null
          business_context?: string | null
          business_name?: string | null
          business_name_usage_rule?: string | null
          campaign_objective?: string | null
          close_formula?: string | null
          contrarian_insight?: string | null
          conversation_flow_id?: string | null
          core_offering?: string | null
          cost_of_inaction?: string | null
          created_at?: string | null
          current_urgency?: string | null
          data_gap_handling_rules?: Json | null
          decision_making_style?: string | null
          default_message_length?: string | null
          dream_outcome?: string | null
          effort_required?: string | null
          empathy_level?: string | null
          escalation_rules?: Json | null
          failure_completion_rules?: Json | null
          forbidden_elements_list?: Json | null
          forbidden_phrases_list?: Json | null
          formality_level?: string | null
          future_vision?: string | null
          id?: number
          industry_context?: string | null
          industry_usage_rule?: string | null
          intelligence_display?: string | null
          likelihood_of_success?: string | null
          location_usage_rule?: string | null
          longer_message_conditions?: string | null
          maximum_message_length?: string | null
          objections?: Json | null
          opening_hook?: string | null
          partner_id?: number
          partner_name?: string
          pattern_recognition?: string | null
          persistence_level_description?: string | null
          persistence_style?: string | null
          personal_experience?: string | null
          required_elements_list?: Json | null
          revenue_usage_rule?: string | null
          right_to_contact?: string | null
          smallest_ask?: string | null
          sms_campaign_config?: Json | null
          specialized_knowledge?: string | null
          specific_observation?: string | null
          success_completion_rule?: string | null
          successful_exit_message?: string | null
          target_audience?: string | null
          target_audience_description?: string | null
          time_investment?: string | null
          track_record?: string | null
          trust_building_tactics?: Json | null
          unique_access?: string | null
          unsuccessful_exit_message?: string | null
          unusual_requests?: Json | null
          updated_at?: string | null
          value_adding_tactics?: Json | null
          voice_agent_config?: Json | null
          voicemail_scripts_config?: Json | null
          what_they_care_about?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_config_conversation_flow_id_fkey"
            columns: ["conversation_flow_id"]
            isOneToOne: false
            referencedRelation: "conversation_flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_config_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: true
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "partner_config_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: true
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_credit_balances: {
        Row: {
          available_credits: number
          created_at: string
          id: number
          partner_id: number
          subscription_monthly_credits: number
          subscription_renews_at: string | null
          total_purchased: number
          total_used: number
          updated_at: string
        }
        Insert: {
          available_credits?: number
          created_at?: string
          id?: number
          partner_id: number
          subscription_monthly_credits?: number
          subscription_renews_at?: string | null
          total_purchased?: number
          total_used?: number
          updated_at?: string
        }
        Update: {
          available_credits?: number
          created_at?: string
          id?: number
          partner_id?: number
          subscription_monthly_credits?: number
          subscription_renews_at?: string | null
          total_purchased?: number
          total_used?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_credit_balances_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: true
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "partner_credit_balances_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: true
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_credit_balances_backup: {
        Row: {
          available_credits: number | null
          created_at: string | null
          id: number | null
          partner_id: number | null
          subscription_monthly_credits: number | null
          subscription_renews_at: string | null
          total_purchased: number | null
          total_used: number | null
          updated_at: string | null
        }
        Insert: {
          available_credits?: number | null
          created_at?: string | null
          id?: number | null
          partner_id?: number | null
          subscription_monthly_credits?: number | null
          subscription_renews_at?: string | null
          total_purchased?: number | null
          total_used?: number | null
          updated_at?: string | null
        }
        Update: {
          available_credits?: number | null
          created_at?: string | null
          id?: number | null
          partner_id?: number | null
          subscription_monthly_credits?: number | null
          subscription_renews_at?: string | null
          total_purchased?: number | null
          total_used?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partner_credit_packages: {
        Row: {
          created_at: string
          credits: number
          description: string | null
          id: number
          is_active: boolean
          name: string
          price_cents: number
          sort_order: number | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          credits: number
          description?: string | null
          id?: number
          is_active?: boolean
          name: string
          price_cents: number
          sort_order?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          credits?: number
          description?: string | null
          id?: number
          is_active?: boolean
          name?: string
          price_cents?: number
          sort_order?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      partner_credit_transactions: {
        Row: {
          balance_after: number
          campaign_id: number | null
          created_at: string
          credits_change: number
          description: string | null
          id: number
          lead_fetch_request_id: number | null
          metadata: Json | null
          partner_id: number
          related_record_id: string | null
          related_stripe_payment_id: number | null
          transaction_type: Database["public"]["Enums"]["credit_transaction_type"]
          usage_type: string | null
        }
        Insert: {
          balance_after: number
          campaign_id?: number | null
          created_at?: string
          credits_change: number
          description?: string | null
          id?: number
          lead_fetch_request_id?: number | null
          metadata?: Json | null
          partner_id: number
          related_record_id?: string | null
          related_stripe_payment_id?: number | null
          transaction_type: Database["public"]["Enums"]["credit_transaction_type"]
          usage_type?: string | null
        }
        Update: {
          balance_after?: number
          campaign_id?: number | null
          created_at?: string
          credits_change?: number
          description?: string | null
          id?: number
          lead_fetch_request_id?: number | null
          metadata?: Json | null
          partner_id?: number
          related_record_id?: string | null
          related_stripe_payment_id?: number | null
          transaction_type?: Database["public"]["Enums"]["credit_transaction_type"]
          usage_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_credit_transactions_lead_fetch_request_id_fkey"
            columns: ["lead_fetch_request_id"]
            isOneToOne: false
            referencedRelation: "lead_fetch_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_related_outreach_contact_id_fkey"
            columns: ["related_record_id"]
            isOneToOne: false
            referencedRelation: "outreach"
            referencedColumns: ["contact_id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_related_stripe_payment_id_fkey"
            columns: ["related_stripe_payment_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_transaction_details"
            referencedColumns: ["stripe_transaction_id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_related_stripe_payment_id_fkey"
            columns: ["related_stripe_payment_id"]
            isOneToOne: false
            referencedRelation: "partner_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_credit_transactions_backup: {
        Row: {
          balance_after: number | null
          campaign_id: number | null
          created_at: string | null
          credits_change: number | null
          description: string | null
          id: number | null
          lead_fetch_request_id: number | null
          metadata: Json | null
          partner_id: number | null
          related_record_id: string | null
          related_stripe_payment_id: number | null
          usage_type: string | null
        }
        Insert: {
          balance_after?: number | null
          campaign_id?: number | null
          created_at?: string | null
          credits_change?: number | null
          description?: string | null
          id?: number | null
          lead_fetch_request_id?: number | null
          metadata?: Json | null
          partner_id?: number | null
          related_record_id?: string | null
          related_stripe_payment_id?: number | null
          usage_type?: string | null
        }
        Update: {
          balance_after?: number | null
          campaign_id?: number | null
          created_at?: string | null
          credits_change?: number | null
          description?: string | null
          id?: number | null
          lead_fetch_request_id?: number | null
          metadata?: Json | null
          partner_id?: number | null
          related_record_id?: string | null
          related_stripe_payment_id?: number | null
          usage_type?: string | null
        }
        Relationships: []
      }
      partner_customer: {
        Row: {
          agency_id: number
          billing_cycle_day: number | null
          billing_email: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: number
          magic_link_action_url: string | null
          markup_percentage: number | null
          metadata: Json | null
          packageId: number | null
          partner_id: number
          price: number | null
          status: string | null
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          twilio_subaccount_sid: string | null
          updated_at: string | null
        }
        Insert: {
          agency_id: number
          billing_cycle_day?: number | null
          billing_email?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: number
          magic_link_action_url?: string | null
          markup_percentage?: number | null
          metadata?: Json | null
          packageId?: number | null
          partner_id: number
          price?: number | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          twilio_subaccount_sid?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: number
          billing_cycle_day?: number | null
          billing_email?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: number
          magic_link_action_url?: string | null
          markup_percentage?: number | null
          metadata?: Json | null
          packageId?: number | null
          partner_id?: number
          price?: number | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          twilio_subaccount_sid?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_agency"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "fk_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_customer_packageId_fkey"
            columns: ["packageId"]
            isOneToOne: false
            referencedRelation: "partner_credit_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_onboarding: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          last_updated_at: string | null
          partner_id: number
          setup_type: string
          started_at: string | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_updated_at?: string | null
          partner_id: number
          setup_type: string
          started_at?: string | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_updated_at?: string | null
          partner_id?: number
          setup_type?: string
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_onboarding_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "partner_onboarding_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_transactions: {
        Row: {
          agency_id: number
          amount: number
          created_at: string | null
          failure_reason: string | null
          id: number
          metadata: Json | null
          partner_customer_id: number
          partner_id: number
          payment_date: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          updated_at: string | null
        }
        Insert: {
          agency_id: number
          amount: number
          created_at?: string | null
          failure_reason?: string | null
          id?: number
          metadata?: Json | null
          partner_customer_id: number
          partner_id: number
          payment_date?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: number
          amount?: number
          created_at?: string | null
          failure_reason?: string | null
          id?: number
          metadata?: Json | null
          partner_customer_id?: number
          partner_id?: number
          payment_date?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_agency"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "fk_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner_customer"
            columns: ["partner_customer_id"]
            isOneToOne: false
            referencedRelation: "partner_customer"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          access_token: string | null
          active: boolean | null
          address: string | null
          agency_id: number | null
          business_context: string | null
          business_type: string | null
          business_value_guide: Json | null
          "business_value_guide-text": string | null
          city: string | null
          "claude-apiKey": string | null
          clientLastName: string | null
          clientName: string | null
          "commio-password": string | null
          "commio-username": string | null
          companyid: string | null
          contactId: string | null
          content_generation_completed_at: string | null
          content_generation_stage: number | null
          content_generation_started_at: string | null
          content_generation_status: string | null
          created_at: string | null
          dc_brandId: string | null
          dc_poolId: string | null
          dc_recordingId1: string | null
          dc_recordingId2: string | null
          dc_recordingId3: string | null
          dc_Secret: string | null
          dc_teamId: string | null
          "dc-onboardingDone": boolean | null
          ein: string | null
          email: string | null
          email_1: string | null
          email_2: string | null
          email_3: string | null
          has_leads_access: boolean | null
          has_outreach_access: boolean | null
          hl_calendar_onboard: string | null
          hl_calendar_sales: string | null
          hl_calender_cs: string | null
          humanIntheLoop: boolean | null
          id: number
          industry: string | null
          "instantly-apiKey": string | null
          "instantly-campaignId": string | null
          "instantly-subsequenceId": string | null
          job_title: string | null
          leads_plan: string | null
          llc_name: string | null
          locationid: string
          managed: boolean | null
          name: string | null
          onboarding_completed_at: string | null
          onboardingDone: boolean | null
          "openAI-apiKey": string | null
          opportunity_status:
            | Database["public"]["Enums"]["opportunity_status"]
            | null
          phone: string | null
          phoneNumbers: Json | null
          refresh_token: string | null
          reoonApiKey: string | null
          retell_agentId: string | null
          retell_apiKey: string | null
          "retell-LM-sms_message": string | null
          rvm_1: string | null
          rvm_2: string | null
          rvm_3: string | null
          sms_provider: string | null
          spintax1: string | null
          spintax2: string | null
          spintax3: string | null
          state: string | null
          text_ai_prompt: string | null
          timezone: string | null
          twilio_A2pProfileBundleSid: string | null
          twilio_auth: string | null
          twilio_credentialId: string | null
          twilio_CustomerProfileSid: string | null
          twilio_sid: string | null
          twilio_sipTrunk_id: string | null
          twilio_sipTrunk_originationId: string | null
          twilio_sipTrunk_password: string | null
          twilio_sipTrunk_user: string | null
          twilio_terminationUri: string | null
          "twilio-a2pStage": number | null
          "twilio-a2pStatus": string | null
          "twilio-messaging-serviceId": string | null
          updated_at: string | null
          userId: string | null
          voice_ai_prompt: string | null
          website: string | null
          zipCode: string | null
        }
        Insert: {
          access_token?: string | null
          active?: boolean | null
          address?: string | null
          agency_id?: number | null
          business_context?: string | null
          business_type?: string | null
          business_value_guide?: Json | null
          "business_value_guide-text"?: string | null
          city?: string | null
          "claude-apiKey"?: string | null
          clientLastName?: string | null
          clientName?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyid?: string | null
          contactId?: string | null
          content_generation_completed_at?: string | null
          content_generation_stage?: number | null
          content_generation_started_at?: string | null
          content_generation_status?: string | null
          created_at?: string | null
          dc_brandId?: string | null
          dc_poolId?: string | null
          dc_recordingId1?: string | null
          dc_recordingId2?: string | null
          dc_recordingId3?: string | null
          dc_Secret?: string | null
          dc_teamId?: string | null
          "dc-onboardingDone"?: boolean | null
          ein?: string | null
          email?: string | null
          email_1?: string | null
          email_2?: string | null
          email_3?: string | null
          has_leads_access?: boolean | null
          has_outreach_access?: boolean | null
          hl_calendar_onboard?: string | null
          hl_calendar_sales?: string | null
          hl_calender_cs?: string | null
          humanIntheLoop?: boolean | null
          id?: number
          industry?: string | null
          "instantly-apiKey"?: string | null
          "instantly-campaignId"?: string | null
          "instantly-subsequenceId"?: string | null
          job_title?: string | null
          leads_plan?: string | null
          llc_name?: string | null
          locationid: string
          managed?: boolean | null
          name?: string | null
          onboarding_completed_at?: string | null
          onboardingDone?: boolean | null
          "openAI-apiKey"?: string | null
          opportunity_status?:
            | Database["public"]["Enums"]["opportunity_status"]
            | null
          phone?: string | null
          phoneNumbers?: Json | null
          refresh_token?: string | null
          reoonApiKey?: string | null
          retell_agentId?: string | null
          retell_apiKey?: string | null
          "retell-LM-sms_message"?: string | null
          rvm_1?: string | null
          rvm_2?: string | null
          rvm_3?: string | null
          sms_provider?: string | null
          spintax1?: string | null
          spintax2?: string | null
          spintax3?: string | null
          state?: string | null
          text_ai_prompt?: string | null
          timezone?: string | null
          twilio_A2pProfileBundleSid?: string | null
          twilio_auth?: string | null
          twilio_credentialId?: string | null
          twilio_CustomerProfileSid?: string | null
          twilio_sid?: string | null
          twilio_sipTrunk_id?: string | null
          twilio_sipTrunk_originationId?: string | null
          twilio_sipTrunk_password?: string | null
          twilio_sipTrunk_user?: string | null
          twilio_terminationUri?: string | null
          "twilio-a2pStage"?: number | null
          "twilio-a2pStatus"?: string | null
          "twilio-messaging-serviceId"?: string | null
          updated_at?: string | null
          userId?: string | null
          voice_ai_prompt?: string | null
          website?: string | null
          zipCode?: string | null
        }
        Update: {
          access_token?: string | null
          active?: boolean | null
          address?: string | null
          agency_id?: number | null
          business_context?: string | null
          business_type?: string | null
          business_value_guide?: Json | null
          "business_value_guide-text"?: string | null
          city?: string | null
          "claude-apiKey"?: string | null
          clientLastName?: string | null
          clientName?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyid?: string | null
          contactId?: string | null
          content_generation_completed_at?: string | null
          content_generation_stage?: number | null
          content_generation_started_at?: string | null
          content_generation_status?: string | null
          created_at?: string | null
          dc_brandId?: string | null
          dc_poolId?: string | null
          dc_recordingId1?: string | null
          dc_recordingId2?: string | null
          dc_recordingId3?: string | null
          dc_Secret?: string | null
          dc_teamId?: string | null
          "dc-onboardingDone"?: boolean | null
          ein?: string | null
          email?: string | null
          email_1?: string | null
          email_2?: string | null
          email_3?: string | null
          has_leads_access?: boolean | null
          has_outreach_access?: boolean | null
          hl_calendar_onboard?: string | null
          hl_calendar_sales?: string | null
          hl_calender_cs?: string | null
          humanIntheLoop?: boolean | null
          id?: number
          industry?: string | null
          "instantly-apiKey"?: string | null
          "instantly-campaignId"?: string | null
          "instantly-subsequenceId"?: string | null
          job_title?: string | null
          leads_plan?: string | null
          llc_name?: string | null
          locationid?: string
          managed?: boolean | null
          name?: string | null
          onboarding_completed_at?: string | null
          onboardingDone?: boolean | null
          "openAI-apiKey"?: string | null
          opportunity_status?:
            | Database["public"]["Enums"]["opportunity_status"]
            | null
          phone?: string | null
          phoneNumbers?: Json | null
          refresh_token?: string | null
          reoonApiKey?: string | null
          retell_agentId?: string | null
          retell_apiKey?: string | null
          "retell-LM-sms_message"?: string | null
          rvm_1?: string | null
          rvm_2?: string | null
          rvm_3?: string | null
          sms_provider?: string | null
          spintax1?: string | null
          spintax2?: string | null
          spintax3?: string | null
          state?: string | null
          text_ai_prompt?: string | null
          timezone?: string | null
          twilio_A2pProfileBundleSid?: string | null
          twilio_auth?: string | null
          twilio_credentialId?: string | null
          twilio_CustomerProfileSid?: string | null
          twilio_sid?: string | null
          twilio_sipTrunk_id?: string | null
          twilio_sipTrunk_originationId?: string | null
          twilio_sipTrunk_password?: string | null
          twilio_sipTrunk_user?: string | null
          twilio_terminationUri?: string | null
          "twilio-a2pStage"?: number | null
          "twilio-a2pStatus"?: string | null
          "twilio-messaging-serviceId"?: string | null
          updated_at?: string | null
          userId?: string | null
          voice_ai_prompt?: string | null
          website?: string | null
          zipCode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_sms: {
        Row: {
          ai_reply: string
          assignedNumber: string | null
          companyName: string | null
          contactId: string | null
          contactName: string | null
          conversation_id: string
          created_at: string | null
          id: string
          lead_message: string
          location_id: string
          partnerId: number | null
          read: boolean | null
          sent_at: string | null
          status: string | null
          tokens: number | null
          updated_at: string | null
        }
        Insert: {
          ai_reply: string
          assignedNumber?: string | null
          companyName?: string | null
          contactId?: string | null
          contactName?: string | null
          conversation_id: string
          created_at?: string | null
          id?: string
          lead_message: string
          location_id: string
          partnerId?: number | null
          read?: boolean | null
          sent_at?: string | null
          status?: string | null
          tokens?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_reply?: string
          assignedNumber?: string | null
          companyName?: string | null
          contactId?: string | null
          contactName?: string | null
          conversation_id?: string
          created_at?: string | null
          id?: string
          lead_message?: string
          location_id?: string
          partnerId?: number | null
          read?: boolean | null
          sent_at?: string | null
          status?: string | null
          tokens?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_sms_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "pending_sms_partnerId_fkey"
            columns: ["partnerId"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      report_items: {
        Row: {
          alt_contacts: Json | null
          company_id: string | null
          company_name: string
          company_overview: string
          company_website: string | null
          created_at: string | null
          employees: string
          est_annual_revenue: string | null
          executive_email: string | null
          executive_name: string | null
          executive_office_phone: string | null
          executive_phone: string | null
          executive_role: string | null
          growth_rate: string | null
          id: string
          industry: string
          linkedin: string | null
          location: string
          market_position: string | null
          order_index: number
          potential_deal_value: string | null
          profile_id: string | null
          updated_at: string | null
          why_perfect_fit: string | null
        }
        Insert: {
          alt_contacts?: Json | null
          company_id?: string | null
          company_name: string
          company_overview: string
          company_website?: string | null
          created_at?: string | null
          employees: string
          est_annual_revenue?: string | null
          executive_email?: string | null
          executive_name?: string | null
          executive_office_phone?: string | null
          executive_phone?: string | null
          executive_role?: string | null
          growth_rate?: string | null
          id?: string
          industry: string
          linkedin?: string | null
          location: string
          market_position?: string | null
          order_index: number
          potential_deal_value?: string | null
          profile_id?: string | null
          updated_at?: string | null
          why_perfect_fit?: string | null
        }
        Update: {
          alt_contacts?: Json | null
          company_id?: string | null
          company_name?: string
          company_overview?: string
          company_website?: string | null
          created_at?: string | null
          employees?: string
          est_annual_revenue?: string | null
          executive_email?: string | null
          executive_name?: string | null
          executive_office_phone?: string | null
          executive_phone?: string | null
          executive_role?: string | null
          growth_rate?: string | null
          id?: string
          industry?: string
          linkedin?: string | null
          location?: string
          market_position?: string | null
          order_index?: number
          potential_deal_value?: string | null
          profile_id?: string | null
          updated_at?: string | null
          why_perfect_fit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_items_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "comp_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      report_items_rejected: {
        Row: {
          alt_contacts: Json | null
          companies_ids: Json | null
          company_name: string
          company_overview: string
          company_website: string | null
          created_at: string | null
          employees: string
          est_annual_revenue: string | null
          executive_email: string | null
          executive_name: string | null
          executive_office_phone: string | null
          executive_phone: string | null
          executive_role: string | null
          growth_rate: string | null
          id: string
          industry: string
          location: string
          market_position: string | null
          potential_deal_value: string | null
          updated_at: string | null
        }
        Insert: {
          alt_contacts?: Json | null
          companies_ids?: Json | null
          company_name: string
          company_overview: string
          company_website?: string | null
          created_at?: string | null
          employees: string
          est_annual_revenue?: string | null
          executive_email?: string | null
          executive_name?: string | null
          executive_office_phone?: string | null
          executive_phone?: string | null
          executive_role?: string | null
          growth_rate?: string | null
          id?: string
          industry: string
          location: string
          market_position?: string | null
          potential_deal_value?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_contacts?: Json | null
          companies_ids?: Json | null
          company_name?: string
          company_overview?: string
          company_website?: string | null
          created_at?: string | null
          employees?: string
          est_annual_revenue?: string | null
          executive_email?: string | null
          executive_name?: string | null
          executive_office_phone?: string | null
          executive_phone?: string | null
          executive_role?: string | null
          growth_rate?: string | null
          id?: string
          industry?: string
          location?: string
          market_position?: string | null
          potential_deal_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      submission_documents: {
        Row: {
          acquisition_opportunites_id: number | null
          document_type_id: string | null
          id: string
          storage_path: string
          uploaded_at: string | null
        }
        Insert: {
          acquisition_opportunites_id?: number | null
          document_type_id?: string | null
          id?: string
          storage_path: string
          uploaded_at?: string | null
        }
        Update: {
          acquisition_opportunites_id?: number | null
          document_type_id?: string | null
          id?: string
          storage_path?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submission_documents_acquisition_opportunites_id_fkey"
            columns: ["acquisition_opportunites_id"]
            isOneToOne: false
            referencedRelation: "acquisition_opportunites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "valuation_docs"
            referencedColumns: ["id"]
          },
        ]
      }
      unenriched_leads: {
        Row: {
          city: string | null
          company_annual_revenue: string | null
          company_annual_revenue_clean: string | null
          company_city: string | null
          company_country: string | null
          company_description: string | null
          company_domain: string | null
          company_founded_year: number | null
          company_full_address: string | null
          company_linkedin: string | null
          company_linkedin_uid: string | null
          company_name: string | null
          company_phone: string | null
          company_postal_code: string | null
          company_size: string | null
          company_state: string | null
          company_street_address: string | null
          company_technologies: string | null
          company_total_funding: string | null
          company_total_funding_clean: string | null
          company_website: string | null
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          functional_level: string | null
          headline: string | null
          id: string
          industry: string | null
          job_title: string | null
          keywords: string | null
          last_name: string | null
          linkedin: string | null
          personal_email: string | null
          seniority_level: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          company_annual_revenue?: string | null
          company_annual_revenue_clean?: string | null
          company_city?: string | null
          company_country?: string | null
          company_description?: string | null
          company_domain?: string | null
          company_founded_year?: number | null
          company_full_address?: string | null
          company_linkedin?: string | null
          company_linkedin_uid?: string | null
          company_name?: string | null
          company_phone?: string | null
          company_postal_code?: string | null
          company_size?: string | null
          company_state?: string | null
          company_street_address?: string | null
          company_technologies?: string | null
          company_total_funding?: string | null
          company_total_funding_clean?: string | null
          company_website?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          functional_level?: string | null
          headline?: string | null
          id?: string
          industry?: string | null
          job_title?: string | null
          keywords?: string | null
          last_name?: string | null
          linkedin?: string | null
          personal_email?: string | null
          seniority_level?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          company_annual_revenue?: string | null
          company_annual_revenue_clean?: string | null
          company_city?: string | null
          company_country?: string | null
          company_description?: string | null
          company_domain?: string | null
          company_founded_year?: number | null
          company_full_address?: string | null
          company_linkedin?: string | null
          company_linkedin_uid?: string | null
          company_name?: string | null
          company_phone?: string | null
          company_postal_code?: string | null
          company_size?: string | null
          company_state?: string | null
          company_street_address?: string | null
          company_technologies?: string | null
          company_total_funding?: string | null
          company_total_funding_clean?: string | null
          company_website?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          functional_level?: string | null
          headline?: string | null
          id?: string
          industry?: string | null
          job_title?: string | null
          keywords?: string | null
          last_name?: string | null
          linkedin?: string | null
          personal_email?: string | null
          seniority_level?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          created_at: string
          device_name: string | null
          device_token: string
          id: string
          is_active: boolean
          last_used_at: string
          platform: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_name?: string | null
          device_token: string
          id?: string
          is_active?: boolean
          last_used_at?: string
          platform: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_name?: string | null
          device_token?: string
          id?: string
          is_active?: boolean
          last_used_at?: string
          platform?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_locations: {
        Row: {
          created_at: string | null
          id: string
          location_id: string
          partner_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id: string
          partner_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string
          partner_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_locations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "user_locations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          agency_id: number | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          agency_id?: number | null
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          agency_id?: number | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          agency_id: number | null
          created_at: string | null
          email: string | null
          full_name: string | null
          hl_userId: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          agency_id?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          hl_userId?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          agency_id?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          hl_userId?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
        ]
      }
      valuation_docs: {
        Row: {
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      valuation_industries: {
        Row: {
          ebitda_multiple_high: number
          ebitda_multiple_low: number
          id: string
          industry_name: string
          major_factors: Json | null
          note: string | null
          revenue_multiple_high: number
          revenue_multiple_low: number
        }
        Insert: {
          ebitda_multiple_high: number
          ebitda_multiple_low: number
          id?: string
          industry_name: string
          major_factors?: Json | null
          note?: string | null
          revenue_multiple_high: number
          revenue_multiple_low: number
        }
        Update: {
          ebitda_multiple_high?: number
          ebitda_multiple_low?: number
          id?: string
          industry_name?: string
          major_factors?: Json | null
          note?: string | null
          revenue_multiple_high?: number
          revenue_multiple_low?: number
        }
        Relationships: []
      }
      vm_recording_tokens: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          partner_id: number
          phone_number: string | null
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          partner_id: number
          phone_number?: string | null
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          partner_id?: number
          phone_number?: string | null
          token?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recording_tokens_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "recording_tokens_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      voicemail_recordings: {
        Row: {
          created_at: string | null
          duration: number | null
          filename: string
          id: string
          partner_id: number
          script_number: number
          storage_path: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          filename: string
          id?: string
          partner_id: number
          script_number: number
          storage_path: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          filename?: string
          id?: string
          partner_id?: number
          script_number?: number
          storage_path?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voicemail_recordings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "voicemail_recordings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      campaign_analytics: {
        Row: {
          actual_lead_count: number | null
          campaign_id: number | null
          campaign_name: string | null
          claimed_leads_count: number | null
          completed_at: string | null
          created_at: string | null
          failed_leads: number | null
          last_lead_sent_at: string | null
          location_searched: string | null
          partner_id: number | null
          partner_name: string | null
          search_query: string | null
          source_file: string | null
          started_at: string | null
          status: string | null
          success_rate_percent: number | null
          successful_leads: number | null
          total_leads: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_campaigns_partnerId_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "lead_campaigns_partnerId_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_credit_summary: {
        Row: {
          available_credits: number | null
          partner_id: number | null
          partner_name: string | null
          status: string | null
          subscription_monthly_credits: number | null
          subscription_renews_at: string | null
          total_purchased: number | null
          total_used: number | null
        }
        Relationships: []
      }
      partner_credit_transaction_details: {
        Row: {
          balance_after: number | null
          business_name: string | null
          campaign_id: number | null
          created_at: string | null
          credits_change: number | null
          description: string | null
          enrich_cost: number | null
          fetch_industry: string | null
          fetch_quantity: number | null
          fetch_status: string | null
          fetch_total_credits_used: number | null
          first_name: string | null
          id: number | null
          last_name: string | null
          lead_claimed: boolean | null
          lead_company_name: string | null
          lead_enriched: boolean | null
          lead_fetch_request_id: number | null
          location_id: string | null
          opportunity_stage: string | null
          outreach_campaign_name: string | null
          partner_id: number | null
          partner_name: string | null
          payment_date: string | null
          payment_status: string | null
          related_record_id: string | null
          stripe_amount: number | null
          stripe_payment_intent_id: string | null
          stripe_transaction_id: number | null
          transaction_type:
            | Database["public"]["Enums"]["credit_transaction_type"]
            | null
          usage_type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_credit_transactions_lead_fetch_request_id_fkey"
            columns: ["lead_fetch_request_id"]
            isOneToOne: false
            referencedRelation: "lead_fetch_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_credit_summary"
            referencedColumns: ["partner_id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_credit_transactions_related_outreach_contact_id_fkey"
            columns: ["related_record_id"]
            isOneToOne: false
            referencedRelation: "outreach"
            referencedColumns: ["contact_id"]
          },
        ]
      }
    }
    Functions: {
      add_subscription_credits: {
        Args: { p_partner_id: number }
        Returns: boolean
      }
      admin_grant_credits: {
        Args: { p_credits: number; p_partner_id: number; p_reason?: string }
        Returns: Json
      }
      can_access_partner: {
        Args: { partner_locationid: string }
        Returns: boolean
      }
      check_onboarding_status_by_email: {
        Args: { email_address: string }
        Returns: Json
      }
      consume_credits:
        | {
            Args: {
              p_credits_needed: number
              p_description?: string
              p_outreach_contact_id: string
              p_partner_id: number
            }
            Returns: boolean
          }
        | {
            Args: {
              p_campaign_id?: number
              p_credits_needed: number
              p_description?: string
              p_lead_fetch_request_id?: number
              p_partner_id: number
              p_related_record_id?: string
              p_usage_type: string
            }
            Returns: {
              new_balance: number
              success: boolean
              transaction_id: number
            }[]
          }
      create_partner_account: {
        Args: {
          initial_status?: Database["public"]["Enums"]["opportunity_status"]
          partner_companyid: string
          partner_locationid: string
          partner_name: string
        }
        Returns: {
          companyid: string
          id: number
          locationid: string
          name: string
          opportunity_status: Database["public"]["Enums"]["opportunity_status"]
        }[]
      }
      create_secure_session: { Args: { company_slug: string }; Returns: string }
      create_voicemail_recording_from_token: {
        Args: {
          p_duration: number
          p_filename: string
          p_script_number: number
          p_storage_path: string
          p_token: string
        }
        Returns: string
      }
      get_accessible_agencies: {
        Args: never
        Returns: {
          companyId: string
          companyName: string
          email: string
          firstName: string
          id: number
          lastName: string
          managed: boolean
          partner_count: number
          phone: string
        }[]
      }
      get_agency_by_company_id: {
        Args: { company_id_param: string }
        Returns: {
          companyId: string
          created_at: string
          id: number
        }[]
      }
      get_agency_by_key: {
        Args: { agency_key: string }
        Returns: {
          companyId: string
          created_at: string
          id: number
        }[]
      }
      get_industry_counts: {
        Args: never
        Returns: {
          count: number
          industry: string
        }[]
      }
      get_or_create_campaign:
        | {
            Args: {
              p_campaign_id: string
              p_partner_id: number
              p_total_leads: number
            }
            Returns: number
          }
        | {
            Args: {
              campaign_name_param?: string
              location_param?: string
              partner_id_param: number
              search_query_param?: string
              source_file_param?: string
            }
            Returns: number
          }
      get_outreach_cost_totals: {
        Args: never
        Returns: {
          total_call_cost: number
          total_email_api_cost: number
          total_email_cost: number
          total_lead_cost: number
          total_rvm_cost: number
          total_sms_cost: number
          total_text_api_cost: number
          total_voice_api_cost: number
        }[]
      }
      get_partner_audit_history: {
        Args: { p_limit?: number; p_partner_id: number }
        Returns: {
          changed_at: string
          changed_by_email: string
          changed_by_name: string
          field_name: string
          id: string
          new_value: string
          old_value: string
        }[]
      }
      get_partner_last_billing: {
        Args: { p_partner_id: number }
        Returns: {
          amount: number
          description: string
          transaction_date: string
        }[]
      }
      get_partner_last_campaign: {
        Args: { p_partner_id: number }
        Returns: {
          campaign_date: string
          campaign_name: string
        }[]
      }
      get_partner_users: {
        Args: { p_partner_id: number }
        Returns: {
          email: string
          full_name: string
          user_id: string
        }[]
      }
      get_partners_by_access_level: {
        Args: { agency_filter_id?: number }
        Returns: {
          agency_name: string
          companyid: string
          ein: string
          id: number
          locationid: string
          name: string
          onboarding_completed_at: string
          opportunity_status: Database["public"]["Enums"]["opportunity_status"]
          user_count: number
        }[]
      }
      get_source_counts: {
        Args: never
        Returns: {
          count: number
          source: string
        }[]
      }
      get_tables_daily: { Args: never; Returns: undefined }
      get_team_members: {
        Args: { p_location_id?: string; p_partner_id?: number }
        Returns: {
          email: string
          full_name: string
          location_ids: string[]
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }[]
      }
      get_user_agency_id: { Args: never; Returns: number }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_voicemail_status_by_token: {
        Args: { p_token: string }
        Returns: {
          pid: number
          rec1_duration: number
          rec1_id: string
          rec2_duration: number
          rec2_id: string
          rec3_duration: number
          rec3_id: string
          rvm_1: string
          rvm_2: string
          rvm_3: string
        }[]
      }
      grant_credits: {
        Args: {
          p_credits: number
          p_description?: string
          p_partner_id: number
          p_stripe_payment_id?: number
          p_transaction_type: Database["public"]["Enums"]["credit_transaction_type"]
        }
        Returns: number
      }
      handle_user_signup_with_location: {
        Args: {
          full_name_param: string
          location_id_param: string
          user_id_param: string
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      initialize_partner_credits: {
        Args: { p_initial_credits?: number; p_partner_id: number }
        Returns: number
      }
      is_admin: { Args: never; Returns: boolean }
      is_agencyadmin: { Args: never; Returns: boolean }
      is_superadmin: { Args: never; Returns: boolean }
      reset_subscription_credits: {
        Args: { p_partner_id: number }
        Returns: boolean
      }
      set_agency_context: {
        Args: { agency_key: string; loc_id: string }
        Returns: undefined
      }
      set_location_context: { Args: { loc_id: string }; Returns: undefined }
      update_campaign_stats:
        | { Args: { campaign_id_param: number }; Returns: undefined }
        | {
            Args: {
              p_campaign_id: string
              p_failed_sends: number
              p_status: string
              p_successful_sends: number
            }
            Returns: undefined
          }
      update_partner_details: {
        Args: { p_partner_id: number; p_updates: Json }
        Returns: Json
      }
      update_voicemail_scripts: {
        Args: { p_partner_id: number; p_scripts: Json }
        Returns: Json
      }
      validate_agency_location: {
        Args: { agency_key: string; location_id: string }
        Returns: {
          agency_id: number
          partner_id: number
        }[]
      }
      validate_secure_session: { Args: { token: string }; Returns: string }
      verify_company_password: {
        Args: { company_slug: string; input_password: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "superadmin" | "admin" | "user" | "agencyadmin"
      credit_transaction_type:
        | "subscription_grant"
        | "subscription_renewal"
        | "addon_purchase"
        | "usage_outreach"
        | "usage_lead"
        | "refund"
        | "admin_adjustment"
      opportunity_status:
        | "subscription_paid"
        | "account_setup"
        | "value_guide_complete"
        | "onboarding_complete"
        | "a2p_rejected"
        | "a2p_approved"
        | "campaign_started"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["superadmin", "admin", "user", "agencyadmin"],
      credit_transaction_type: [
        "subscription_grant",
        "subscription_renewal",
        "addon_purchase",
        "usage_outreach",
        "usage_lead",
        "refund",
        "admin_adjustment",
      ],
      opportunity_status: [
        "subscription_paid",
        "account_setup",
        "value_guide_complete",
        "onboarding_complete",
        "a2p_rejected",
        "a2p_approved",
        "campaign_started",
      ],
    },
  },
} as const
