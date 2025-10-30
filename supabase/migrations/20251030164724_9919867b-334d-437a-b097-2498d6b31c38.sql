-- Allow anonymous users to read agency by key (for partner signup flow)
-- This policy has no time restriction since agencies can invite partners at any time
CREATE POLICY "Allow anonymous read agency by key"
ON public.agency
FOR SELECT
TO anon
USING (key IS NOT NULL);