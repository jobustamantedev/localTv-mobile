# localTv Mobile

App de Android minimalista para ver canales de TV en vivo, sin backend ni conexiones externas.

## 📋 Características

- ✅ 10+ canales de TV en vivo predefinidos
- ✅ Interfaz limpia y minimalista
- ✅ Selección rápida de canales
- ✅ Marcadores de favoritos
- ✅ Indicadores de estado EN VIVO/Offline
- ✅ Soporte para Chromecast
- ✅ Sin backend, sin BD externa

## 🏗️ Stack

- React Native + Expo
- TypeScript
- React Context
- JSON embebido para datos

## 🚀 Quick Start

```bash
cd localTv-mobile
npm install
npm start           # Dev
npm run android     # Compilar Android
npm run ios        # Compilar iOS
```

## 🔨 Compilar APK

```bash
npm install -g eas-cli
eas login
eas build --platform android --local
```

## 📱 Uso

1. Seleccionar canal → se carga automáticamente
2. Click ★ → agregar a favoritos
3. Click 📺 → transmitir a TV (Chromecast)

## 📊 Agregar Canales

Editar `src/data/channels.json`

## 🎥 TODO

- [ ] Integrar video player real (react-native-video)
- [ ] Implementar Chromecast (react-native-chromecast)
- [ ] Persistencia de favoritos (AsyncStorage)
- [ ] Dark theme mejorado
- [ ] Tests

## 📄 Licencia

MIT

