const formatarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const formatarTelefone = (telefone) => {
  telefone = telefone.replace(/\D/g, '');
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

const formatarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '');
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

const formatarHorario = (isoString) => {
  const date = new Date(isoString);

  const pad = (num) => num.toString().padStart(2, '0');

  const dia = pad(date.getDate());
  const mes = pad(date.getMonth() + 1); // Os meses são baseados em zero, então somamos 1
  const ano = date.getFullYear();

  const horas = pad(date.getHours());
  const minutos = pad(date.getMinutes());
  const segundos = pad(date.getSeconds());

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
};



export { formatarCNPJ, formatarTelefone, formatarCPF, formatarHorario }