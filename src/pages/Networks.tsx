export function Networks() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Redes</h1>
        <p className="text-gray-600 mt-2">
          Gerencie a infraestrutura de rede da arquitetura tecnológica
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Componentes de Rede
        </h2>
        <p className="text-gray-600">
          Esta seção permitirá o gerenciamento de switches, roteadores,
          firewalls e demais componentes da infraestrutura de rede.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">
            🚧 Funcionalidade em desenvolvimento
          </p>
        </div>
      </div>
    </div>
  );
}

export default Networks;
