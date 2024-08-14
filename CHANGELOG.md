# Changelog

Cambios que se han realizado en el proyecto desde su commit inicial.

## [0.2.0] MongoDB advanced features (14/07/24)

-Implementación rutas/archivos con métodos tipo `static` que sirven de frontend y demostración a la funcionalidad de la aplicación.
-Borrado todo rastro de implementación antigua de filesystem usada previamente.
-Borrando todo rastro de websocket implementado en la entrega anterior.
-Incorporado filtrados avanzados `sort, limit, page, category, status, stock, name, code` y paginacion en el proyectos en los servicios `/api/cart` y `/api/product`
-Incorporado la funcionalidad `populate()` de mongoose en la respuesta de `/api/cart` 

-------------------------------------------------------------------------------------------------------------------

## [0.1.0] MongoDB feature (14/07/24)

-Implementación de MongoDB en los endpoints de la aplicación, tanto en productos como en carrito de compras.
-Borrado todo rastro de implementación antigua de filesystem usada previamente.
-Incorporación de nueva estructura de carpetas para permitir mejor modularidad y reutilización de código (ver README.md).
-Unificación del servicio `addCartProduct` con el que tenia como objetivo reducir la cantidad de un producto del carro de compras, ya que compartían un gran porcentaje de funcionalidad.

### Bug Fixes

...

#### Bug still for fixed

-El middleware incorporado al servicio de `/upload` tiene un problema que al caer en un error o excepción y al consultar nuevamente el servicio, provocando sea una excepción o un proceso de subida de archivos correcta, queda en un loop provocando el cuelgue del servicio

-------------------------------------------------------------------------------------------------------------------

## [0.0.1] Primer Commit (--/--/--)

Implementación de rutas con manejo de archivos estaticos con la funcionalidad nativa de nodejs de filesystem

### Bug Fixes

...


