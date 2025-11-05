// tracing.js
'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const traceExporter = new OTLPTraceExporter({
  url: 'http://tempo:4318/v1/traces', // apunta al servicio Tempo dentro de la red Docker
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  console.log('✅ OpenTelemetry iniciado y exportando trazas a Tempo');
} catch (err) {
  console.error('❌ Error al iniciar OpenTelemetry', err);
}