# Diseño de rampas: inclinación y accesibilidad — PM4000

Aplicación interactiva para la Actividad Estratégica 1.

## Ruta sugerida

`Modulo_1/rampas_accesibilidad/`

## Modos

### Comparar
- Rampas A, B y C con inclinaciones de 5°, 10° y 15°.
- El ángulo no se muestra directamente.
- El estudiante mueve un transportador digital en pasos de 5°.
- Después de medir correctamente, clasifica el ángulo.
- La app muestra un resumen para comparar las tres rampas.

### Diseñar
- La altura se mantiene fija.
- El estudiante cambia el espacio horizontal disponible.
- La app utiliza configuraciones que producen inclinaciones múltiplo de 5°.
- El estudiante vuelve a medir la inclinación y puede registrar al menos tres casos.
- La aplicación no revela por sí sola el patrón ni un criterio normativo de accesibilidad.

### Plano técnico
- Se genera un ángulo expresado exactamente en radianes.
- El estudiante lo convierte a grados y lo clasifica.

## Idiomas
- Español por defecto.
- English disponible desde el selector superior.

## Archivos
- `index.html`
- `styles.css`
- `app.js`
- `README.md`

## URL esperada

`https://barragana.github.io/MEF_PM4000/Modulo_1/rampas_accesibilidad/`

## Código para Canvas

```html
<div style="margin: 24px 0; border: 1px solid #E8D8DF; border-radius: 12px; overflow: hidden; background-color: #FFFFFF;">
    <div style="padding: 15px 20px; background-color: #FFF6FA; border-bottom: 1px solid #E8D8DF;">
        <strong style="color: #3B091B; font-size: 17px;">
            Explora el diseño de una rampa
        </strong>
    </div>

    <iframe
        src="https://barragana.github.io/MEF_PM4000/Modulo_1/rampas_accesibilidad/"
        width="100%"
        height="900"
        style="border: 0; display: block;"
        loading="lazy"
        title="Diseño de rampas: inclinación y accesibilidad">
    </iframe>
</div>
```

## Nota didáctica

La aplicación proporciona evidencia geométrica, pero deliberadamente no etiqueta las rampas como accesibles, no accesibles, correctas o incorrectas según una norma. La comparación con criterios externos debe ocurrir después, en la actividad de Canvas.
