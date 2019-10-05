import React from 'react';
import { YellowBox } from 'react-native';

// View - qualquer caixa/cointainer de texto == div do html
// StyleSheet - estilos dos objetos como js 
// Text - texto simples que precisa ser estilizada manualmente

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return <Routes/>
}