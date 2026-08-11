# Manual de Resolución de Problemas (Troubleshooting)

Este documento detalla las soluciones a los problemas más comunes relacionados con el funcionamiento del sistema en su computadora local (servidor de la recepción).

---

## 1. El sistema no carga en la computadora principal (Pantalla en blanco / Conexión rechazada)

**Posible causa**: El servidor local de Node.js no está activo o se detuvo.

**Solución**:
1. Busque en su escritorio el acceso directo o archivo ejecutable llamado **Iniciar Sistema Fashion Pets**.
2. Dé doble clic para abrir la consola del sistema. Mantenga esta ventana minimizada (no la cierre, ya que es el motor que ejecuta el programa).
3. Abra su navegador de internet (Google Chrome o Edge) e ingrese a: `http://localhost:3000`.

---

## 2. El sistema carga pero muestra un mensaje de "Error de Base de Datos"

**Posible causa**: El contenedor de Docker que aloja la base de datos PostgreSQL se detuvo o no inició correctamente al encender la computadora.

**Solución**:
1. Abra el programa **Docker Desktop** en su computadora principal.
2. Verifique la lista de contenedores. Debe haber uno llamado `fashion-pets-db`.
3. Si el círculo está en color gris o rojo (detenido), dé clic en el icono de **Play** (Iniciar) a la derecha del contenedor.
4. Espere 10 segundos a que el círculo cambie a verde (ejecutándose) e intente recargar la página del sistema en el navegador.

---

## 3. Las tabletas o celulares del local no se pueden conectar a la agenda

**Posible causa**: La tableta o celular no está en la misma red Wi-Fi que la computadora principal, o la dirección IP de la computadora cambió.

**Solución**:
1. **Verificar Wi-Fi**: Asegúrese de que tanto la computadora de la recepción como la tableta/celular estén conectados a la **misma red Wi-Fi** del local.
2. **Obtener la dirección IP**: En la computadora de la recepción:
   - Abra el menú Inicio de Windows, escriba `cmd` y presione Enter.
   - En la consola negra escriba `ipconfig` y presione Enter.
   - Busque la línea que dice **Dirección IPv4** (suele ser algo como `192.168.1.100`).
3. **Ingresar en la tableta**: En el navegador de su tableta o celular, escriba esa IP seguida de `:3000` (ejemplo: `http://192.168.1.100:3000`).

---

## 4. Las copias de seguridad (Backups) diarias muestran error

**Posible causa**: La llave USB o disco duro externo destinado a los respaldos no está conectado en el puerto USB correcto de la computadora principal, o la letra de la unidad de almacenamiento cambió en Windows.

**Solución**:
1. Asegúrese de que la llave USB de respaldo esté físicamente conectada en la computadora principal.
2. Abra **Este Equipo** en Windows y verifique la letra asignada a la llave USB (ejemplo: unidad `D:` o `E:`).
3. Si la letra cambió (por ejemplo de `D:` a `F:`), avise al soporte técnico para ajustar la ruta en el script automatizado, o renombre la unidad en la administración de discos de Windows a la letra original predeterminada.
