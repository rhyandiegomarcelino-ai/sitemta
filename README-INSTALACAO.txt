MTA — SISTEMA DE ORÇAMENTOS

ARQUIVOS
orcamento.html = formulário público
contato-recebido.html = confirmação após envio (URL para conversão do Google Ads)
admin.html = painel privado
form.js / admin.js = funcionamento
mta.css = identidade visual azul-marinho e amarelo
config.example.js = modelo de configuração
supabase_setup.sql = estrutura e políticas do banco

CONFIGURAÇÃO
1. Crie um projeto em https://supabase.com.
2. No SQL Editor, execute o conteúdo de supabase_setup.sql.
3. Em Storage, crie bucket chamado documentos-orcamento e deixe PRIVATE.
4. Em Project Settings > API, copie Project URL e chave publicável/anon.
5. Copie config.example.js para config.js e preencha os dois valores.
6. Envie os arquivos para a raiz do repositório GitHub Pages.
7. Em Authentication > Users, crie manualmente seu usuário administrador.
8. Desative cadastro público de usuários. O painel exige esse login.
9. Teste o formulário e o painel antes de divulgar.

SEGURANÇA
- Nunca use a chave service_role no navegador.
- O bucket é privado; o painel gera links temporários para documentos.
- A política permite upload público no bucket; monitore uso e adicione proteção anti-spam
  antes de campanhas com volume alto.
- A primeira versão não envia e-mail automático; os pedidos aparecem no painel.
- Publique uma política de privacidade adequada e revise o tratamento conforme LGPD.
- A URL contato-recebido.html só deve ser usada como conversão depois de testar o envio real.

Para integrar com precisão à página inicial existente, envie o repositório GitHub ou os arquivos atuais.
