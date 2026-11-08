create extension if not exists pgcrypto;
create table if not exists public.solicitacoes (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
 nome text not null, whatsapp text not null, email text, servico text not null, municipio text not null,
 localizacao text, tipo_imovel text, area text, descricao text not null,
 status text not null default 'Recebida' check(status in ('Recebida','Em análise','Orçamento enviado','Aprovada','Recusada')),
 valor_orcamento numeric(12,2), documentos jsonb not null default '[]'::jsonb
);
alter table public.solicitacoes enable row level security;
create policy "Publico envia solicitacao" on public.solicitacoes for insert to anon with check (
 length(trim(nome)) between 2 and 120 and length(trim(whatsapp)) between 8 and 30
 and length(trim(servico)) between 2 and 120 and length(trim(municipio)) between 2 and 100
 and length(trim(descricao)) between 2 and 3000
);
create policy "Admin consulta solicitacoes" on public.solicitacoes for select to authenticated using(true);
create policy "Admin atualiza solicitacoes" on public.solicitacoes for update to authenticated using(true) with check(true);
-- Crie no Storage um bucket PRIVADO chamado documentos-orcamento.
create policy "Publico envia documentos" on storage.objects for insert to anon with check(bucket_id='documentos-orcamento');
create policy "Admin le documentos" on storage.objects for select to authenticated using(bucket_id='documentos-orcamento');
-- Crie o usuário admin manualmente em Authentication > Users e desative signups públicos.
-- Nunca coloque a chave service_role no JavaScript do site.
