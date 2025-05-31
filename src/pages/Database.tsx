import {
  ArrowPathIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  PlusIcon,
  ServerIcon,
  StopIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface DatabaseInstance {
  id: string;
  name: string;
  type: "SQL" | "NoSQL" | "Cache" | "Graph" | "TimeSeries";
  engine: string;
  host: string;
  port: number;
  status: "online" | "offline" | "maintenance" | "error";
  cpu: number;
  memory: number;
  storage: number;
  connections: number;
  maxConnections: number;
  uptime: string;
  lastBackup: string;
  version: string;
  environment: "production" | "staging" | "development";
  size: string;
}

interface DatabaseMetrics {
  totalDatabases: number;
  onlineInstances: number;
  totalConnections: number;
  avgCpuUsage: number;
  avgMemoryUsage: number;
  totalStorage: string;
}

const mockDatabases: DatabaseInstance[] = [
  {
    id: "db-001",
    name: "etwicca_production",
    type: "SQL",
    engine: "PostgreSQL 15.3",
    host: "192.168.1.10",
    port: 5432,
    status: "online",
    cpu: 45,
    memory: 68,
    storage: 75,
    connections: 45,
    maxConnections: 100,
    uptime: "127d 14h 23m",
    lastBackup: "2025-05-31 02:00:00",
    version: "15.3",
    environment: "production",
    size: "2.3 TB",
  },
  {
    id: "db-002",
    name: "etwicca_cache",
    type: "Cache",
    engine: "Redis 7.0",
    host: "192.168.1.11",
    port: 6379,
    status: "online",
    cpu: 12,
    memory: 34,
    storage: 15,
    connections: 23,
    maxConnections: 50,
    uptime: "95d 7h 12m",
    lastBackup: "2025-05-31 01:30:00",
    version: "7.0.11",
    environment: "production",
    size: "45.2 GB",
  },
  {
    id: "db-003",
    name: "analytics_mongo",
    type: "NoSQL",
    engine: "MongoDB 6.0",
    host: "192.168.1.12",
    port: 27017,
    status: "online",
    cpu: 28,
    memory: 52,
    storage: 82,
    connections: 18,
    maxConnections: 200,
    uptime: "67d 22h 45m",
    lastBackup: "2025-05-31 03:15:00",
    version: "6.0.8",
    environment: "production",
    size: "1.8 TB",
  },
  {
    id: "db-004",
    name: "etwicca_staging",
    type: "SQL",
    engine: "PostgreSQL 15.3",
    host: "192.168.1.20",
    port: 5432,
    status: "maintenance",
    cpu: 0,
    memory: 5,
    storage: 35,
    connections: 0,
    maxConnections: 50,
    uptime: "0d 0h 0m",
    lastBackup: "2025-05-30 23:45:00",
    version: "15.3",
    environment: "staging",
    size: "340 GB",
  },
  {
    id: "db-005",
    name: "logs_elasticsearch",
    type: "NoSQL",
    engine: "Elasticsearch 8.8",
    host: "192.168.1.13",
    port: 9200,
    status: "online",
    cpu: 35,
    memory: 71,
    storage: 89,
    connections: 12,
    maxConnections: 30,
    uptime: "45d 11h 33m",
    lastBackup: "2025-05-31 00:30:00",
    version: "8.8.2",
    environment: "production",
    size: "5.2 TB",
  },
  {
    id: "db-006",
    name: "dev_postgres",
    type: "SQL",
    engine: "PostgreSQL 14.9",
    host: "192.168.1.30",
    port: 5432,
    status: "error",
    cpu: 0,
    memory: 0,
    storage: 25,
    connections: 0,
    maxConnections: 25,
    uptime: "0d 0h 0m",
    lastBackup: "2025-05-30 18:00:00",
    version: "14.9",
    environment: "development",
    size: "125 GB",
  },
];

const mockMetrics: DatabaseMetrics = {
  totalDatabases: 6,
  onlineInstances: 4,
  totalConnections: 98,
  avgCpuUsage: 24,
  avgMemoryUsage: 38,
  totalStorage: "9.8 TB",
};

export default function Database() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredDatabases = useMemo(() => {
    return mockDatabases.filter((db) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        db.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        db.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        db.engine.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        db.host.includes(debouncedSearchTerm);

      const matchesType = selectedType === "all" || db.type === selectedType;
      const matchesEnvironment =
        selectedEnvironment === "all" || db.environment === selectedEnvironment;

      return matchesSearch && matchesType && matchesEnvironment;
    });
  }, [debouncedSearchTerm, selectedType, selectedEnvironment]);

  const getStatusIcon = (status: DatabaseInstance["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "offline":
        return <XCircleIcon className="w-5 h-5 text-gray-400" />;
      case "maintenance":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <XCircleIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: DatabaseInstance["status"]) => {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "maintenance":
        return "Manutenção";
      case "error":
        return "Erro";
      default:
        return "Desconhecido";
    }
  };

  const getTypeColor = (type: DatabaseInstance["type"]) => {
    switch (type) {
      case "SQL":
        return "bg-blue-100 text-blue-800";
      case "NoSQL":
        return "bg-green-100 text-green-800";
      case "Cache":
        return "bg-purple-100 text-purple-800";
      case "Graph":
        return "bg-orange-100 text-orange-800";
      case "TimeSeries":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEnvironmentColor = (
    environment: DatabaseInstance["environment"]
  ) => {
    switch (environment) {
      case "production":
        return "bg-red-100 text-red-800";
      case "staging":
        return "bg-yellow-100 text-yellow-800";
      case "development":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CircleStackIcon className="w-8 h-8 mr-3 text-blue-600" />
            Banco de Dados
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie e monitore todas as instâncias de banco de dados
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nova Instância
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total de Instâncias
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMetrics.totalDatabases}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CircleStackIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Instâncias Online
              </p>
              <p className="text-2xl font-bold text-green-600">
                {mockMetrics.onlineInstances}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conexões Ativas
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMetrics.totalConnections}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ServerIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Armazenamento Total
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMetrics.totalStorage}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, ID, engine ou host..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos os Tipos</option>
              <option value="SQL">SQL</option>
              <option value="NoSQL">NoSQL</option>
              <option value="Cache">Cache</option>
              <option value="Graph">Graph</option>
              <option value="TimeSeries">Time Series</option>
            </select>

            <select
              value={selectedEnvironment}
              onChange={(e) => setSelectedEnvironment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos os Ambientes</option>
              <option value="production">Produção</option>
              <option value="staging">Staging</option>
              <option value="development">Desenvolvimento</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Mostrando {filteredDatabases.length} de {mockDatabases.length}{" "}
            instâncias
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instância
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recursos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conexões
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Backup
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDatabases.map((db) => (
                <tr key={db.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CircleStackIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {db.name}
                        </div>
                        <div className="text-sm text-gray-500">{db.engine}</div>
                        <div className="text-xs text-gray-400">
                          {db.host}:{db.port}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                              db.type
                            )}`}
                          >
                            {db.type}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEnvironmentColor(
                              db.environment
                            )}`}
                          >
                            {db.environment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(db.status)}
                      <span className="ml-2 text-sm text-gray-900">
                        {getStatusText(db.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 w-12">CPU:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getUsageColor(
                              db.cpu
                            )}`}
                            style={{ width: `${db.cpu}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-700 w-10">
                          {db.cpu}%
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 w-12">RAM:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getUsageColor(
                              db.memory
                            )}`}
                            style={{ width: `${db.memory}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-700 w-10">
                          {db.memory}%
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 w-12">
                          Disco:
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getUsageColor(
                              db.storage
                            )}`}
                            style={{ width: `${db.storage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-700 w-10">
                          {db.storage}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Tamanho: {db.size}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {db.connections}/{db.maxConnections}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(
                          (db.connections / db.maxConnections) * 100
                        )}`}
                        style={{
                          width: `${
                            (db.connections / db.maxConnections) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {db.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(db.lastBackup).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {db.status === "offline" ? (
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Iniciar"
                        >
                          <PlayIcon className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Parar"
                        >
                          <StopIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Reiniciar"
                      >
                        <ArrowPathIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-900"
                        title="Backup"
                      >
                        <DocumentDuplicateIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Mais opções"
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDatabases.length === 0 && (
          <div className="text-center py-12">
            <CircleStackIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma instância encontrada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
