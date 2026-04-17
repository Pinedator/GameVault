# Aplicacion Web

## Descripcion del proyecto

Se trata de una aplicacion web fullstack de entretenimiento que permite a los usuarios  registrar los videojuegos que han jugado, organizarlos por estado (completado, en progreso, pendiente), puntuarlos

Los datos de videojuegos se obtienen de la API pública de RAWG (rawg.io), que ofrece información detallada sobre más de 500.000 juegos: portadas, géneros, plataformas, desarrolladores y puntuaciones de Metacritic. El backend en Express gestiona la colección del usuario y la lógica de recomendación con una arquitectura por capas limpia y documentada.

## Problemas que intenta resolver

Los jugadores consumen juegos en múltiples plataformas (Steam, PlayStation, Xbox, Nintendo Switch) y no tienen un lugar neutral y unificado donde llevar su historial personal. Las tiendas digitales muestran recomendaciones sesgadas por intereses comerciales, y el usuario no sabe por qué le sugieren algo.

## Usuarios objetivo
- Jugadores casuales y entusiastas de 16–35 años
- Personas que juegan en varias plataformas y quieren centralizar su colección
- Usuarios que quieren descubrir juegos nuevos basándose en sus géneros y desarrolladores favoritos
- Gente que acumula juegos en la biblioteca y no sabe por dónde empezar

## Funcionalidades principales

- **Búsqueda de videojuegos** en tiempo real usando la API de RAWG |
- **Añadir juego a la colección** con estado (Completado / En progreso / Pendiente) y puntuaci(1–10) |
- **Vista de colección personal** con filtros por estado, género y plataforma |
- **Detalle de juego**: portada, descripción, géneros, plataformas, desarrollador y Metacritic score |
- **Eliminar o actualizar** el estado y puntuación de un juego de la colección |
- **API REST propia** con Express, consumida desde el frontend con un cliente tipado en TypeScript |
- **Arquitectura por capas** en el backend: routes → controllers → services → repositories |

## Funcionalidades opcionales

- **Estadísticas del usuario**: géneros más jugados, plataforma favorita, juegos completados vs pendientes, puntuación media
- **Listas personalizadas**: más allá de los estados básicos, el usuario puede crear listas como "Para jugar con amigos" o "Joyas escondidas"
- **Exportar colección** a CSV o JSON
- **Modo oscuro** con estética gaming

## Posibles mejoras futuras
- Sistema de recomendaciones completo con explicación visible al usuario
- Sistema de autenticación para que cada usuario tenga su propia colección
- Importar biblioteca de Steam automáticamente via Steam API
- Soporte para DLCs y expansiones dentro de un mismo juego