import Employee from '../models/employee.js';
import Salary from "../models/salary.js";
export const createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId).populate('manager');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.employeeId, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const managers = await Employee.find().limit(50);
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.employeeId);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find( { "manager": { $ne: null } }).limit(15);
        employees.sort((a, b) => b.left - a.left);
        const allEmployees = await Employee.find({'reason': 'satisfaction_level'});
        allEmployees.forEach((async employee => {
            await Employee.findByIdAndUpdate(employee._id, {'reason': 'Niveau de satisfaction faible'});
        }));
        const salaryData = await Promise.all(
            employees.map(async (employee) => {
                const salary = await Salary.findOne({ title: employee.jobTitle });

                let salaryStatus = 'Correctement rémunéré';
                if (salary) {
                    if (employee.monthly_income < salary.min) {
                        salaryStatus = 'Insuffisamment rémunéré';
                    } else if (employee.monthly_income > salary.max) {
                        salaryStatus = 'Excessivement rémunéré';
                    }
                } else {
                    salaryStatus = 'salaire non renseigné';
                }

                return { ...employee.toObject(), salary_status: salaryStatus };
            })
        );

        res.json(salaryData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getManagers = async (req, res) => {
    try {
        const employees = await Employee.find({ "manager":null }).limit(50);
        employees.sort((a, b) => b.left - a.left);
        const allEmployees = await Employee.find({'reason': 'satisfaction_level'});
        allEmployees.forEach((async employee => {
            await Employee.findByIdAndUpdate(employee._id, {'reason': 'Niveau de satisfaction faible'});
        }));
        const salaryData = await Promise.all(
            employees.map(async (employee) => {
                const salary = await Salary.findOne({ title: employee.jobTitle });

                let salaryStatus = 'Correctement rémunéré';
                if (salary) {
                    if (employee.monthly_income < salary.min) {
                        salaryStatus = 'Insuffisamment rémunéré';
                    } else if (employee.monthly_income > salary.max) {
                        salaryStatus = 'Excessivement rémunéré';
                    }
                } else {
                    salaryStatus = 'salaire non renseigné';
                }

                return { ...employee.toObject(), salary_status: salaryStatus };
            })
        );

        res.json(salaryData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const managers_ratio = async (req, res) => {
    const managers = await Employee.find({ manager: null });
    const all_employee = await Employee.find();
    var avg_left = 0;
    all_employee.forEach(employee => {
        avg_left += employee.left;
    });
    avg_left /= all_employee.length;
    console.log(avg_left);
    let data = []; // This will hold the ratios
    for (const manager of managers) {
        const employees = await Employee.find({ manager: manager._id });
        let average_left_for_employees = 0;
        if (employees.length > 0) {
            employees.forEach(employee => {
                average_left_for_employees += 1-employee.left;
            });
            average_left_for_employees /= employees.length;
        }
        data.push(average_left_for_employees.toFixed(2));
    }
    res.json({ name: "ratios", data: data , managers: managers.map(manager => manager.firstName + " " + manager.lastName)});
};
