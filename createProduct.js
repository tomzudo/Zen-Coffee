import prisma from './lib/prisma';

async function createProduct() {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: 'Produto Exemplo',
                description: 'Descrição do Produto Exemplo',
                price: 50.0,
            },
        });

        console.log('Produto criado:', newProduct);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
    } finally {
        await prisma.$disconnect();  
    }
}

createProduct();
