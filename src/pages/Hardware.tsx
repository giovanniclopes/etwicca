import {
  CircleStackIcon,
  CogIcon,
  ComputerDesktopIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface HardwareItem {
  id: string;
  name: string;
  type: "server" | "workstation" | "storage";
  status: "online" | "warning" | "offline";
  cpu: {
    usage: number;
    cores: number;
    model: string;
  };
  memory: {
    usage: number;
    total: number;
    unit: "GB" | "TB";
  };
  storage: {
    usage: number;
    total: number;
    unit: "GB" | "TB";
  };
  network: {
    rx: string;
    tx: string;
  };
  mac: string;
  uptime: string;
  location: string;
  lastUpdate: string;
}

const mockHardwareData: HardwareItem[] = [
  {
    id: "SRV-001",
    name: "Servidor Principal Web",
    type: "server",
    status: "online",
    cpu: {
      usage: 45,
      cores: 16,
      model: "Intel Xeon E5-2690v4",
    },
    memory: {
      usage: 18,
      total: 32,
      unit: "GB",
    },
    storage: {
      usage: 235,
      total: 500,
      unit: "GB",
    },
    network: {
      rx: "105M",
      tx: "89M",
    },
    mac: "00:1B:44:11:3A:B7",
    uptime: "15 dias",
    location: "Rack A1",
    lastUpdate: "2 min atrás",
  },
  {
    id: "SRV-002",
    name: "Servidor Banco de Dados",
    type: "server",
    status: "warning",
    cpu: {
      usage: 78,
      cores: 24,
      model: "Intel Xeon Silver 4214",
    },
    memory: {
      usage: 168,
      total: 256,
      unit: "GB",
    },
    storage: {
      usage: 1.8,
      total: 4,
      unit: "TB",
    },
    network: {
      rx: "70M",
      tx: "45M",
    },
    mac: "00:1B:44:11:3A:C8",
    uptime: "32 dias",
    location: "Rack A2",
    lastUpdate: "1 min atrás",
  },
  {
    id: "STG-001",
    name: "Storage Principal",
    type: "storage",
    status: "online",
    cpu: {
      usage: 23,
      cores: 8,
      model: "AMD EPYC 7302P",
    },
    memory: {
      usage: 26,
      total: 64,
      unit: "GB",
    },
    storage: {
      usage: 12,
      total: 50,
      unit: "TB",
    },
    network: {
      rx: "200M",
      tx: "180M",
    },
    mac: "00:1B:44:11:3A:D9",
    uptime: "45 dias",
    location: "Rack B1",
    lastUpdate: "30 seg atrás",
  },
  {
    id: "WKS-001",
    name: "Workstation Desenvolvimento",
    type: "workstation",
    status: "online",
    cpu: {
      usage: 34,
      cores: 12,
      model: "Intel Core i7-12700K",
    },
    memory: {
      usage: 24,
      total: 64,
      unit: "GB",
    },
    storage: {
      usage: 890,
      total: 2000,
      unit: "GB",
    },
    network: {
      rx: "15M",
      tx: "8M",
    },
    mac: "00:1B:44:11:3A:EA",
    uptime: "8 dias",
    location: "Sala Dev",
    lastUpdate: "5 min atrás",
  },
  {
    id: "SRV-003",
    name: "Servidor Aplicações",
    type: "server",
    status: "offline",
    cpu: {
      usage: 0,
      cores: 20,
      model: "Intel Xeon Gold 6248",
    },
    memory: {
      usage: 0,
      total: 128,
      unit: "GB",
    },
    storage: {
      usage: 450,
      total: 1000,
      unit: "GB",
    },
    network: {
      rx: "0M",
      tx: "0M",
    },
    mac: "00:1B:44:11:3A:FB",
    uptime: "Offline",
    location: "Rack A3",
    lastUpdate: "2 horas atrás",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "text-green-600 bg-green-100";
    case "warning":
      return "text-yellow-600 bg-yellow-100";
    case "offline":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "online":
      return "Online";
    case "warning":
      return "Alerta";
    case "offline":
      return "Offline";
    default:
      return "Desconhecido";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "server":
      return ServerIcon;
    case "workstation":
      return ComputerDesktopIcon;
    case "storage":
      return CircleStackIcon;
    default:
      return ServerIcon;
  }
};

const getUsageColor = (usage: number) => {
  if (usage < 50) return "bg-green-500";
  if (usage < 80) return "bg-yellow-500";
  return "bg-red-500";
};

export function Hardware() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredData = useMemo(() => {
    return mockHardwareData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.mac.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesType = filterType === "all" || item.type === filterType;
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [debouncedSearchTerm, filterType, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hardware</h1>
          <p className="mt-2 text-gray-600">
            Gerenciar e monitorar equipamentos de TI
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID ou MAC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="server">Servidores</option>
                  <option value="workstation">Workstations</option>
                  <option value="storage">Storage</option>
                </select>
                <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos os Status</option>
                  <option value="online">Online</option>
                  <option value="warning">Alerta</option>
                  <option value="offline">Offline</option>
                </select>
                <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memória
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rede
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => {
                const IconComponent = getTypeIcon(item.type);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {item.id}
                          </div>
                          <div className="text-xs text-gray-400">
                            MAC: {item.mac}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusText(item.status)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.lastUpdate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.cpu.usage}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(
                            item.cpu.usage
                          )}`}
                          style={{ width: `${item.cpu.usage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.cpu.cores} cores
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.memory.usage}
                        {item.memory.unit} / {item.memory.total}
                        {item.memory.unit}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(
                            (item.memory.usage / item.memory.total) * 100
                          )}`}
                          style={{
                            width: `${
                              (item.memory.usage / item.memory.total) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(
                          (item.memory.usage / item.memory.total) * 100
                        )}
                        % usado
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.storage.usage}
                        {item.storage.unit} / {item.storage.total}
                        {item.storage.unit}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(
                            (item.storage.usage / item.storage.total) * 100
                          )}`}
                          style={{
                            width: `${
                              (item.storage.usage / item.storage.total) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(
                          (item.storage.usage / item.storage.total) * 100
                        )}
                        % usado
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ↓ {item.network.rx}
                      </div>
                      <div className="text-sm text-gray-900">
                        ↑ {item.network.tx}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.uptime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                          Ver Detalhes
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium transition-colors">
                          <CogIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <ServerIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum equipamento encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termo de busca.
            </p>
          </div>
        )}

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando {filteredData.length} de {mockHardwareData.length}{" "}
              equipamentos
            </div>
            <div className="text-xs text-gray-500">
              Atualizado automaticamente a cada 30 segundos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hardware;
