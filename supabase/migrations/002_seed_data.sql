INSERT INTO public.categories (id, name, slug, description, image_url)
VALUES
('11111111-1111-1111-1111-111111111111', 'Crisps', 'crisps', 'Crunchy Malaysian snack drops', 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=900&auto=format&fit=crop'),
('22222222-2222-2222-2222-222222222222', 'Kuih', 'kuih', 'Premium kuih boxes', 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=900&auto=format&fit=crop'),
('33333333-3333-3333-3333-333333333333', 'Spicy', 'spicy', 'Sambal heat and chilli snacks', 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?q=80&w=900&auto=format&fit=crop'),
('44444444-4444-4444-4444-444444444444', 'Gift Sets', 'gift-sets', 'Gift-ready snack bundles', 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=900&auto=format&fit=crop')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (id, name, slug, description, price, compare_at_price, category_id, stock_quantity, is_available, is_featured, average_rating, review_count)
VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Sambal Crunch Cassava', 'sambal-crunch-cassava', 'Thin cassava chips finished with smoky sambal dust.', 14.90, 18.90, '11111111-1111-1111-1111-111111111111', 30, true, true, 4.8, 42),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Kopi Butter Muruku', 'kopi-butter-muruku', 'Classic muruku with a roasted kopi butter glaze.', 12.50, null, '11111111-1111-1111-1111-111111111111', 28, true, true, 4.7, 31),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Pandan Kuih Box', 'pandan-kuih-box', 'A chilled six-piece kuih box with pandan, coconut, and gula melaka.', 28.00, null, '22222222-2222-2222-2222-222222222222', 16, true, true, 4.9, 55),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Ghost Pepper Keropok', 'ghost-pepper-keropok', 'Airy fish crackers with a serious chilli kick.', 16.50, null, '33333333-3333-3333-3333-333333333333', 24, true, false, 4.7, 27)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_images (product_id, image_url, alt_text, is_primary, display_order)
VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=900&auto=format&fit=crop', 'Sambal Crunch Cassava', true, 0),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=900&auto=format&fit=crop', 'Kopi Butter Muruku', true, 0),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=900&auto=format&fit=crop', 'Pandan Kuih Box', true, 0),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?q=80&w=900&auto=format&fit=crop', 'Ghost Pepper Keropok', true, 0);

INSERT INTO public.coupons (code, description, discount_type, discount_value, minimum_order_amount, is_active)
VALUES
('FIRSTDROP', '15% off first order', 'percentage', 15, 30, true),
('RAYA10', 'RM10 off gift sets', 'fixed_amount', 10, 60, true)
ON CONFLICT (code) DO NOTHING;
