
DROP POLICY IF EXISTS "Anyone can submit an RFQ" ON public.rfq_submissions;
CREATE POLICY "Anyone can submit an RFQ" ON public.rfq_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(contact_name) BETWEEN 1 AND 120
    AND length(company) BETWEEN 1 AND 160
    AND length(email) BETWEEN 5 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (use_case IS NULL OR length(use_case) <= 2000)
    AND (dimensions IS NULL OR length(dimensions) <= 1000)
    AND (phone IS NULL OR length(phone) <= 40)
    AND (country IS NULL OR length(country) <= 80)
    AND (role IS NULL OR length(role) <= 120)
    AND (quantity IS NULL OR (quantity > 0 AND quantity < 1e9))
    AND status = 'new'
  );
