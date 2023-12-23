import express from 'express';
import { getEmployee, createEmployee, getEmployees, updateEmployee, deleteEmployee, getManagers, managers_ratio} from "../controllers/employeeController.js";

const router = express.Router();

router.post('/', createEmployee);
router.get('/managers_ratio', managers_ratio);
router.get('/managers', getManagers);
router.get('/:filter', getEmployees);
router.get('/byId/:employeeId', getEmployee);
router.put('/:employeeId', updateEmployee);
router.delete('/:employeeId', deleteEmployee);

export default router;