import express from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

// TODO: Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
app.get('/', protect, (req, res) => {
    res.status(200).json({ status: 'success', data: initiatives });
});
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router.route('/')
    .get(protect, (req, res) => {
        /* TODO: Add protect & handler */
        res.status(200).json({ status: 'success', data: initiatives });

    })
    .post(protect, (req, res) => {
        /* TODO: Add protect & handler */
        const { title, priority } = req.body;
        const newInitiative = { id: initiatives.length + 1, title, priority, status: 'Active' };
        initiatives.push(newInitiative);
        res.status(201).json({ status: 'success', data: newInitiative });
    });

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router.route('/:id')
    .get(protect, (req, res) => {
        /* TODO: Add protect & handler */
        const initiative = initiatives.find((i) => i.id === parseInt(req.params.id));
        if (!initiative) {
            return res.status(404).json({ status: 'fail', message: 'Initiative not found' });
        }
        res.status(200).json({ status: 'success', data: initiative });
    })
    .delete(protect, requireAdmin, (req, res) => {
        /* TODO: Add protect + requireAdmin & handler */
        const initiativeIndex = initiatives.findIndex((i) => i.id === parseInt(req.params.id));
        if (initiativeIndex === -1) {
            return res.status(404).json({ status: 'fail', message: 'Initiative not found' });
        }
        initiatives.splice(initiativeIndex, 1);
        res.status(200).json({ status: 'success', message: 'Initiative deleted successfully' });
    });

export default router;
