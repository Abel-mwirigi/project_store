const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFile = async (req, res) => {
    const { fileName, fileUrl, fileType, fileImage, fileSize, projectId } = req.body;
    if (!fileName || !fileUrl || !projectId) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    try {
        const file = await prisma.file.create({
            data: {
                fileName,
                fileUrl,
                fileType,
                fileImage,
                fileSize: parseInt(fileSize),
                projectId: parseInt(projectId),
            },
        });
        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const getFile = async (req, res) => {
    try {
        const files = await prisma.file.findMany();
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const getFileById = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.json(file);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

module.exports = { createFile, getFile, getFileById };