-- Drop the old policy with 15 minute window
DROP POLICY IF EXISTS "Anon can select recent agencies for onboarding" ON public.agency;

-- Create new policy with 1 hour window for onboarding flow
CREATE POLICY "Anon can select recent agencies for onboarding"
ON public.agency
FOR SELECT
TO anon
USING (created_at > now() - interval '1 hour');