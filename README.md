# Dashboard Vue + Bootstrap

Un dashboard moderno y responsivo construido con Vue.js 3 y Bootstrap 5, que incluye características de clima, tipo de cambio y gestión de tareas.

## 🚀 Características

- 🌤️ Widget de clima con geolocalización
- 💱 Conversión de moneda USD a CLP en tiempo real
- ✅ Gestor de tareas con almacenamiento local
- 🎨 Diseño moderno con efecto glassmorphism
- 📱 Totalmente responsivo
- ♿ Accesible (ARIA)

## 🛠️ Tecnologías Utilizadas

- Vue.js 3 (CDN)
- Bootstrap 5.3.3
- Bootstrap Icons
- APIs:
  - Open-Meteo (Clima)
  - Exchange Rate API (Tipo de cambio)

## 🚦 Cómo Usar

1. Clona el repositorio:
```bash
git clone https://github.com/SamirEzequiel/dashboard-API.git
```

2. Abre el archivo `index.html` en tu navegador o usa un servidor local.

3. Para desarrollo, puedes usar cualquier servidor local, por ejemplo con Python:
```bash
python -m http.server 8000
```

## 📋 Funcionalidades

### Widget de Clima
- Muestra temperatura actual
- Velocidad y dirección del viento
- Soporte para geolocalización
- Actualización manual de datos

### Conversor de Moneda
- Tasa de cambio USD a CLP en tiempo real
- Actualización manual
- Muestra fecha de última actualización

### Gestor de Tareas
- Agregar/eliminar tareas
- Marcar tareas como completadas
- Persistencia en localStorage
- Opción para limpiar tareas completadas
- Reinicio completo de la lista

## 🎨 Personalización

El dashboard utiliza variables CSS para los colores principales:
```css
:root {
  --bg: #0f172a;
  --fg: #e2e8f0;
  --muted: #94a3b8;
  --task-bg: rgba(255, 255, 255, 0.9);
}
```

## 📝 Licencia

MIT License - Siéntete libre de usar y modificar este proyecto como desees.

## ✨ Autor

Desarrollado por SamirEzequiel