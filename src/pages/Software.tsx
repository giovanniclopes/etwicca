import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  CloudArrowDownIcon,
  CodeBracketIcon,
  CogIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SoftwareItem {
  id: string;
  name: string;
  version: string;
  category: "system" | "development" | "security" | "productivity" | "database";
  status: "updated" | "outdated" | "installing" | "error";
  license: string;
  installationId: string;
  updateVersion?: string;
  icon: string;
  description: string;
  vendor: string;
  installDate: string;
  lastUpdate: string;
  size: string;
  dependencies: string[];
  securityRating: "high" | "medium" | "low";
}

const mockSoftwareData: SoftwareItem[] = [
  {
    id: "soft-001",
    name: "Visual Studio Code",
    version: "1.89.2",
    category: "development",
    status: "updated",
    license: "MIT",
    installationId: "vscode-2024-001",
    icon: "💻",
    description: "Editor de código poderoso e leve",
    vendor: "Microsoft",
    installDate: "15/03/2024",
    lastUpdate: "28/05/2025",
    size: "324 MB",
    dependencies: ["Node.js", "Git"],
    securityRating: "high",
  },
  {
    id: "soft-002",
    name: "Node.js",
    version: "20.12.2",
    category: "development",
    status: "outdated",
    license: "MIT",
    installationId: "nodejs-2024-002",
    updateVersion: "20.13.1",
    icon: "🟢",
    description: "Runtime JavaScript para servidor",
    vendor: "Node.js Foundation",
    installDate: "10/02/2024",
    lastUpdate: "20/04/2024",
    size: "89 MB",
    dependencies: [],
    securityRating: "high",
  },
  {
    id: "soft-003",
    name: "PostgreSQL",
    version: "15.3",
    category: "database",
    status: "updated",
    license: "PostgreSQL License",
    installationId: "postgres-2024-003",
    icon: "🐘",
    description: "Sistema de banco de dados relacional",
    vendor: "PostgreSQL Global Development Group",
    installDate: "05/01/2024",
    lastUpdate: "15/05/2024",
    size: "456 MB",
    dependencies: ["OpenSSL"],
    securityRating: "high",
  },
  {
    id: "soft-004",
    name: "Docker Desktop",
    version: "4.19.0",
    category: "system",
    status: "installing",
    license: "Docker Subscription Service Agreement",
    installationId: "docker-2024-004",
    updateVersion: "4.20.1",
    icon: "🐳",
    description: "Plataforma de containerização",
    vendor: "Docker Inc.",
    installDate: "22/05/2024",
    lastUpdate: "Instalando...",
    size: "1.2 GB",
    dependencies: ["WSL2", "Hyper-V"],
    securityRating: "medium",
  },
  {
    id: "soft-005",
    name: "Windows Defender",
    version: "4.18.24040.9",
    category: "security",
    status: "updated",
    license: "Microsoft Software License",
    installationId: "defender-system-001",
    icon: "🛡️",
    description: "Antivírus e proteção em tempo real",
    vendor: "Microsoft Corporation",
    installDate: "Sistema",
    lastUpdate: "30/05/2024",
    size: "185 MB",
    dependencies: [],
    securityRating: "high",
  },
  {
    id: "soft-006",
    name: "Microsoft Office 365",
    version: "16.0.17531.20140",
    category: "productivity",
    status: "outdated",
    license: "Microsoft 365 Business Premium",
    installationId: "office365-2024-006",
    updateVersion: "16.0.17601.20148",
    icon: "📄",
    description: "Suite de produtividade empresarial",
    vendor: "Microsoft Corporation",
    installDate: "12/01/2024",
    lastUpdate: "18/05/2024",
    size: "3.8 GB",
    dependencies: [".NET Framework"],
    securityRating: "high",
  },
  {
    id: "soft-007",
    name: "Adobe Creative Suite",
    version: "2024.1.2",
    category: "productivity",
    status: "error",
    license: "Adobe Creative Cloud",
    installationId: "adobe-cc-2024-007",
    icon: "🎨",
    description: "Suite de design e criação",
    vendor: "Adobe Systems",
    installDate: "08/04/2024",
    lastUpdate: "Erro na atualização",
    size: "2.4 GB",
    dependencies: ["Visual C++ Redistributable"],
    securityRating: "medium",
  },
  {
    id: "soft-008",
    name: "Figma Desktop",
    version: "116.14.8",
    category: "productivity",
    status: "updated",
    license: "Figma Professional",
    installationId: "figma-2024-008",
    icon: "🎯",
    description: "Design colaborativo e prototipagem",
    vendor: "Figma Inc.",
    installDate: "25/03/2024",
    lastUpdate: "29/05/2024",
    size: "145 MB",
    dependencies: [],
    securityRating: "high",
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "development":
      return CodeBracketIcon;
    case "security":
      return ShieldCheckIcon;
    case "system":
      return CogIcon;
    case "productivity":
      return CloudArrowDownIcon;
    case "database":
      return CodeBracketIcon;
    default:
      return CogIcon;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "updated":
      return CheckCircleIcon;
    case "outdated":
      return ExclamationTriangleIcon;
    case "installing":
      return ArrowPathIcon;
    case "error":
      return XCircleIcon;
    default:
      return ClockIcon;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "updated":
      return "text-green-600 bg-green-100";
    case "outdated":
      return "text-yellow-600 bg-yellow-100";
    case "installing":
      return "text-blue-600 bg-blue-100";
    case "error":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "updated":
      return "Atualizado";
    case "outdated":
      return "Desatualizado";
    case "installing":
      return "Instalando";
    case "error":
      return "Erro";
    default:
      return "Desconhecido";
  }
};

