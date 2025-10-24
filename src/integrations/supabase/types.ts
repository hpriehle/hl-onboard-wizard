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
          "claude-apiKey": string | null
          "commio-password": string | null
          "commio-username": string | null
          companyId: string | null
          created_at: string
          customMenuLink: string | null
          "dc-recordingId1": string | null
          "dc-recordingId2": string | null
          "dc-recordingId3": string | null
          dropCowboy_poolId: string | null
          "dropCowboy-apiKey": string | null
          "dropCowboy-brandId": string | null
          "dropCowboy-teamId": string | null
          id: number
          "instantly-apiKey": string | null
          instantlyCampaignId: string | null
          key: string | null
          nameTitle: string | null
          "openAI-apiKey": string | null
          refresh_token: string | null
          reoonApiKey: string | null
          retell_apiKey: string | null
          retellAgentId: string | null
          sms_provider: string | null
          snapshotId: string | null
          twilio_auth: string | null
          twilio_primarySID: string | null
          twilio_sid: string | null
        }
        Insert: {
          access_token?: string | null
          "claude-apiKey"?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyId?: string | null
          created_at?: string
          customMenuLink?: string | null
          "dc-recordingId1"?: string | null
          "dc-recordingId2"?: string | null
          "dc-recordingId3"?: string | null
          dropCowboy_poolId?: string | null
          "dropCowboy-apiKey"?: string | null
          "dropCowboy-brandId"?: string | null
          "dropCowboy-teamId"?: string | null
          id?: number
          "instantly-apiKey"?: string | null
          instantlyCampaignId?: string | null
          key?: string | null
          nameTitle?: string | null
          "openAI-apiKey"?: string | null
          refresh_token?: string | null
          reoonApiKey?: string | null
          retell_apiKey?: string | null
          retellAgentId?: string | null
          sms_provider?: string | null
          snapshotId?: string | null
          twilio_auth?: string | null
          twilio_primarySID?: string | null
          twilio_sid?: string | null
        }
        Update: {
          access_token?: string | null
          "claude-apiKey"?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyId?: string | null
          created_at?: string
          customMenuLink?: string | null
          "dc-recordingId1"?: string | null
          "dc-recordingId2"?: string | null
          "dc-recordingId3"?: string | null
          dropCowboy_poolId?: string | null
          "dropCowboy-apiKey"?: string | null
          "dropCowboy-brandId"?: string | null
          "dropCowboy-teamId"?: string | null
          id?: number
          "instantly-apiKey"?: string | null
          instantlyCampaignId?: string | null
          key?: string | null
          nameTitle?: string | null
          "openAI-apiKey"?: string | null
          refresh_token?: string | null
          reoonApiKey?: string | null
          retell_apiKey?: string | null
          retellAgentId?: string | null
          sms_provider?: string | null
          snapshotId?: string | null
          twilio_auth?: string | null
          twilio_primarySID?: string | null
          twilio_sid?: string | null
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
      downloads: {
        Row: {
          company_id: string | null
          download_duration: number | null
          downloaded_at: string | null
          error_message: string | null
          id: string
          profile_id: string | null
          session_id: string | null
          success: boolean | null
        }
        Insert: {
          company_id?: string | null
          download_duration?: number | null
          downloaded_at?: string | null
          error_message?: string | null
          id?: string
          profile_id?: string | null
          session_id?: string | null
          success?: boolean | null
        }
        Update: {
          company_id?: string | null
          download_duration?: number | null
          downloaded_at?: string | null
          error_message?: string | null
          id?: string
          profile_id?: string | null
          session_id?: string | null
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "downloads_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "downloads_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "comp_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      ix_users_deprecated_backup: {
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
      lead_campaigns: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          failed_leads: number | null
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
          target_audience: Json | null
          target_criteria: Json | null
          total: number | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          failed_leads?: number | null
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
          target_audience?: Json | null
          target_criteria?: Json | null
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          failed_leads?: number | null
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
          target_audience?: Json | null
          target_criteria?: Json | null
          total?: number | null
          updated_at?: string | null
        }
        Relationships: [
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
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          access_token: string | null
          address: string | null
          business_context: string | null
          business_value_guide: string | null
          city: string | null
          "claude-apiKey": string | null
          clientName: string | null
          "commio-password": string | null
          "commio-username": string | null
          companyid: string | null
          contactId: string | null
          created_at: string | null
          dc_brandId: string | null
          dc_poolId: string | null
          dc_recordingId1: string | null
          dc_recordingId2: string | null
          dc_recordingId3: string | null
          dc_Secret: string | null
          dc_teamId: string | null
          "dc-onboardingDone": boolean | null
          email: string | null
          email_1: string | null
          email_2: string | null
          email_3: string | null
          hl_calendar_onboard: string | null
          hl_calendar_sales: string | null
          hl_calender_cs: string | null
          humanIntheLoop: boolean | null
          id: number
          "instantly-apiKey": string | null
          "instantly-campaignId": string | null
          locationid: string
          name: string | null
          onboardingDone: boolean | null
          "openAI-apiKey": string | null
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
          twilio_auth: string | null
          twilio_credentialId: string | null
          twilio_sid: string | null
          twilio_sipTrunk_id: string | null
          twilio_sipTrunk_originationId: string | null
          twilio_sipTrunk_password: string | null
          twilio_sipTrunk_user: string | null
          twilio_terminationUri: string | null
          "twilio-messaging-serviceId": string | null
          updated_at: string | null
          userId: string | null
          voice_ai_prompt: string | null
          website: string | null
          zipCode: string | null
        }
        Insert: {
          access_token?: string | null
          address?: string | null
          business_context?: string | null
          business_value_guide?: string | null
          city?: string | null
          "claude-apiKey"?: string | null
          clientName?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyid?: string | null
          contactId?: string | null
          created_at?: string | null
          dc_brandId?: string | null
          dc_poolId?: string | null
          dc_recordingId1?: string | null
          dc_recordingId2?: string | null
          dc_recordingId3?: string | null
          dc_Secret?: string | null
          dc_teamId?: string | null
          "dc-onboardingDone"?: boolean | null
          email?: string | null
          email_1?: string | null
          email_2?: string | null
          email_3?: string | null
          hl_calendar_onboard?: string | null
          hl_calendar_sales?: string | null
          hl_calender_cs?: string | null
          humanIntheLoop?: boolean | null
          id?: number
          "instantly-apiKey"?: string | null
          "instantly-campaignId"?: string | null
          locationid: string
          name?: string | null
          onboardingDone?: boolean | null
          "openAI-apiKey"?: string | null
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
          twilio_auth?: string | null
          twilio_credentialId?: string | null
          twilio_sid?: string | null
          twilio_sipTrunk_id?: string | null
          twilio_sipTrunk_originationId?: string | null
          twilio_sipTrunk_password?: string | null
          twilio_sipTrunk_user?: string | null
          twilio_terminationUri?: string | null
          "twilio-messaging-serviceId"?: string | null
          updated_at?: string | null
          userId?: string | null
          voice_ai_prompt?: string | null
          website?: string | null
          zipCode?: string | null
        }
        Update: {
          access_token?: string | null
          address?: string | null
          business_context?: string | null
          business_value_guide?: string | null
          city?: string | null
          "claude-apiKey"?: string | null
          clientName?: string | null
          "commio-password"?: string | null
          "commio-username"?: string | null
          companyid?: string | null
          contactId?: string | null
          created_at?: string | null
          dc_brandId?: string | null
          dc_poolId?: string | null
          dc_recordingId1?: string | null
          dc_recordingId2?: string | null
          dc_recordingId3?: string | null
          dc_Secret?: string | null
          dc_teamId?: string | null
          "dc-onboardingDone"?: boolean | null
          email?: string | null
          email_1?: string | null
          email_2?: string | null
          email_3?: string | null
          hl_calendar_onboard?: string | null
          hl_calendar_sales?: string | null
          hl_calender_cs?: string | null
          humanIntheLoop?: boolean | null
          id?: number
          "instantly-apiKey"?: string | null
          "instantly-campaignId"?: string | null
          locationid?: string
          name?: string | null
          onboardingDone?: boolean | null
          "openAI-apiKey"?: string | null
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
          twilio_auth?: string | null
          twilio_credentialId?: string | null
          twilio_sid?: string | null
          twilio_sipTrunk_id?: string | null
          twilio_sipTrunk_originationId?: string | null
          twilio_sipTrunk_password?: string | null
          twilio_sipTrunk_user?: string | null
          twilio_terminationUri?: string | null
          "twilio-messaging-serviceId"?: string | null
          updated_at?: string | null
          userId?: string | null
          voice_ai_prompt?: string | null
          website?: string | null
          zipCode?: string | null
        }
        Relationships: []
      }
      pending_sms: {
        Row: {
          ai_reply: string
          assignedNumber: string | null
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
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
          id: string
          updated_at: string | null
        }
        Insert: {
          agency_id?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          agency_id?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
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
      views: {
        Row: {
          company_id: string | null
          id: string
          page_load_time: number | null
          profile_id: string | null
          session_id: string | null
          time_on_page: number | null
          viewed_at: string | null
        }
        Insert: {
          company_id?: string | null
          id?: string
          page_load_time?: number | null
          profile_id?: string | null
          session_id?: string | null
          time_on_page?: number | null
          viewed_at?: string | null
        }
        Update: {
          company_id?: string | null
          id?: string
          page_load_time?: number | null
          profile_id?: string | null
          session_id?: string | null
          time_on_page?: number | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "views_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "comp_profile"
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
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_secure_session: { Args: { company_slug: string }; Returns: string }
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
      get_or_create_campaign: {
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
      get_source_counts: {
        Args: never
        Returns: {
          count: number
          source: string
        }[]
      }
      get_tables_daily: { Args: never; Returns: undefined }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
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
      is_admin: { Args: never; Returns: boolean }
      update_campaign_stats: {
        Args: { campaign_id_param: number }
        Returns: undefined
      }
      validate_secure_session: { Args: { token: string }; Returns: string }
      verify_company_password: {
        Args: { company_slug: string; input_password: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "superadmin" | "admin" | "user"
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
      app_role: ["superadmin", "admin", "user"],
    },
  },
} as const
