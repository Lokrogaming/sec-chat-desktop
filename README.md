# Sec Chat Desktop

Eine Windows-Desktop-App, die [Sec Chat](https://sec-chat.lovable.app) direkt
öffnet. Login- und Seitendaten werden wie bei einem normalen Browser lokal
gespeichert.

## Starten

Einmalig Node.js installieren, dann im Projektordner:

```powershell
npm install
npm start
```

## Windows-Installer erstellen

```powershell
npm run dist
```

Danach liegt der Installer im Ordner `dist`. Auf dem Ziel-PC ist weder Node.js
noch .NET erforderlich.
