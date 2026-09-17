# Biocenia

Biocenia es una aplicación web construida con React y Vite para explorar hábitats, consultar especies destacadas y planificar una visita desde una misma interfaz. El proyecto funciona como una SPA con navegación por rutas, catálogo filtrable, ficha de detalle, favoritos, reserva persistente y contenido multidioma.

## Vista general

La app está planteada como una experiencia informativa y funcional:

- inicio con resumen del estado actual de la visita
- catálogo de especies con búsqueda y filtros por hábitat
- fichas de detalle por especie con imagen o video
- página de visita con formulario validado y resumen de reserva
- persistencia en navegador para no perder selección, favoritos ni reserva
- soporte para varios idiomas

Además del contenido textual localizado, la aplicación mantiene estado compartido para que filtros, favoritos, idioma y reserva sigan siendo consistentes entre vistas.

## Demo local

### Requisitos

- Node.js 20 o superior recomendado
- npm 10 o superior recomendado

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Vite levantará la aplicación en una URL local similar a `http://localhost:5173`.

Nota: la app arranca en local sin configuración adicional, pero parte del material visual depende de recursos externos. El catálogo base se sirve desde `public/api/species-catalog.json`, mientras que varias imágenes y videos se cargan desde Wikimedia, Pixabay o YouTube. Si trabajas sin conexión o con red restringida, la interfaz seguirá funcionando, aunque algunos medios pueden no mostrarse.

### Build de producción

```bash
npm run build
```

### Vista previa del build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Stack técnico

- React 19
- Vite 8
- React Router DOM 7
- Context API para estado global
- hooks personalizados para lógica reutilizable
- `memo`, `useMemo` y `useDeferredValue` para reducir trabajo innecesario en render
- CSS global en `src/index.css` con estilos específicos adicionales para la navegación
- Lucide React para iconografía

## Cumplimiento de requisitos

El proyecto cubre los requisitos principales de la entrega:

- web responsive con ajustes específicos para escritorio, tablet y móvil
- arquitectura separada por páginas, componentes, contexto, hooks y datos
- al menos 3 rutas funcionales con `react-router-dom`: inicio, especies y visita
- varios estados con uso real: búsqueda, favoritos, idioma, hábitat activo, reserva y estado del formulario
- uso de `useEffect` para cargar datos del catálogo desde un endpoint local
- consumo de API propia mediante `fetch` a `public/api/species-catalog.json`
- formulario útil de reserva con validación y persistencia local
- componentes reutilizables como `PageHero`, `InfoCard`, `EditorialVideo` y `SpeciesCard`
- custom hooks como `useSpeciesCatalog` y `usePrefersReducedMotion`
- uso de `useContext` encapsulado en hooks específicos de `src/context/useBiocenia.jsx`
- medidas para evitar renders innecesarios: contextos segmentados, valores memoizados, `memo` en componentes de presentación y `useDeferredValue` en la búsqueda

## Funcionalidades principales

### 1. Inicio editorial

La portada muestra el enfoque general del proyecto, un resumen rápido de la visita y una selección visual de hábitats. También incluye un bloque editorial de video para reforzar la parte divulgativa.

### 2. Catálogo de especies

La sección de especies permite:

- buscar por nombre, hábitat, región o estado
- filtrar por hábitat mediante selector y chips rápidos
- guardar especies como favoritas
- abrir una ficha individual por especie
- acceder a la fuente externa de referencia

### 3. Ficha de detalle

Cada especie cuenta con una vista propia donde se amplía la información y se muestra:

- video embebido o archivo de video cuando existe
- imagen principal como respaldo visual
- hábitat, estado de conservación y región
- enlace a la fuente original del contenido

Cuando el dispositivo o navegador indica preferencia por reducir movimiento, la reproducción automática se atenúa para evitar una experiencia más agresiva de lo necesario.

### 4. Planificación de visita

La página de visita incorpora un formulario con validaciones para:

- nombre de la persona responsable
- correo de contacto
- número de visitantes
- fecha sugerida
- intención o notas del recorrido

Al guardar, la app genera una referencia de reserva y actualiza un panel lateral con el resumen de la visita. La sección también incluye un mapa visual del parque para ubicar zonas temáticas y servicios.

### 5. Persistencia local

Se almacenan en `localStorage` los siguientes datos:

- idioma activo
- hábitat seleccionado
- favoritos
- reserva guardada

Esto permite mantener el contexto de uso aunque el usuario recargue la página.

### 6. Internacionalización

El contenido base de la interfaz está centralizado y traducido en varios idiomas:

