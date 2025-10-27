-- Allow anon to read newly created agencies briefly to receive the inserted id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='agency' AND policyname='Anon can select recent agencies for onboarding'
  ) THEN
    CREATE POLICY "Anon can select recent agencies for onboarding"
    ON public.agency
    FOR SELECT
    TO anon
    USING (created_at > now() - interval '15 minutes');
  END IF;
END $$;