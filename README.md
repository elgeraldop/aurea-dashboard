# AUREA Digital Office v2.0

> Dashboard operativo de AUREA Enterprises — 7 empresas, 1 sistema.

## 🚀 Quick Start

```bash
# 1. Clonar o descomprimir el proyecto
cd aurea-dashboard-v2

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus API keys

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir http://localhost:3000
```

## 📦 Estructura

```
src/
├── components/
│   ├── Layout/          # Topbar, Sidebar, Layout
│   ├── Dashboard/       # Home, Kanban, Calendar, KPIs, Countdown
│   ├── Empresa/         # Panel de empresa (tareas, KPIs, cuaderno, tips)
│   ├── Viaje/           # Misión Madrid (checklist + agenda)
│   └── Common/          # Toast, Search, Notes, Modal
├── context/
│   └── AppContext.jsx   # Estado global (React Context)
├── hooks/
│   ├── useStorage.js    # localStorage + export/import JSON
│   ├── usePomodoro.js   # Timer 25/5
│   ├── useConfetti.js   # Animaciones celebración
│   ├── useGeminiSpark.js # INTEGRACIÓN GEMINI SPARK
│   └── ...
├── data/
│   ├── empresas.json    # 7 empresas AUREA
│   ├── guias.json       # 20+ guías paso a paso
│   ├── viaje.json       # Checklist + agenda Madrid
│   └── ...
└── utils/
    ├── date.js          # Helpers de fecha
    └── format.js        # Formateo
```

## 🎨 Features

| Feature | Descripción |
|---------|-------------|
| **Dark Mode** | Toggle manual + detección sistema |
| **Pomodoro** | Timer 25/5 integrado en topbar |
| **Búsqueda** | Ctrl+K para buscar tareas globales |
| **Notas** | Notas rápidas laterales (Ctrl+Shift+N) |
| **Kanban** | 4 columnas: Pendiente, Urgente, En curso, Completada |
| **Calendario** | Vista mensual con tareas por fecha |
| **KPIs** | 4 KPIs innegociables editables |
| **Countdown** | Cuenta regresiva a Madrid 15 Dic 2026 |
| **Offline** | Indicador de conexión + sync automático |
| **Export/Import** | Backup JSON completo del estado |
| **PWA** | Instalable en móvil, funciona offline |
| **Gemini Spark** | Integración con Interactions API |

## 🔑 Gemini Spark Integration

El sistema incluye integración con **Gemini Spark** (Interactions API) via `@google/genai`:

```javascript
import { useGeminiSpark } from './hooks/useGeminiSpark.js'

function MiComponente() {
  const { interact, orchestrate, backgroundTask, isLoading } = useGeminiSpark()

  // Chat simple
  const respuesta = await interact("¿Qué debería priorizar hoy?")

  // Orquestación multi-agente
  const plan = await orchestrate(
    "Lanzar campaña MADY",
    ["Sales", "Operations", "Strategy"]
  )

  // Ejecución en background
  await backgroundTask("Analizar competencia Madrid")
}
```

### Configuración

1. Obtener API key en [Google AI Studio](https://aistudio.google.com/)
2. Agregar a `.env`:
   ```
   VITE_GEMINI_API_KEY=tu_api_key_aqui
   VITE_GEMINI_MODEL=gemini-3.5-flash
   ```

## 🌐 Deploy en Vercel

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

O conecta tu repo de GitHub a Vercel para deploy automático en cada push.

## 📝 Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `VITE_SUPABASE_URL` | URL de Supabase | No (fallback localStorage) |
| `VITE_SUPABASE_KEY` | Key anónima de Supabase | No |
| `VITE_GEMINI_API_KEY` | API key de Gemini | No (opcional) |
| `VITE_GEMINI_MODEL` | Modelo Gemini | No (default: gemini-3.5-flash) |

## 🏗️ Stack Tecnológico

- **React 19** + Vite 6
- **Tailwind CSS 3** + CSS Variables para theming
- **Framer Motion** para animaciones
- **React Router 7** para navegación
- **Lucide React** para iconos
- **Canvas Confetti** para celebraciones
- **Vite PWA** para Progressive Web App

## 📱 PWA

La app es instalable en móviles y desktops:
- Service Worker con caching
- Manifest.json con iconos
- Offline fallback
- Background sync para cambios

## 🎯 Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + K` | Abrir búsqueda global |
| `Ctrl/Cmd + S` | Guardar estado |
| `Ctrl/Cmd + Shift + N` | Toggle notas rápidas |
| `Esc` | Cerrar overlays |

## 📄 Licencia

Proyecto privado — AUREA Enterprises
