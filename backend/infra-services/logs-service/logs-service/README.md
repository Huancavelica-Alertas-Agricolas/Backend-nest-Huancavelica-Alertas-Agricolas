# 📊 Logs Service (Opcional)

Servicio centralizado de logging y métricas del sistema.

## 🚀 Funcionalidades

- ✅ Recolección de logs centralizados
- ✅ Agregación de métricas
- ✅ Alertas de errores
- ✅ Dashboard de monitoreo
- ✅ Análisis de performance
- ✅ Retención de logs
- ✅ Búsqueda avanzada

## 🛠️ Stack Tecnológico

- **Node.js + TypeScript**
- **Express.js**
- **Elasticsearch** (almacenamiento de logs)
- **Logstash** (procesamiento)
- **Kibana** (visualización)
- **Grafana** (métricas)
- **Prometheus** (recolección)
- **Winston** (logging library)

## 📋 API Endpoints

### Logs Management
- POST /logs - Recibir logs de servicios
- GET /logs/search - Buscar logs
- GET /logs/export - Exportar logs
- DELETE /logs/cleanup - Limpiar logs antiguos

### Métricas
- GET /metrics - Métricas generales
- GET /metrics/services - Métricas por servicio
- GET /metrics/performance - Performance metrics
- GET /metrics/errors - Error tracking

### Alertas
- POST /alerts/create - Crear alerta de log
- GET /alerts/rules - Reglas de alertas
- PUT /alerts/rules/:id - Actualizar regla
- DELETE /alerts/rules/:id - Eliminar regla

## 🔍 Esquema de Logs

### Log Entry Structure
\\\	ypescript
interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'error' | 'warn' | 'info' | 'debug';
  service: string;
  message: string;
  metadata?: {
    userId?: string;
    requestId?: string;
    ip?: string;
    userAgent?: string;
    duration?: number;
    statusCode?: number;
    error?: {
      name: string;
      message: string;
      stack: string;
    };
  };
  tags?: string[];
}
\\\

### Metrics Schema
\\\	ypescript
interface MetricEntry {
  id: string;
  timestamp: Date;
  service: string;
  metricName: string;
  value: number;
  unit: string;
  labels?: Record<string, string>;
}
\\\

## 📊 Log Aggregation

### Error Tracking
\\\javascript
// services/errorTracker.js
class ErrorTracker {
  async trackError(error, context) {
    const errorLog = {
      level: 'error',
      service: context.service,
      message: error.message,
      metadata: {
        userId: context.userId,
        requestId: context.requestId,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      },
      tags: ['error', 'exception']
    };

    await this.saveLog(errorLog);
    await this.checkAlertRules(errorLog);
  }

  async checkAlertRules(log) {
    const rules = await this.getAlertRules();
    
    for (const rule of rules) {
      if (this.matchesRule(log, rule)) {
        await this.triggerAlert(rule, log);
      }
    }
  }
}
\\\

### Performance Metrics
\\\javascript
// services/metricsCollector.js
class MetricsCollector {
  async collectServiceMetrics() {
    const services = ['users', 'alerts', 'notifier', 'ingress'];
    
    for (const service of services) {
      try {
        const response = await fetch(${service}/metrics);
        const metrics = await response.json();
        
        await this.saveMetrics(service, metrics);
      } catch (error) {
        console.error(Failed to collect metrics from :, error);
      }
    }
  }

  async saveMetrics(service, metrics) {
    const entries = metrics.map(metric => ({
      timestamp: new Date(),
      service,
      metricName: metric.name,
      value: metric.value,
      unit: metric.unit,
      labels: metric.labels
    }));

    await elasticsearchClient.bulk({
      index: 'metrics',
      body: entries.flatMap(entry => [
        { index: { _index: 'metrics' } },
        entry
      ])
    });
  }
}
\\\

## 🔔 Alert Rules

### Error Rate Alert
\\\javascript
// config/alertRules.js
const alertRules = [
  {
    name: 'High Error Rate',
    condition: {
      metric: 'error_rate',
      threshold: 5, // 5% error rate
      window: '5m',
      service: '*'
    },
    actions: [
      {
        type: 'email',
        recipients: ['admin@cityalerts.com'],
        template: 'high-error-rate'
      },
      {
        type: 'slack',
        webhook: process.env.SLACK_WEBHOOK,
        channel: '#alerts'
      }
    ]
  },
  {
    name: 'Service Down',
    condition: {
      metric: 'service_availability',
      threshold: 0,
      window: '1m',
      service: ['users', 'alerts', 'notifier']
    },
    actions: [
      {
        type: 'pagerduty',
        severity: 'critical'
      }
    ]
  }
];
\\\

