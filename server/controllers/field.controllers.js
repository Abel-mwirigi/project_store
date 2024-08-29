const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createField = async (req, res) => {
    const { fieldName } = req.body;
    if (!fieldName) {
        return res.status(400).json({ error: 'Please provide field name' });
    }
    try {
        const field = await prisma.field.create({
            data: {
                fieldName,
            },
        });
        res.status(201).json(field);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const getField = async (req, res) => {
    try {
        const fields = await prisma.field.findMany();
        res.json(fields);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

module.exports = { createField, getField };