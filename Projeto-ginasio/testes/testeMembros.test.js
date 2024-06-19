const request = require('supertest');
const app = require('../app.js');
const syncDatabase = require('../util/syncDatabase.js')

beforeAll(async () => {
    await syncDatabase(); // Chamada assíncrona para sincronizar as tabelas antes de iniciar os testes
});

describe('Testes das Rotas de Membros', () => {
    it('Obter todos os membros', async () => {
        const res = await request(app).get('/membros');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true); // Verifica se o corpo da resposta é um array
    });

    it('Obter um membro por ID', async () => {
        // Supondo que o ID 1 existe no seu banco de dados
        const res = await request(app).get('/membros/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        
    });
    
    // Teste para criar um membro
    it('Criar um novo membro', async () => {
    const novoMembro = {
        nome: 'Novo Membro',
        email: 'novo@membro.com',
        sobrenome:'menbro novo',
        
    };
    const res = await request(app)
        .post('/membros')
        .send(novoMembro);
        expect(res.statusCode).toEqual(201); // Espera-se que a criação seja bem-sucedida
        expect(res.body).toHaveProperty('id'); // Verifica se o novo membro tem um ID atribuído 
        expect(res.body.nome).toEqual(novoMembro.nome);
    });

    // Teste para atualizar um membro existente  
    it('Atualizar um membro existente', async () => {
    const membroAtualizado = {
        nome: 'Novo Nome do Membro',
        
    };
    const res = await request(app)
        .put('/membros/1') // Supondo que o ID 1 corresponde a um membro existente
        .send(membroAtualizado);
    expect(res.statusCode).toEqual(200); // Espera-se que a atualização seja bem-sucedida
    expect(res.body).toHaveProperty('nome', 'Novo Nome do Membro'); // Verifica se o nome foi atualizado corretamente
    });

    // Teste para excluir um membro existente pelo ID
    it('Excluir um membro existente pelo ID', async () => {
    const res = await request(app)
        .delete('/membros/1'); // Supondo que o ID 1 corresponde a um membro existente
    expect(res.statusCode).toEqual(204); // Espera-se que a exclusão seja bem-sucedida e não haja conteúdo para retornar
    });

});

describe('Testes das Rotas de Funcionários', () => {
    // Teste para obter todos os funcionários
    it('Obter todos os funcionários', async () => {
        const res = await request(app).get('/funcionarios');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Teste para excluir um funcionário existente
    it('Excluir um funcionário existente', async () => {
        const res = await request(app).delete('/funcionarios/1'); // Supondo que o ID 1 exista
        expect(res.statusCode).toEqual(204);
    });
});

describe('Testes das Rotas de Aulas', () => {
    // Teste para obter todas as aulas
    it('Obter todas as aulas', async () => {
        const res = await request(app).get('/aulas');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Teste para excluir uma aula existente
    it('Excluir uma aula existente', async () => {
        const res = await request(app).delete('/aulas/1'); // Supondo que o ID 1 exista
        expect(res.statusCode).toEqual(204);
    });
});

describe('Testes das Rotas de Pagamentos', () => {
    // Teste para obter todos os pagamentos
    it('Obter todos os pagamentos', async () => {
        const res = await request(app).get('/pagamentos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Teste para excluir um pagamento existente
    it('Excluir um pagamento existente', async () => {
        const res = await request(app).delete('/pagamentos/1'); // Supondo que o ID 1 exista
        expect(res.statusCode).toEqual(204);
    });
});


/*
afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco de dados após a conclusão dos testes
});
*/
