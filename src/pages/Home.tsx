import {
  ChartBarIcon,
  CircleStackIcon,
  CommandLineIcon,
  CpuChipIcon,
  ServerIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const mockData = {
  systemMetrics: [
    {
      label: "Sistema Operacional",
      value: "0.50%",
      color: "blue",
      description: "Ubuntu Server Nominal",
    },
    {
      label: "Sistema de Desenvolvimento",
      value: "230%",
      color: "blue",
      description: "Stream System Nominal",
    },
    {
      label: "Virtualização",
      value: "17.30%",
      color: "green",
      description: "VM Operacional",
    },
  ],
  chartData: [
    { month: "Jan", value: 2800 },
    { month: "Fev", value: 3200 },
    { month: "Mar", value: 2900 },
    { month: "Abr", value: 3400 },
    { month: "Mai", value: 3800 },
    { month: "Jun", value: 3600 },
    { month: "Jul", value: 4200 },
    { month: "Ago", value: 3900 },
    { month: "Set", value: 4100 },
    { month: "Out", value: 4400 },
    { month: "Nov", value: 4000 },
    { month: "Dez", value: 4600 },
  ],
  infrastructureStats: {
    servers: 24,
    databases: 8,
    applications: 156,
    networkDevices: 32,
  },
};

export function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Boas vindas!
            </h1>
            <p className="text-gray-600 mb-8">
              Gestão de Infraestrutura Tecnológica
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Resumo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockData.systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-${metric.color}-500 flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-sm">
                        {metric.value}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <p className="text-xs text-gray-500">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Resumo
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <ServerIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {mockData.infrastructureStats.servers}
                  </p>
                  <p className="text-sm text-gray-600">Servidores</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <CircleStackIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {mockData.infrastructureStats.databases}
                  </p>
                  <p className="text-sm text-gray-600">Bancos de Dados</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <CommandLineIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {mockData.infrastructureStats.applications}
                  </p>
                  <p className="text-sm text-gray-600">Aplicações</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <WifiIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {mockData.infrastructureStats.networkDevices}
                  </p>
                  <p className="text-sm text-gray-600">Dispositivos de Rede</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-96">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-4">
                Visão Geral do Dashboard
              </h3>
              <p className="text-blue-100 text-sm mb-6">
                Desempenho da Infraestrutura
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-blue-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memória</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-blue-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Armazenamento</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-blue-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rede</span>
                    <span>34%</span>
                  </div>
                  <div className="w-full bg-blue-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: "34%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">
                  Gráfico de Desempenho Mensal
                </h4>
                <div className="flex items-end space-x-1 h-20">
                  {mockData.chartData.map((data, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-30 rounded-t"
                      style={{
                        height: `${(data.value / 5000) * 100}%`,
                        width: "100%",
                      }}
                      title={`${data.month}: ${data.value}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Status dos Sistemas
            </h3>
            <CpuChipIcon className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Servidores Web</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Online
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Banco de Dados</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Online
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sistema de Backup</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Manutenção
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Firewall</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Online
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Alertas Recentes
            </h3>
            <ChartBarIcon className="w-6 h-6 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">Uso de CPU elevado</p>
                <p className="text-xs text-gray-500">Servidor-01 • há 15 min</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">Backup programado</p>
                <p className="text-xs text-gray-500">BD-Principal • há 1h</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">Atualização concluída</p>
                <p className="text-xs text-gray-500">Sistema • há 2h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Acesso Rápido
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={ROUTES.HARDWARE}
              className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
            >
              <ServerIcon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <span className="text-xs text-blue-800">Hardware</span>
            </Link>
            <Link
              to={ROUTES.SOFTWARE}
              className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
            >
              <CommandLineIcon className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <span className="text-xs text-purple-800">Software</span>
            </Link>
            <Link
              to={ROUTES.DATABASE}
              className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
            >
              <CircleStackIcon className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <span className="text-xs text-green-800">Bancos</span>
            </Link>
            <Link
              to={ROUTES.NETWORKS}
              className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors"
            >
              <WifiIcon className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <span className="text-xs text-orange-800">Redes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
