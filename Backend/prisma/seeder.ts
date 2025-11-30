import { PrismaClient, TipoDocumento, StatusHospedagem } from "@prisma/client";
import clients_data from '../src/data/clientes.json';

const prisma = new PrismaClient();

const acomodacoes_data = [
  { nome: "Casal Simples", camaSolteiro: 0, camaCasal: 1, suites: 1, climatizacao: true, garagem: 1, descricao: "Ideal para casais." },
  { nome: "Família Simples", camaSolteiro: 2, camaCasal: 1, suites: 1, climatizacao: true, garagem: 1, descricao: "Confortável para pequenas famílias." },
  { nome: "Família Mais", camaSolteiro: 5, camaCasal: 1, suites: 2, climatizacao: true, garagem: 2, descricao: "Espaço amplo." },
  { nome: "Família Super", camaSolteiro: 6, camaCasal: 2, suites: 3, climatizacao: true, garagem: 2, descricao: "Para grandes grupos." },
  { nome: "Solteiro Simples", camaSolteiro: 1, camaCasal: 0, suites: 1, climatizacao: true, garagem: 0, descricao: "Econômico." },
  { nome: "Solteiro Mais", camaSolteiro: 0, camaCasal: 1, suites: 1, climatizacao: true, garagem: 1, descricao: "Conforto individual." }
];

async function main() {
  console.log('Iniciando Banco de Dados...');

  try {
    await prisma.hospedagem.deleteMany({});
    await prisma.documento.deleteMany({});
    await prisma.endereco.deleteMany({});
    await prisma.cliente.deleteMany({});
    await prisma.acomodacoes.deleteMany({});
    console.log("Remoção dos dados existentes concluída!");
  } catch (error) {
    console.log(`Erro na limpeza: ${error}`);
  }

  for (const client of clients_data) {
    try {
      await prisma.cliente.create({
        data: {
          nome: client.nome,
          nomeSocial: client.nomeSocial,
          tipo: client.tipo,
          dataNascimento: new Date(client.dataNascimento),
          Endereco: client.endereco ? { create: client.endereco } : undefined,
          Documentos: {
            create: client.documentos.map((doc: any) => ({
              tipo: doc.tipo as TipoDocumento,
              numero: doc.numero,
              dataEmissao: new Date(doc.dataEmissao),
              dataValidade: doc.dataValidade ? new Date(doc.dataValidade) : null
            }))
          },
          Dependentes: {
            create: client.dependentes.map((dep: any) => ({
              nome: dep.nome,
              nomeSocial: dep.nomeSocial || dep.nome,
              tipo: "Dependente",
              dataNascimento: new Date(dep.dataNascimento),
              Documentos: {
                create: dep.documentos ? dep.documentos.map((docDep: any) => ({
                  tipo: docDep.tipo as TipoDocumento,
                  numero: docDep.numero,
                  dataEmissao: new Date(docDep.dataEmissao),
                  dataValidade: docDep.dataValidade ? new Date(docDep.dataValidade) : null
                })) : []
              }
            }))
          }
        }
      });
    } catch (error) {
      console.error(`Erro ao criar cliente ${client.nome}: ${error}`);
    }
  }
  console.log("Clientes inseridos.");

  await prisma.acomodacoes.createMany({
    data: acomodacoes_data
  });
  console.log("Acomodações inseridas.");

  const clienteTeste = await prisma.cliente.findFirst();
  const quartoTeste = await prisma.acomodacoes.findFirst({ where: { nome: "Casal Simples" } });

  if (clienteTeste && quartoTeste) {
    await prisma.hospedagem.create({
      data: {
        clienteId: clienteTeste.id,
        acomodacaoId: quartoTeste.id,
        dataCheckin: new Date(),
        dataCheckout: new Date(new Date().setDate(new Date().getDate() + 5)),
        status: StatusHospedagem.ocupado
      }
    });
    console.log("Hospedagem de teste criada.");
  }

  console.log('Seed finalizado com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });