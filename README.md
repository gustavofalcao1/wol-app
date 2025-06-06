# SysMaster - Hub de Gerenciamento para SysAdmins

SysMaster é uma plataforma moderna e flexível para gerenciamento de dispositivos em rede, com foco inicial em inventário e Wake-on-LAN, projetada para expansão com mais recursos de administração de sistemas.

## 🚀 Funcionalidades

### Gerenciamento de Dispositivos
- Inventário detalhado de dispositivos
- Wake-on-LAN individual e em grupo
- Monitoramento de status em tempo real
- Agrupamento hierárquico
- Filtros e busca avançada

### Grupos e Organização
- Estrutura hierárquica de grupos
- Gerenciamento de permissões por grupo
- Ações em massa
- Estatísticas e relatórios

### Interface Moderna
- Design responsivo
- Temas claro/escuro
- Dashboard interativo
- Componentes reutilizáveis

## 🛠 Tecnologias

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Estado**: React Query, Zod
- **Autenticação**: NextAuth.js
- **Estilização**: TailwindCSS + CSS Modules

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sysmaster-app.git

# Entre no diretório
cd sysmaster-app

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
yarn dev
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Autenticação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-aqui

# Database
DATABASE_URL=sua-url-aqui

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📚 Estrutura do Projeto

```
src/
├── core/              # Lógica de negócios
│   ├── devices/       # Gerenciamento de dispositivos
│   ├── groups/        # Gerenciamento de grupos
│   └── auth/          # Autenticação
├── ui/               # Interface do usuário
│   ├── components/    # Componentes React
│   ├── hooks/         # Hooks customizados
│   └── themes/        # Sistema de temas
└── services/         # Serviços externos
    ├── api/          # Cliente API
    └── wakeonlan/    # Serviço Wake-on-LAN
```

## 🔐 Segurança

- Autenticação JWT com refresh tokens
- Validação de entrada com Zod
- CSRF protection
- Rate limiting
- Logs de auditoria

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Roadmap

### Versão 1.0
- [x] Gerenciamento básico de dispositivos
- [x] Wake-on-LAN
- [x] Grupos simples
- [x] Autenticação básica

### Versão 1.1
- [ ] Monitoramento de recursos
- [ ] Notificações
- [ ] API pública
- [ ] Integração com Active Directory

### Versão 2.0
- [ ] Automação de tarefas
- [ ] Gerenciamento de patches
- [ ] Logs centralizados
- [ ] Dashboard customizável
