-- Ensure RLS is enabled and allow public onboarding inserts
ALTER TABLE public.agency ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'agency' AND policyname = 'Public can insert agency during onboarding'
  ) THEN
    CREATE POLICY "Public can insert agency during onboarding"
    ON public.agency
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
  END IF;
END $$;