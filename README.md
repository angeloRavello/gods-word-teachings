# Presentaciones

Presentaciones bíblicas en HTML para verlas en el navegador de una Smart TV Samsung. Se manejan solo con el control remoto: flechas y OK.

## Agregar una presentación

1. Copiar `_template/` a una carpeta nueva con el siguiente número: `00002-english-name`.
2. Escribir las diapositivas siguiendo `CLAUDE.md`. Cada lectura bíblica va en NTV y justo después en RVR1960.
3. Verificar cada versículo contra BibleGateway o una Biblia física. Después borrar los comentarios `VERIFICAR`.
4. Agregar la entrada en `index.html` (raíz).
5. Probar con el teclado en Chrome. Con `#12` al final de la URL se abre directo la diapositiva 12.
6. Publicar y probar en la TV.

## Controles

| Tecla | Acción |
| --- | --- |
| → | Mostrar el siguiente paso o la siguiente diapositiva |
| ← | Volver un paso |
| ↑ / ↓ | Mover el foco (portada, botón "Volver al inicio") |
| OK | Abrir el elemento enfocado o avanzar |

## Notas

- Las imágenes de las diapositivas usan `data-src` en lugar de `src`. Así solo se cargan la diapositiva actual y la siguiente, porque la TV tiene poca memoria.
- `tools/screen-info/` muestra la resolución real de la TV y el código de cada tecla del control.
