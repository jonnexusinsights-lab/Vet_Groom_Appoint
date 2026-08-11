# Guía del Usuario: Fashion Pets PZ

Bienvenido a la guía de usuario del sistema de gestión de estética veterinaria de **Fashion Pets PZ**. Esta plataforma centraliza la agenda de citas, expedientes de mascotas, cierres de caja y estadísticas operativas de su negocio.

---

## 1. Roles de Usuario y Permisos

Para mantener el control y seguridad de los datos, la aplicación cuenta con cuatro roles diferenciados:

| Rol | Funciones Permitidas |
| :--- | :--- |
| **Administrador** | Acceso total al sistema, edición de precios, configuración de estilistas y reportes históricos de venta. |
| **Recepcionista** | Agendamiento de citas, registro de clientes y mascotas, cobros en caja y visualización de agenda. |
| **Estilista (Estetista)**| Consulta de su agenda asignada del día y actualización de estado (en proceso, completado). Sin acceso a caja. |
| **Contador** | Visualización y exportación de reportes de ventas diarios y mensuales. Sin permisos de agendado o edición. |

---

## 2. Descripción de Módulos

### A. Panel de Control (Dashboard)
El panel principal muestra las métricas clave de la jornada en tiempo real:
* **Citas del Día**: Cantidad total de servicios agendados hoy.
* **Mascotas en Local**: Mascotas ingresadas físicamente a la estética.
* **Completados**: Servicios de grooming finalizados.
* **Ventas del Día**: Sumatoria de abonos y saldos cobrados hoy.

### B. Agenda y Calendario Interactivos
El centro de la operación. Se organiza por columnas (una para cada estilista) y por bloques de hora.
* **Duración Automatizada**: El sistema calcula la duración de la cita basándose en la raza/tamaño de la mascota y el servicio seleccionado, bloqueando ese tiempo de forma visual para evitar sobrecargas.
* **Estados del Servicio**: Cada tarjeta cambia de color según el estado:
  - *Agendado* (Azul)
  - *Checked-In* (Amarillo) - Perro llegó al local.
  - *In-Progress* (Morado) - Estilista inició el corte.
  - *Completed* (Verde) - Servicio terminado y listo para cobro.

### C. Directorio de Clientes y Mascotas
Base de datos unificada para administrar perfiles. Cada cliente puede tener múltiples mascotas asociadas.
* **Fichas de Mascotas**: Contiene especie, raza, fecha de nacimiento y tamaño (Pequeño, Mediano, Grande, Gigante).
* **Alertas Especiales**:
  - *Alerta Médica*: Alergias a productos o champús.
  - *Alerta de Temperamento*: Indicador de comportamiento agresivo, nervioso o miedos.

### D. Caja y Transacciones
Módulo para registrar cobros y cuadrar caja al final del día.
* Admite cobros parciales (abono/depósito al agendar) y cobros de saldos pendientes en el local.
* Registra tres métodos de pago: Efectivo, Tarjeta y Transferencia SINPE.

### E. Reportes y Analítica
Generación de estadísticas de desempeño del negocio:
* Ventas por método de pago.
* Productividad de estilistas (número de servicios realizados).
* Lista de recuperación de clientes (dueños con más de 60 días sin agendar).