const getCategoryText = (category: string) => {
  switch (category) {
    case "development":
      return "Desenvolvimento";
    case "security":
      return "Segurança";
    case "system":
      return "Sistema";
    case "productivity":
      return "Produtividade";
    case "database":
      return "Banco de Dados";
    default:
      return category;
  }
};

const getSecurityRatingColor = (rating: string) => {
  switch (rating) {
    case "high":
      return "text-green-600 bg-green-100";
    case "medium":
      return "text-yellow-600 bg-yellow-100";
    case "low":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getSecurityRatingText = (rating: string) => {
  switch (rating) {
    case "high":
      return "Alta";
    case "medium":
      return "Média";
    case "low":
      return "Baixa";
    default:
      return "N/A";
  }
};

export function Software() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredData = useMemo(() => {
    return mockSoftwareData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.version
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        item.installationId
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        item.vendor.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "all" || item.category === filterCategory;
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [debouncedSearchTerm, filterCategory, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: mockSoftwareData.length,
      updated: mockSoftwareData.filter((item) => item.status === "updated")
        .length,
      outdated: mockSoftwareData.filter((item) => item.status === "outdated")
        .length,
      installing: mockSoftwareData.filter(
        (item) => item.status === "installing"
      ).length,
      errors: mockSoftwareData.filter((item) => item.status === "error").length,
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Software</h1>
          <p className="mt-2 text-gray-600">
            Gerenciar aplicações e licenças de software
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Atualizar Tudo
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Buscar Atualizações
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CogIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Atualizados</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.updated}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Desatualizados
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.outdated}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Instalando</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.installing}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Erros</p>
              <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar software, versão, ID de instalação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas Categorias</option>
                <option value="development">Desenvolvimento</option>
                <option value="security">Segurança</option>
                <option value="system">Sistema</option>
                <option value="productivity">Produtividade</option>
                <option value="database">Banco de Dados</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos Status</option>
                <option value="updated">Atualizado</option>
                <option value="outdated">Desatualizado</option>
                <option value="installing">Instalando</option>
                <option value="error">Erro</option>
              </select>

              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="p-6">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((software) => {
                return (
                  <div
                    key={software.id}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="text-3xl mr-3">{software.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {software.name}
                          </h3>
                          <p className="text-gray-500 text-xs">
                            Versão {software.version}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FunnelIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Licença {software.license.split(" ")[0]}
                        </span>
                        <span className="text-xs text-gray-500">
                          Updte{" "}
                          {software.updateVersion
                            ? software.updateVersion.split(".")[1]
                            : software.version.split(".")[1]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Instalação {software.installationId.split("-")[2]}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            software.status
                          )}`}
                        >
                          {getStatusText(software.status)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-600">
                            {getCategoryText(software.category)}
                          </span>
                        </div>
                        {software.status === "outdated" && (
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                            Atualizar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Software
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Versão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Segurança
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamanho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Atualização
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((software) => {
                  const StatusIcon = getStatusIcon(software.status);
                  const CategoryIcon = getCategoryIcon(software.category);

                  return (
                    <tr key={software.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{software.icon}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {software.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {software.vendor}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {software.version}
                        </div>
                        {software.updateVersion && (
                          <div className="text-sm text-blue-600">
                            → {software.updateVersion}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CategoryIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {getCategoryText(software.category)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusIcon
                            className={`w-4 h-4 mr-2 ${
                              getStatusColor(software.status).split(" ")[0]
                            }`}
                          />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              software.status
                            )}`}
                          >
                            {getStatusText(software.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityRatingColor(
                            software.securityRating
                          )}`}
                        >
                          {getSecurityRatingText(software.securityRating)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {software.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {software.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {software.status === "outdated" && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              Atualizar
                            </button>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
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
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <CodeBracketIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum software encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termo de busca.
            </p>
          </div>
        )}

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando {filteredData.length} de {mockSoftwareData.length}{" "}
              softwares
            </div>
            <div className="text-sm text-gray-500">
              Última verificação: há 5 minutos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Software;
