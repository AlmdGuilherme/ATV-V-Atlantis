import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient()

router.get("/clientes", async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        Endereco: true,
        Documentos: true,
        Dependentes: true
      }
    })
    return res.json(clientes)
  } catch (error) {
    return res.status(500).json({error: "Erro ao buscar clientes"})
  }
})


router.get('/cliente/:userDoc', async (req: Request, res: Response) => {
  const {userDoc} = req.params
  try {
    const cliente = await prisma.cliente.findFirst({
      where: {
        Documentos: {
          some: {
            numero: userDoc
          }
        }
      }, include: {
        Documentos: true,
        Endereco: true,
        Dependentes: true
      }
    })
    if (!cliente) {
      return res.status(404).json({error: "Cliente não econtrado!"})
    }
    return res.json(cliente)
  } catch (error) {
    return res.status(500).json({error: "Erro ao buscar cliente"})
  }
})

router.put('/cliente/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, nomeSocial, dataNascimento, tipo, endereco, documentos, dependentes, cpfTitular } = req.body;

  try {
    let responsavelId: number | null | undefined = undefined;

    if (tipo === 'Dependente' && cpfTitular) {
      const titularEncontrado = await prisma.cliente.findFirst({
        where: {
          Documentos: { some: { numero: cpfTitular } }
        }
      });

      if (!titularEncontrado) {
        return res.status(404).json({ error: "Titular responsável não encontrado com este CPF." });
      }
      responsavelId = titularEncontrado.id;
    } 
    else if (tipo === 'Titular') {
      responsavelId = null; 
    }

    const clienteAtualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nome,
        nomeSocial,
        tipo,
        dataNascimento: new Date(dataNascimento),
        responsavelId: responsavelId,
        
        Endereco: endereco ? {
          upsert: {
            create: {
              rua: endereco.rua,
              numero: endereco.numero,
              bairro: endereco.bairro,
              cidade: endereco.cidade,
              estado: endereco.estado,
              cep: endereco.cep
            },
            update: {
              rua: endereco.rua,
              numero: endereco.numero,
              bairro: endereco.bairro,
              cidade: endereco.cidade,
              estado: endereco.estado,
              cep: endereco.cep
            }
          }
        } : undefined,

        Documentos: documentos ? {
          deleteMany: {}, 
          create: documentos.map((doc: any) => ({
            tipo: doc.tipo,
            numero: doc.numero,
            dataEmissao: new Date(doc.dataEmissao || new Date())
          }))
        } : undefined,

        Dependentes: dependentes ? {
          deleteMany: {}, 
          create: dependentes.map((dep: any) => ({
            nome: dep.nome,
            nomeSocial: dep.nome, 
            tipo: "Dependente",
            dataNascimento: new Date(), 
          }))
        } : undefined
      }
    });

    return res.json({ message: "Cliente atualizado com sucesso!", cliente: clienteAtualizado });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar cliente." });
  }
});

router.delete('/cliente/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.cliente.delete({
      where: { id: Number(id) }
    });

    return res.json({ message: "Cliente excluído com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir cliente" });
  }
});

router.post('/cadastro-cliente', async (req: Request, res: Response) => {
  const { nome, nomeSocial, dataNascimento, tipo, endereco, documentos, dependentes, cpfTitular } = req.body;

  try {
    let responsavelId: number | undefined = undefined;

    if (tipo === 'Dependente' && cpfTitular) {
      const titularEncontrado = await prisma.cliente.findFirst({
        where: {
          Documentos: {
            some: {
              numero: cpfTitular
            }
          }
        }
      });

      if (!titularEncontrado) {
        return res.status(404).json({ error: "Titular não encontrado com o CPF informado." });
      }

      responsavelId = titularEncontrado.id;
    }

    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        nomeSocial,
        tipo,
        dataNascimento: new Date(dataNascimento),
        Responsavel: responsavelId ? {
          connect: { id: responsavelId }
        } : undefined,
        Endereco: endereco ? {
          create: {
            rua: endereco.rua,
            numero: endereco.numero,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
            cep: endereco.cep
          }
        } : undefined,
        Documentos: documentos && documentos.length > 0 ? {
          create: documentos.map((doc: any) => ({
            tipo: doc.tipo,
            numero: doc.numero,
            dataEmissao: new Date(doc.dataEmissao)
          }))
        } : undefined,
        Dependentes: dependentes && dependentes.length > 0 ? {
          create: dependentes.map((dep: any) => ({
            nome: dep.nome,
            tipo: "Dependente",
            dataNascimento: new Date(dep.dataNascimento)
          }))
        } : undefined
      }
    });

    return res.status(201).json({ 
      message: "Cadastro realizado com sucesso!", 
      cliente: novoCliente 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar cliente no sistema." });
  }
});

router.get('/acomodacoes', async(req: Request, res: Response) => {
  try{
    const acomodacoes = await prisma.acomodacoes.findMany({})
    return res.json(acomodacoes)
  } catch (error) {
    return res.status(500).json({error: "Erro ao buscar as acomodações"})
  }
})

router.post('/cadastro-acomodacao', async (req: Request, res: Response) => {
  const { nome, descricao, camaSolteiro, camaCasal, suites, garagem, climatizacao } = req.body;

  try {
    const novaAcomodacao = await prisma.acomodacoes.create({
      data: {
        nome,
        descricao,
        camaSolteiro: Number(camaSolteiro),
        camaCasal: Number(camaCasal),
        suites: Number(suites),
        garagem: Number(garagem),
        climatizacao: Boolean(climatizacao)
      }
    });

    return res.status(201).json({ 
      message: "Acomodação cadastrada com sucesso!", 
      acomodacao: novaAcomodacao 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar acomodação." });
  }
});

router.get('/hospedagens', async (req: Request, res: Response) => {
  try {
    const hospedagens = await prisma.hospedagem.findMany({
      include: {
        Acomodacao: true,
        Cliente: true
      }
    })
    return res.json(hospedagens)
  } catch (error) {
    return res.status(500).json({error: "Erro ao buscar hospedagens"})
  }
})

router.post('/cadastrar-hospedagem', async (req: Request, res: Response) => {
  const { clienteId, acomodacaoId, dataCheckin, dataCheckout } = req.body;
  try {
        if (!clienteId || !acomodacaoId || !dataCheckin || !dataCheckout) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const novaHospedagem = await prisma.hospedagem.create({
      data: {
        clienteId: Number(clienteId),       
        acomodacaoId: Number(acomodacaoId),
        dataCheckin: new Date(dataCheckin),
        dataCheckout: new Date(dataCheckout),
        status: 'ocupado' 
      }
    });
    return res.status(201).json({ 
      message: "Hospedagem registrada com sucesso!", 
      hospedagem: novaHospedagem 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao registrar hospedagem." });
  }
});

export {router}