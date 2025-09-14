export default function TestPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Teste de Funcionamento</h1>
      <p>Se você está vendo esta página, o servidor está funcionando.</p>
      <p>Data/Hora: {new Date().toLocaleString()}</p>
    </div>
  );
}
