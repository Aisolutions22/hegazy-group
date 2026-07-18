-- Lock down RFQ submission reads: only service_role (which bypasses RLS) may
-- read customer PII. Restrictive policy AND-combines with any future permissive
-- SELECT policy, so a well-meaning addition can't accidentally expose the table.
CREATE POLICY "Deny client SELECT on rfq_submissions"
  ON public.rfq_submissions
  AS RESTRICTIVE
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Storage: two private buckets (product-images, brand-assets). Neither should
-- be reachable by anon or authenticated clients — uploads and reads flow
-- through server functions using service_role. Restrictive per-bucket policies
-- guarantee that even if a broad permissive policy is added later, these two
-- buckets stay locked to server-side access.
CREATE POLICY "Restrict product-images to server-side access"
  ON storage.objects
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (bucket_id <> 'product-images')
  WITH CHECK (bucket_id <> 'product-images');

CREATE POLICY "Restrict brand-assets to server-side access"
  ON storage.objects
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (bucket_id <> 'brand-assets')
  WITH CHECK (bucket_id <> 'brand-assets');