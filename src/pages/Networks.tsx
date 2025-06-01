import {
  AdjustmentsHorizontalIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ServerIcon,
  ShieldCheckIcon,
  SignalIcon,
  WifiIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface NetworkDevice {
  id: string;
  name: string;
  type: "switch" | "router" | "firewall" | "access_point";
  ipRange: string;
  bandwidth: string;
  status: "online" | "offline";
  devices: number;
  location: string;
  uptime: string;
  throughput: {
    rx: number;
    tx: number;
  };
}

interface NetworkMetrics {
  totalBandwidth: {
    used: number;
    total: number;
    percentage: number;
  };
  devices: {
    online: number;
    offline: number;
    total: number;
  };
  security: {
    threats: number;
    blocked: number;
    percentage: number;
  };
}

const mockNetworkDevices: NetworkDevice[] = [
  {
    id: "SW-001",
    name: "Tirany MDM Switch",
    type: "switch",
    ipRange: "10090.M20",
    bandwidth: "9850 MM",
    status: "online",
    devices: 30,
    location: "11.Quen",
    uptime: "204.77 1000-30",
    throughput: { rx: 85, tx: 72 },
  },
  {
    id: "SW-002",
    name: "Tirany MDM Sentcar",
    type: "switch",
    ipRange: "15590.M20",
    bandwidth: "0550 MM",
    status: "online",
    devices: 25,
    location: "11.Quen",
    uptime: "204.57 1000-30",
    throughput: { rx: 65, tx: 58 },
  },
  {
    id: "SW-003",
    name: "Tirany MDM Switch",
    type: "switch",
    ipRange: "16290.M20",
    bandwidth: "9560 MM",
    status: "online",
    devices: 32,
    location: "11.Quen",
    uptime: "204.77 1000-32",
    throughput: { rx: 78, tx: 69 },
  },
  {
    id: "SW-004",
    name: "Tirany MDM Sentcar",
    type: "switch",
    ipRange: "16890.M20",
    bandwidth: "0670 MM",
    status: "online",
    devices: 28,
    location: "10.Quen",
    uptime: "204.57 1000-38",
    throughput: { rx: 45, tx: 38 },
  },
  {
    id: "SW-005",
    name: "Tirany MDM Switch",
    type: "switch",
    ipRange: "3055.M20",
    bandwidth: "2500 MM",
    status: "offline",
    devices: 0,
    location: "21.Quen",
    uptime: "257.77 1000-35",
    throughput: { rx: 0, tx: 0 },
  },
  {
    id: "SW-006",
    name: "Tirany MDM Sentcar",
    type: "switch",
    ipRange: "1566.M20",
    bandwidth: "9530 MM",
    status: "online",
    devices: 35,
    location: "22.Quen",
    uptime: "204.77 1000-30",
    throughput: { rx: 92, tx: 87 },
  },
  {
    id: "SW-007",
    name: "Tirany MDM Switch",
    type: "switch",
    ipRange: "1590.M20",
    bandwidth: "9570 MM",
    status: "online",
    devices: 29,
    location: "21.Quen",
    uptime: "204.77 1000-32",
    throughput: { rx: 56, tx: 43 },
  },
  {
    id: "SW-008",
    name: "Tirany MDM Sentcar",
    type: "switch",
    ipRange: "1530.M20",
    bandwidth: "3977 MM",
    status: "online",
    devices: 22,
    location: "10.Quen",
    uptime: "204.77 1000-36",
    throughput: { rx: 34, tx: 29 },
  },
];

const mockMetrics: NetworkMetrics = {
  totalBandwidth: {
    used: 2847,
    total: 4127,
    percentage: 69,
  },
  devices: {
    online: 201,
    offline: 28,
    total: 229,
  },
  security: {
    threats: 15,
    blocked: 347,
    percentage: 96,
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "text-green-600 bg-green-100";
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
    case "offline":
      return "Offline";
    default:
      return "Desconhecido";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "switch":
      return ArrowsRightLeftIcon;
    case "router":
      return WifiIcon;
    case "firewall":
      return ShieldCheckIcon;
    case "access_point":
      return SignalIcon;
    default:
      return ServerIcon;
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case "switch":
      return "Switch";
    case "router":
      return "Roteador";
    case "firewall":
      return "Firewall";
    case "access_point":
      return "Access Point";
    default:
      return "Dispositivo";
  }
};

const getThroughputColor = (value: number) => {
  if (value < 40) return "bg-green-500";
  if (value < 70) return "bg-yellow-500";
  return "bg-red-500";
};

export function Networks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "switch" as NetworkDevice["type"],
    ipRange: "",
    bandwidth: "",
    location: "",
    maxConnections: "",
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredData = useMemo(() => {
    return mockNetworkDevices.filter((device) => {
      const matchesSearch =
        device.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        device.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        device.ipRange
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        device.location
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());

      const matchesType = filterType === "all" || device.type === filterType;
      const matchesStatus =
        filterStatus === "all" || device.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [debouncedSearchTerm, filterType, filterStatus]);

  const handleCreateDevice = () => {
    const newId = `SW-${String(mockNetworkDevices.length + 1).padStart(
      3,
      "0"
    )}`;
    const newNetworkDevice: NetworkDevice = {
      id: newId,
      name: newDevice.name,
      type: newDevice.type,
      ipRange: newDevice.ipRange,
      bandwidth: newDevice.bandwidth,
      status: "offline",
      devices: 0,
      location: newDevice.location,
      uptime: "0d 0h 0m",
      throughput: { rx: 0, tx: 0 },
    };

    mockNetworkDevices.push(newNetworkDevice);
    setShowCreateModal(false);
    setNewDevice({
      name: "",
      type: "switch",
      ipRange: "",
      bandwidth: "",
      location: "",
      maxConnections: "",
    });
  };

  const resetForm = () => {
    setNewDevice({
      name: "",
      type: "switch",
      ipRange: "",
      bandwidth: "",
      location: "",
      maxConnections: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <WifiIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Redes</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Monitore e gerencie a infraestrutura de rede em tempo real
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Dashboard
          </button>{" "}
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Novo Dispositivo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status da Rede</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-blue-600">
                  {mockMetrics.devices.online.toLocaleString()}
                </span>
                <span className="text-gray-500 ml-1">/</span>
                <span className="text-gray-400 ml-1">
                  {mockMetrics.devices.total.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Dispositivos Online</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <WifiIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Conectividade</span>
              <span>
                {Math.round(
                  (mockMetrics.devices.online / mockMetrics.devices.total) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${
                    (mockMetrics.devices.online / mockMetrics.devices.total) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Largura de Banda</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-green-600">
                  {mockMetrics.totalBandwidth.used.toLocaleString()}
                </span>
                <span className="text-gray-400 ml-1 text-sm">Mbps</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                de {mockMetrics.totalBandwidth.total.toLocaleString()} Mbps
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ArrowsRightLeftIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Utilização</span>
              <span>{mockMetrics.totalBandwidth.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${mockMetrics.totalBandwidth.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Segurança</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-purple-600">
                  {mockMetrics.security.blocked.toLocaleString()}
                </span>
                <span className="text-gray-400 ml-1 text-sm">bloqueios</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockMetrics.security.threats} ameaças detectadas
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Proteção</span>
              <span>{mockMetrics.security.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${mockMetrics.security.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Performance</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-orange-600">98.7</span>
                <span className="text-gray-400 ml-1 text-sm">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Uptime médio</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Disponibilidade</span>
              <span>Excelente</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full"
                style={{ width: "98.7%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Todos os Segmentos de Rede
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por IP, nome ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="switch">Switches</option>
                  <option value="router">Roteadores</option>
                  <option value="firewall">Firewalls</option>
                  <option value="access_point">Access Points</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos os Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>

                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispositivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Configurações IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Largura de Banda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispositivos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Throughput
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((device) => {
                const TypeIcon = getTypeIcon(device.type);
                return (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <TypeIcon className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {device.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {device.id} • {getTypeText(device.type)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {device.ipRange}
                      </div>
                      <div className="text-sm text-gray-500">
                        {device.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {device.bandwidth}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          device.status
                        )}`}
                      >
                        {getStatusText(device.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {device.devices}
                      </div>
                      <div className="text-sm text-gray-500">
                        {device.uptime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            RX: {device.throughput.rx}% TX:{" "}
                            {device.throughput.tx}%
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-8 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getThroughputColor(
                                  device.throughput.rx
                                )}`}
                                style={{ width: `${device.throughput.rx}%` }}
                              />
                            </div>
                            <div className="w-8 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getThroughputColor(
                                  device.throughput.tx
                                )}`}
                                style={{ width: `${device.throughput.tx}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <AdjustmentsHorizontalIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center">
            <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum dispositivo encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros ou termo de busca.
            </p>
          </div>
        )}

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Mostrando{" "}
              <span className="font-medium">{filteredData.length}</span> de{" "}
              <span className="font-medium">{mockNetworkDevices.length}</span>{" "}
              dispositivos
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Próximo
              </button>
            </div>{" "}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Criar Novo Dispositivo de Rede
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateDevice();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Dispositivo
                  </label>
                  <input
                    type="text"
                    required
                    value={newDevice.name}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Tirany MDM Switch"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    required
                    value={newDevice.type}
                    onChange={(e) =>
                      setNewDevice({
                        ...newDevice,
                        type: e.target.value as NetworkDevice["type"],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="switch">Switch</option>
                    <option value="router">Roteador</option>
                    <option value="firewall">Firewall</option>
                    <option value="access_point">Access Point</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faixa de IP
                  </label>
                  <input
                    type="text"
                    required
                    value={newDevice.ipRange}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, ipRange: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 192.168.1.0/24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Largura de Banda
                  </label>
                  <input
                    type="text"
                    required
                    value={newDevice.bandwidth}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, bandwidth: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 1000 Mbps"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localização
                  </label>
                  <input
                    type="text"
                    required
                    value={newDevice.location}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Sala de Servidores - Andar 1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Criar Dispositivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Networks;