## 📈 Dashboard Queries

### Elasticsearch Queries
\\\javascript
// queries/logQueries.js
const getErrorTrends = async (timeRange = '24h') => {
  return await elasticsearchClient.search({
    index: 'logs',
    body: {
      query: {
        bool: {
          must: [
            { term: { level: 'error' } },
            {
              range: {
                timestamp: {
                  gte: 
ow-
                }
              }
            }
          ]
        }
      },
      aggs: {
        errors_over_time: {
          date_histogram: {
            field: 'timestamp',
            interval: '1h'
          },
          aggs: {
            by_service: {
              terms: {
                field: 'service.keyword'
              }
            }
          }
        }
      }
    }
  });
};

const getTopErrors = async (limit = 10) => {
  return await elasticsearchClient.search({
    index: 'logs',
    body: {
      query: {
        term: { level: 'error' }
      },
      aggs: {
        top_errors: {
          terms: {
            field: 'message.keyword',
            size: limit
          }
        }
      }
    }
  });
};
\\\

## 🚀 Desarrollo

\\\ash
# Instalar dependencias
npm install

# Iniciar Elasticsearch (Docker)
docker-compose up elasticsearch kibana

# Crear índices
npm run setup:indices

# Modo desarrollo
npm run dev

# Ejecutar tests
npm test

# Build para producción
npm run build
\\\

## 🔧 Variables de Entorno

\\\nv
PORT=3004
NODE_ENV=development

# Elasticsearch
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_INDEX_LOGS=logs
ELASTICSEARCH_INDEX_METRICS=metrics

# Kibana
KIBANA_URL=http://localhost:5601

# Grafana
GRAFANA_URL=http://localhost:3000
GRAFANA_API_KEY=your-grafana-api-key

# Prometheus
PROMETHEUS_URL=http://localhost:9090

# Alerting
SLACK_WEBHOOK=https://hooks.slack.com/services/xxx
PAGERDUTY_API_KEY=your-pagerduty-key
EMAIL_SERVICE_URL=http://localhost:3003

# Log Retention
LOG_RETENTION_DAYS=30
METRICS_RETENTION_DAYS=90

# Performance
BATCH_SIZE=1000
FLUSH_INTERVAL=5000
\\\

## 📊 Kibana Dashboards

### Predefined Dashboards
- **Service Overview**: Métricas generales por servicio
- **Error Analysis**: Análisis detallado de errores
- **Performance Monitor**: Latencia y throughput
- **User Activity**: Patrones de uso
- **Alert History**: Historial de alertas

### Custom Visualizations
- Heatmaps de actividad
- Gráficos de error rates
- Métricas de performance
- Distribución geográfica
- Timeline de eventos

## 🔍 Log Search API

\\\javascript
// routes/search.js
app.get('/logs/search', async (req, res) => {
  const {
    query,
    service,
    level,
    startTime,
    endTime,
    limit = 100,
    offset = 0
  } = req.query;

  const searchQuery = {
    index: 'logs',
    body: {
      query: {
        bool: {
          must: [],
          filter: []
        }
      },
      sort: [{ timestamp: { order: 'desc' } }],
      from: offset,
      size: limit
    }
  };

  // Add filters
  if (query) {
    searchQuery.body.query.bool.must.push({
      multi_match: {
        query,
        fields: ['message', 'metadata.*']
      }
    });
  }

  if (service) {
    searchQuery.body.query.bool.filter.push({
      term: { 'service.keyword': service }
    });
  }

  if (level) {
    searchQuery.body.query.bool.filter.push({
      term: { level }
    });
  }

  if (startTime && endTime) {
    searchQuery.body.query.bool.filter.push({
      range: {
        timestamp: {
          gte: startTime,
          lte: endTime
        }
      }
    });
  }

  try {
    const result = await elasticsearchClient.search(searchQuery);
    res.json({
      logs: result.body.hits.hits.map(hit => hit._source),
      total: result.body.hits.total.value,
      took: result.body.took
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});
\\\

## 📈 Métricas Clave

- **Logs por minuto**: Volumen de logs
- **Error rate**: Porcentaje de errores
- **Service latency**: Latencia por servicio
- **Alert frequency**: Frecuencia de alertas
- **Search performance**: Performance de búsquedas
- **Storage usage**: Uso de almacenamiento
