CREATE POLICY "Admin gerencia arquivos"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'arquivos' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'arquivos' AND public.has_role(auth.uid(), 'admin'));