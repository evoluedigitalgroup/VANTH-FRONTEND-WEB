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
  return cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export { formatarCNPJ, formatarTelefone, formatarCPF }