
-- Products catalog
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  form TEXT NOT NULL,
  alloy TEXT NOT NULL,
  temper TEXT NOT NULL,
  finish TEXT NOT NULL,
  availability TEXT NOT NULL DEFAULT 'on-request',
  image_url TEXT,
  description TEXT,
  standards TEXT[],
  price_on_request BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published products" ON public.products
  FOR SELECT TO anon, authenticated USING (published = true);

-- RFQ submissions
CREATE TABLE public.rfq_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  category TEXT,
  product TEXT,
  form TEXT,
  alloy TEXT,
  temper TEXT,
  finish TEXT,
  dimensions TEXT,
  quantity NUMERIC,
  unit TEXT,
  use_case TEXT,
  timeline TEXT,
  destination TEXT,
  contact_name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  locale TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Public anon may INSERT (submitting an RFQ) but not SELECT.
GRANT INSERT ON public.rfq_submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rfq_submissions TO authenticated;
GRANT ALL ON public.rfq_submissions TO service_role;
ALTER TABLE public.rfq_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an RFQ" ON public.rfq_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
-- No SELECT policy: submissions are readable only via service_role (server).

CREATE OR REPLACE FUNCTION public.tg_touch_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER products_touch_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.tg_touch_updated_at();
