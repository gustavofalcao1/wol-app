# SysMaster - Hub de Gerenciamento para SysAdmins

## Visão Geral
SysMaster é uma plataforma moderna para gerenciamento de dispositivos e grupos, inicialmente focada em funcionalidades de inventário e Wake-on-LAN, mas projetada para expansão futura com mais recursos de administração de sistemas.

## Arquitetura

### 1. Core (Núcleo Funcional)
```
/src/core/
├── devices/           # Lógica de gerenciamento de dispositivos
│   ├── types.ts      # Tipos e interfaces
│   ├── api.ts        # Chamadas de API
│   └── hooks.ts      # Hooks React Query
├── groups/           # Lógica de gerenciamento de grupos
│   ├── types.ts
│   ├── api.ts
│   └── hooks.ts
└── auth/             # Autenticação e autorização
    ├── types.ts
    ├── api.ts
    └── hooks.ts
```

### 2. Interface de Usuário
```
/src/ui/
├── components/       # Componentes reutilizáveis
│   ├── base/        # Componentes base (Button, Input, etc)
│   ├── devices/     # Componentes específicos de dispositivos
│   ├── groups/      # Componentes específicos de grupos
│   └── layout/      # Componentes de layout
├── hooks/           # Hooks personalizados
├── themes/          # Sistema de temas
│   ├── types.ts    # Tipos do tema
│   ├── default/    # Tema padrão (claro)
│   └── dark/       # Tema escuro
└── utils/           # Utilitários de UI
```

### 3. Páginas e Rotas
```
/src/app/
├── (auth)/          # Grupo de rotas autenticadas
│   ├── dashboard/
│   ├── devices/
│   ├── groups/
│   └── settings/
├── login/
└── register/
```

### 4. Serviços e API
```
/src/services/
├── api/             # Cliente API
├── wakeonlan/       # Serviço Wake-on-LAN
└── network/         # Serviços de rede
```

## Estrutura de Dados

### Device
```typescript
interface Device {
  id: string;
  name: string;
  macAddress: string;
  ipAddress: string;
  groupId?: string;
  status: 'online' | 'offline';
  lastSeen: string;
  type: 'workstation' | 'server' | 'other';
  metadata?: Record<string, any>;
}
```

### Group
```typescript
interface Group {
  id: string;
  name: string;
  description?: string;
  devices: string[];  // IDs dos dispositivos
  metadata?: Record<string, any>;
}
```

## Sistema de Temas
O sistema de temas será implementado usando CSS Modules e variáveis CSS, permitindo:
- Troca fácil entre temas
- Personalização por usuário
- Consistência visual
- Separação entre lógica e apresentação

```typescript
interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  breakpoints: ThemeBreakpoints;
}
```

## Módulos Iniciais

### 1. Gerenciamento de Dispositivos
- Listagem com filtros e busca
- Detalhes do dispositivo
- Status em tempo real
- Ações (Wake-on-LAN, ping)

### 2. Gerenciamento de Grupos
- Criação e edição
- Atribuição de dispositivos
- Ações em massa
- Visualização hierárquica

### 3. Dashboard
- Visão geral do sistema
- Estatísticas de dispositivos
- Status dos grupos
- Atividades recentes

## Tecnologias

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS (com sistema de temas)
- React Query (gerenciamento de estado)
- Zod (validação)

### Autenticação
- NextAuth.js
- JWT
- Roles e permissões

## Expansão Futura
O sistema está projetado para adicionar novos módulos como:
1. Monitoramento de recursos
2. Gerenciamento de patches
3. Logs centralizados
4. Automação de tarefas
5. Inventário de software

## Convenções de Código
- Nomes de arquivos em kebab-case
- Componentes em PascalCase
- Funções e variáveis em camelCase
- Tipos e interfaces com sufixo Type/Interface
- Documentação em inglês
- Commits semânticos
