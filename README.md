# Grunge Merch

## Consumo de transferencia

- El reproductor adjunta la URL del audio únicamente al pulsar Play. Las portadas son archivos WebP independientes; no se descarga el MP3 para leer etiquetas.
- Los archivos de `public/media/v1` tienen caché de navegador de un año. Para cambiar un archivo publicado, usa un nombre nuevo o una nueva carpeta de versión y actualiza sus referencias; no sobrescribas una URL inmutable.
- Las canciones se sirven completas a 128 kbps. Las imágenes grandes se redujeron a WebP, conservando transparencias.
- El proxy de imágenes solo acepta proveedores del catálogo, comprueba cada redirección, limita las respuestas a 5 MB y usa un tiempo máximo de 8 segundos.
- `pnpm check` comprueba TypeScript y las restricciones del proxy. `pnpm build` valida la compilación de producción.

Para comprobar el ahorro, compara Fast Data Transfer de **grunge** en Vercel durante períodos equivalentes. El consumo previo al despliegue sigue formando parte del total del período.

Interfaz web de una tienda de merch oficial de bandas de grunge y rock, creada con Next.js y Tailwind CSS.

## Descripción
Este proyecto es una plataforma moderna para la venta de productos oficiales de bandas icónicas del grunge y el rock alternativo. Permite a los usuarios explorar conciertos próximos, ver productos destacados y comprar merch exclusivo de sus artistas favoritos. La plataforma incluye un sistema avanzado de páginas de producto con detalles completos, galería de imágenes y selección de tallas.

## Características principales
- Hero section animado y visualmente atractivo, con banners y colores personalizados por banda.
- Slider de conciertos próximos, con información dinámica y enlaces a compra de entradas.
- Visualización de logos y banners reales de bandas populares.
- Sección de productos destacados y grilla de productos con filtros avanzados.
- Header y footer personalizados, con navegación central y logo gráfico.
- Adaptabilidad y responsividad para dispositivos móviles y escritorio.
- Integración visual de ticket providers (Teleticket, Ticketmaster, Ticketek, etc.).
- Estilos modernos y animaciones inspiradas en sitios oficiales de bandas.
- Sistema completo de páginas de producto con información detallada y galería de imágenes HD.
- API dual mejorada para obtención de datos detallados de productos.
- Manejo de tallas, variantes y disponibilidad en tiempo real.

## Tecnologías utilizadas
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

## Estructura del proyecto
- `/app` - Páginas principales y rutas (home, productos, etc.)
  - `/producto/[slug]` - Sistema de páginas de producto dinámicas
- `/components` - Componentes reutilizables (header, footer, hero-section, popular-bands, etc.)
- `/pages/api` - APIs para búsqueda y obtención de datos de productos
  - `/product/[slug].ts` - API original de productos
  - `/product-enhanced/[slug].ts` - API mejorada con información completa
- `/public` - Imágenes de bandas, logos y banners
- `/styles` - Archivos CSS globales y personalizados
- `/hooks` y `/lib` - Utilidades y hooks personalizados

## Cómo ejecutar el proyecto
1. Instala las dependencias:
   ```sh
   pnpm install
   # o npm install
   ```
2. Inicia el servidor de desarrollo:
   ```sh
   pnpm dev
   # o npm run dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Cómo probar las páginas de producto
1. Visita la página principal y haz clic en cualquier producto desde la sección de productos destacados o la grilla de productos.
2. Para probar directamente un producto específico, visita:
   - `http://localhost:3000/producto/eminem-slim-shady-lp-actual-tour-overrun-rare-find-t-shirt-374890`
   - `http://localhost:3000/producto/rolling-stones-keith-t-shirt-441788`
   - `http://localhost:3000/producto/halloween-stayin-alive-t-shirt-424445`

## Personalización
- Para agregar nuevas bandas, edita el array `upcomingConcerts` en `components/hero-section.tsx` y coloca los logos/banners en la carpeta `public`.
- Los colores, mensajes y ticket providers son configurables por concierto.

## Sistema de Páginas de Producto

### 🔄 **Sistema de Redirección Mejorado**
- **ProductCard** redirige a páginas internas `/producto/[slug]`
- Generación automática de slugs desde URLs de Rockabilia
- Experiencia de navegación fluida sin salir del sitio

### 📄 **Página de Producto Completa**
**Ubicación**: `/app/producto/[slug]/page.tsx`

