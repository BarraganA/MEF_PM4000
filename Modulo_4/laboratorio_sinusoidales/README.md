# Laboratorio de funciones sinusoidales · Módulo V

Aplicación HTML, CSS y JavaScript sin dependencias externas. Publicable directamente en GitHub Pages e integrable mediante iframe en Canvas.

## Archivos
- `index.html`: estructura y accesibilidad de la interfaz.
- `styles.css`: diseño adaptable a pantallas móviles y de escritorio.
- `app.js`: dibujo en Canvas, ejercicios, evaluación e idiomas.

## Modos
- **Explorar:** ajusta familia y parámetros a, b, h y d; muestra la curva básica opcionalmente.
- **Cinco puntos:** genera una función para construir un ciclo a partir de sus cinco puntos característicos. Puedes colocarlos haciendo clic o introduciendo x/π e y. La aplicación comprueba los cinco puntos sin revelar los cálculos.
- **Identificar función:** genera una gráfica para que propongas una expresión seno o coseno equivalente. Se comprueba la coincidencia de la curva completa.

## Navegación del plano
Los botones + y − modifican la escala. También puedes usar la rueda del ratón o arrastrar para desplazar el plano. **Restablecer vista** vuelve a x entre −2π y 2π, y entre −5 y 5, sin alterar la función ni tus respuestas.

## Idiomas
El botón ES/EN cambia tanto el encabezado del Módulo V como el texto de la interfaz y las respuestas de comprobación.

## Publicación
Sube juntos `index.html`, `styles.css` y `app.js` a una carpeta del repositorio. Activa Pages y utiliza la URL pública del `index.html`.

Ejemplo de integración en Canvas (ajusta la URL):

```html
<iframe src="https://USUARIO.github.io/REPOSITORIO/laboratorio_sinusoidales/" title="Laboratorio de funciones sinusoidales" width="100%" height="780" style="border:0;max-width:100%;" loading="lazy"></iframe>
```
