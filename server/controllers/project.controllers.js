const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProject = async (req, res) => {
    const { title, description, studentId, fieldId } = req.body;
    if (!title || !studentId || !fieldId) {
        return res.status(400).json({ error: 'Please provide title, description, and userId' });
    }
    try {
        const project = await prisma.project.create({
            data: {
                title,
                description,
                studentId: parseInt(studentId),
                fieldId: parseInt(fieldId),
            },
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const getProject = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                student: true,
                field: true,
                files: true,
            },
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                student: true,
                field: true,
                files: true,
            },
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, studentId, fieldId } = req.body;
    try {
        const project = await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
                studentId: parseInt(studentId),
                fieldId: parseInt(fieldId),
            },
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

module.exports = { createProject, getProject, getProjectById, updateProject };