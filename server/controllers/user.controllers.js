const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createStudent = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password' });
    }
    try {
        const student = await prisma.student.create({
            data: {
                email,
                firstName,
                lastName,
                password,
            },
        });
        res.status(201).json(student);
    } catch (error) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Email already exists' });
        }else {
            res.status(500).json({ error: 'Internal server error' });
            console.error(error);
        }
    }
}

const getStudent = async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}

const getStudentById = async (req, res) => {
    const  { id } = req.params;
    try {
        const student = await prisma.student.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
}



module.exports = { createStudent, getStudent };