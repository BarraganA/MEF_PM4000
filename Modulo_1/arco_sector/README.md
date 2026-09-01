# Longitud de arco y sector circular — PM4000

Aplicación interactiva para el tema de longitud de arco y área de sector circular.

## Ruta

`Modulo_1/arco_sector/`

## Funcionalidades

### Explorar
- Radio ajustable de 2 a 20.
- Ángulo ajustable de 5° en 5°.
- El lado terminal puede arrastrarse sobre la circunferencia.
- Visualización dinámica del sector y del arco.
- Conversión exacta entre grados y radianes.
- Longitud de arco exacta y aproximada.
- Área del sector exacta y aproximada.
- Visualización de la fracción de vuelta correspondiente.

### Longitud de arco
Trabaja con:

` s = rθ `

donde `θ` está expresado en radianes.

La app genera radio y ángulo, acepta:
- respuesta exacta como múltiplo racional de π;
- respuesta decimal con tolerancia de 0.02.

### Área del sector
Trabaja con:

` A = 1/2 r²θ `

donde `θ` está expresado en radianes.

También acepta respuestas exactas y decimales.

## Archivos

- `index.html`
- `styles.css`
- `app.js`
- `README.md`

## GitHub Pages

URL esperada:

`https://barragana.github.io/MEF_PM4000/Modulo_1/arco_sector/`

## Canvas

```html
<iframe
    src="https://barragana.github.io/MEF_PM4000/Modulo_1/arco_sector/"
    width="100%"
    height="920"
    style="border: 0;"
    loading="lazy"
    title="Longitud de arco y sector circular">
</iframe>
```

## Nota matemática

Las fórmulas

` s = rθ `

y

` A = 1/2 r²θ `

requieren que el ángulo `θ` esté expresado en **radianes**.

Si el problema presenta el ángulo en grados, la aplicación muestra la conversión correspondiente antes de aplicar la fórmula.