**Características principales**:
- **Galería HD**: Múltiples imágenes en alta resolución con navegación por miniaturas
- **Información detallada**: Título, marca, precio, Product ID, disponibilidad
- **Selección de tallas**: Con disponibilidad en tiempo real por talla
- **Control de cantidad**: Selector numérico
- **Botones de acción**: Comprar, favoritos, compartir
- **Descripción completa**: Información detallada del producto
- **Tags y metadatos**: Categorías y etiquetas del producto
- **Estados visual**: Loading, error, disponibilidad

### 🚀 **API Dual Mejorada**

#### API Enhanced (Recomendada)
**Ubicación**: `/pages/api/product-enhanced/[slug].ts`

**Métodos de obtención (en orden de prioridad)**:
1. **API de Findify**: Datos estructurados completos con variantes
2. **Web Scraping Avanzado**: Extracción directa desde Rockabilia con múltiples patrones
3. **API de Búsqueda**: Respaldo por términos de búsqueda

**Características técnicas**:
- Extracción de **múltiples imágenes HD** (hasta 8 imágenes en resolución 2048x2048)
- **Product ID** exacto desde la página
- **Tallas y variantes** con precios específicos
- **Descripciones completas** del producto
- **Manejo robusto de errores** con múltiples respaldos
- **Optimización de imágenes** automática a HD

#### API Original
**Ubicación**: `/pages/api/product/[slug].ts` (mantenida para compatibilidad)

### 🎯 **Datos Extraídos (Coincide con Rockabilia)**

```javascript
// Información principal
- Brand: "EMINEM"
- Title: "Slim Shady Lp (Actual Tour Overrun Rare Find) T-shirt"
- Price: "$9.99"
- Product ID: "374890-8"
- Availability: "MD In Stock"

// Imágenes en HD
- Imagen frontal en 2048x2048
- Imagen trasera en 2048x2048
- Imágenes adicionales si están disponibles

// Tallas y variantes
- Tallas: ["SM", "MD", "LG", "XL", "2X", "3X"]
- Precios por talla (si varían)
- Disponibilidad específica por talla

// Información adicional
- Descripción: "The Slim Shady Lp With Album Tracklisting"
- Tags: ["Apparel", "T-shirts", "Music", "Eminem"]
- SKU y códigos de producto
```

### 🎨 **Experiencia de Usuario**

**Flujo Completo**:
1. **Navegación**: Usuario ve productos en grid/featured/search
2. **Clic**: Hace clic en cualquier `ProductCard`
3. **Redirección**: Va a `/producto/[slug]` (navegación interna)
4. **Carga**: Loading state mientras se obtienen datos
5. **Visualización**: Página completa con galería de imágenes HD, información completa y selección de tallas
6. **Compra**: Botón redirige a Rockabilia con la talla seleccionada

### ⚡ **Performance y Optimizaciones**

- **Extracción de imágenes HD**: Conversión automática a resolución 2048x2048
- **Filtrado de duplicados** y URLs inválidas
- **Límite de 8 imágenes** por producto para performance
- **Caching** con Next.js automatic caching para APIs
- **Múltiples métodos de respaldo** para manejo de errores

## Estructura de Datos de Productos

```typescript
interface ProductDetail {
  id: string                    // ID único
  title: string                 // Título completo
  brand: string                 // Marca (ej: "EMINEM")
  price: number                 // Precio base
  images: string[]              // Array de imágenes HD
  description: string           // Descripción completa
  sizes: string[]               // Tallas disponibles
  variants: ProductVariant[]    // Variantes con precios específicos
  product_url: string           // URL de Rockabilia
  availability: boolean         // Disponibilidad general
  quantity: number              // Cantidad en stock
  product_id: string            // Product ID (ej: "374890-8")
  sku: string                   // SKU del producto
  tags: string[]                // Tags y categorías
  compare_at?: number           // Precio original (si hay descuento)
  discount?: number[]           // Porcentaje de descuento
}

interface ProductVariant {
  id: string                    // ID de la variante
  size: string                  // Talla específica
  price: number                 // Precio de esta variante
  availability: boolean         // Disponibilidad de esta talla
  product_url: string           // URL específica para esta variante
}
```

## Próximas Mejoras

1. **Caché Redis**: Para productos frecuentemente consultados
2. **Wishlist**: Sistema de favoritos persistente
3. **Comparador**: Comparar productos lado a lado
4. **Reviews**: Sistema de reseñas integrado
5. **Carrito completo**: Sistema de carrito de compras
6. **Recomendaciones**: ML para productos relacionados
7. **Analytics**: Tracking de navegación de productos

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
