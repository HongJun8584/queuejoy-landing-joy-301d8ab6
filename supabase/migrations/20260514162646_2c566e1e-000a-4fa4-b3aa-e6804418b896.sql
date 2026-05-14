-- Lock down sessions_map: only service role (edge functions) may access. Block anon/authenticated explicitly.
CREATE POLICY "Deny all access to sessions_map for anon"
  ON public.sessions_map
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);