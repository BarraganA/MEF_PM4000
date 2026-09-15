# Explora el círculo unitario — PM4000

Aplicación interactiva para el subtema de círculo unitario, coordenadas y ángulo de referencia.

## Ruta sugerida

`Modulo_2/circulo_unitario_referencia/`

## Modos

### 1. Explorar

El estudiante puede mover un punto sobre el círculo unitario y observar:

- ángulo θ en grados;
- ángulo en radianes;
- cuadrante;
- ángulo de referencia;
- coordenadas P(x,y);
- seno, coseno y tangente, bajo demanda.

El punto se mueve en pasos de 5°.

También existe la opción:

`Ajustar a ángulos notables`

que restringe el movimiento a:

0°, 30°, 45°, 60°, 90°, 120°, 135°, 150°, 180°, 210°, 225°, 240°, 270°, 300°, 315°, 330° y 360°.

Para esos ángulos se muestran coordenadas exactas.

### 2. Practicar

Se genera un ángulo no cuadrantal.

El estudiante debe identificar:

- cuadrante;
- ángulo de referencia;
- signo de seno;
- signo de coseno;
- signo de tangente.

La aplicación proporciona retroalimentación, pero no construye una tabla de resultados.

## Idea didáctica central

El círculo unitario permite pasar de un triángulo rectángulo a cualquier ángulo.

En un punto terminal P(x,y):

- cos θ = x
- sen θ = y
- tan θ = y/x, cuando x ≠ 0

El ángulo de referencia permite comparar magnitudes, mientras que el cuadrante determina los signos.

Los ángulos cuadrantales se identifican explícitamente como tales y no se les asigna un ángulo de referencia agudo.

## Idiomas

- Español por defecto
- English

## Archivos

- `index.html`
- `styles.css`
- `app.js`
- `README.md`

## URL esperada

`https://barragana.github.io/MEF_PM4000/Modulo_2/circulo_unitario_referencia/`

## Canvas

```html
<div style="margin: 24px 0; border: 1px solid #E8D8DF; border-radius: 12px; overflow: hidden; background-color: #FFFFFF;">
    <div style="padding: 15px 20px; background-color: #FFF6FA; border-bottom: 1px solid #E8D8DF;">
        <strong style="color: #3B091B; font-size: 17px;">
            Explora el círculo unitario
        </strong>
    </div>

    <iframe
        src="https://barragana.github.io/MEF_PM4000/Modulo_2/circulo_unitario_referencia/"
        width="100%"
        height="930"
        style="border: 0; display: block;"
        loading="lazy"
        title="Explora el círculo unitario">
    </iframe>
</div>
```
