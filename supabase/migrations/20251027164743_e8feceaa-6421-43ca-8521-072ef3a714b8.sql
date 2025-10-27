-- Allow public insert to agency table for onboarding
CREATE POLICY "Allow public insert to agency"
ON public.agency
FOR INSERT
TO public
WITH CHECK (true);