- español
- inglés
- catalán
- gallego
- euskera
- francés

## Arquitectura del proyecto

```text
.
├── public/
│   └── api/
│       └── species-catalog.json
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

### Carpetas clave

- `src/pages/`: vistas principales como Inicio, Species, SpeciesDetail y Visit
- `src/components/`: piezas reutilizables de interfaz
- `src/context/`: contextos segmentados por responsabilidad y hooks de acceso al estado compartido
- `src/hooks/`: hooks personalizados como carga del catálogo o preferencias de movimiento
- `src/data/`: contenido localizado, catálogos base y helpers de transformación
- `public/api/`: catálogo estático servido como endpoint local

## Rutas disponibles

- `/` inicio
- `/species` catálogo de especies
- `/species/:speciesId` detalle de especie
- `/visit` planificación de visita
- `*` página 404

## Gestión de datos

El catálogo intenta cargarse desde `public/api/species-catalog.json` usando `fetch`. Si esa carga falla, la aplicación usa un catálogo local definido en `src/data/siteContent.jsx`. Esa estrategia evita que la sección de especies quede vacía ante errores de red o contenido.

Ese fallback cubre los datos estructurados del catálogo, pero no convierte la experiencia en completamente offline: algunas imágenes y videos siguen dependiendo de URLs externas.

Además del catálogo, el archivo de contenido centraliza:

- copys de la interfaz
- etiquetas de hábitats
- videos editoriales
- datos localizados de especies
- destacados informativos para la página de visita

## Estado global

El proveedor principal de Biocenia agrupa varios contextos y expone estado compartido para:

- idioma
- favoritos
- hábitat activo
- reserva
- copys localizados

La navegación, el footer, el catálogo y la página de visita consumen ese estado para mantener una experiencia consistente entre rutas.

## Accesibilidad y experiencia

El proyecto incluye varias decisiones útiles a nivel de UX:

- enlace de salto al contenido principal
- restauración manual del scroll entre rutas
- soporte para `prefers-reduced-motion`
- etiquetas y estados accesibles en formularios y botones
- diseño preparado para escritorio y móvil

## Scripts disponibles

```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## Despliegue

La aplicación usa `BrowserRouter`, así que en producción necesita servir siempre `index.html` para cualquier ruta interna que no apunte a un archivo real.

Esto es importante para páginas como:

- `/species`
- `/species/:speciesId`
- `/visit`

Si el hosting no aplica ese fallback, al recargar una URL profunda la app puede devolver un 404 del servidor aunque la ruta funcione bien dentro de React.

## Organización del contenido

El proyecto separa contenido, estado y presentación para que los cambios editoriales no obliguen a tocar la lógica de navegación.

- `public/api/species-catalog.json`: catálogo servido por `fetch` como endpoint local
- `src/data/siteContent.jsx`: copys localizados, etiquetas de hábitat, destacados de visita, videos editoriales y fallback del catálogo
- `src/context/BioceniaContext.jsx`: persistencia, normalización y exposición del estado compartido
- `src/context/useBiocenia.jsx`: hooks específicos para consumir cada contexto sin acoplar toda la app a un único objeto global

## Flujo de estado

El estado global se apoya en Context API, pero está dividido por responsabilidad para no mezclar toda la lógica en un solo punto de consumo.

- idioma: define el copy activo y se persiste entre sesiones
- hábitat activo: mantiene filtros y contexto de recorrido entre vistas
- favoritos: conserva especies marcadas desde el catálogo
- reserva: guarda los datos validados del formulario y su referencia

Ese estado se inicializa desde `localStorage`, se sanea antes de usarse y después se reutiliza en navegación, footer, catálogo, detalle y visita.

## Limitaciones conocidas

- la aplicación no ofrece soporte offline completo porque parte del media sigue llegando desde servicios externos
- el fallback local protege el catálogo ante errores de carga, pero no reemplaza imágenes o videos remotos
- el proyecto no incluye por ahora una suite de tests automatizados
- el despliegue requiere configurar correctamente el fallback de rutas por el uso de `BrowserRouter`

## Posibles usos académicos o de portfolio

Este proyecto sirve bien como práctica de frontend porque reúne en una sola aplicación:

- routing cliente con vistas reales
- estado global con Context API
- consumo de datos desde un endpoint local con fallback de datos
- formularios con validación
- persistencia en navegador
- internacionalización
- composición de componentes reutilizables

## Autoría

Proyecto Biocenia desarrollado como aplicación frontend con enfoque divulgativo y de planificación de visitas.


