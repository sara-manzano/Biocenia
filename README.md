# Biocenia

Biocenia es una aplicación hecha con React y Vite para explorar hábitats, consultar especies y organizar una visita de una forma bastante directa. La idea al hacerla era que no se quedara en una web de solo texto o solo diseño, sino que tuviera varias vistas, filtros, estado global y un formulario que realmente sirviera para algo dentro de la propia app.

También intenté que por dentro fuese fácil de seguir. Por eso está dividido por páginas, componentes, hooks, contexto y datos, para que cada parte tenga una función clara y no quede todo mezclado.

## Qué incluye

La aplicación tiene una página de inicio con un resumen general, un catálogo de especies con búsqueda, filtro por hábitat y favoritos, una vista de detalle por especie y una página de visita con formulario de reserva y panel de resumen. Todo está planteado para funcionar bien en escritorio, tablet y móvil, y además incluye soporte multidioma.

## Tecnologías usadas

Está construida con React y Vite, usando react-router-dom para la navegación, Context API para el estado global, custom hooks para aislar lógica reutilizable y CSS vanilla para los estilos.

## Requisitos que cubre

El proyecto está planteado para cumplir con una práctica centrada en React. Incluye varias páginas accesibles con react-router-dom, uso de estados locales y globales con sentido, una carga de datos con useEffect, consumo de una API propia en `/api/species-catalog.json`, un formulario funcional, componentes reutilizables, custom hooks, useContext y una estructura bastante clara por páginas, componentes, contexto, hooks y datos.

## Cómo arrancarlo

Para ponerlo en marcha en local:

Primero instala las dependencias:

```bash
npm install
```

Después puedes levantar el entorno de desarrollo:

```bash
npm run dev
```

Si quieres generar la versión de producción:

```bash
npm run build
```

Y para revisar el código con eslint:

```bash
npm run lint
```

## Estructura general

```text
src/
	components/   Componentes reutilizables
	context/      Estado global y hooks de contexto
	data/         Contenido base y helpers de localización
	hooks/        Custom hooks
	layouts/      Estructura compartida de la app
	pages/        Vistas principales
public/api/     API propia estática
```

## Notas

El catálogo se carga desde una API propia con `fetch`. Si esa petición falla, la aplicación tira de un fallback local para que la interfaz siga funcionando y no se quede vacía.

Además, el idioma, los favoritos, el hábitat seleccionado y la reserva se guardan en localStorage para que al recargar no se pierda todo lo que ya se había hecho.

