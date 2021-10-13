const KEYS = {
    employeeID: 'employeeID',       // next available ID
    employees: 'employees'          // array of employee
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
    { id: '5', title: 'Ventas' },
    { id: '6', title: 'Gerencia' }
])

export function insertEmployee(data) {
    let employees = getAllEmployees();
    data['id'] = generateEmployeeID()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function updateEmployee(data) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex(x => x.id == data.id)
    employees[recordIndex] = {...data}
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function generateEmployeeID() {
    if (localStorage.getItem(KEYS.employeeID) == null)
        localStorage.setItem(KEYS.employeeID, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeID))
    localStorage.setItem(KEYS.employeeID, (++id).toString())
    return id;
}

export function getAllEmployees() {
    /* if empty insert empty array */
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    let employees =  JSON.parse(localStorage.getItem(KEYS.employees));
    let departments = getDepartmentCollection();
    // resolve department name istead of ID
    return employees.map(x => ({
        ...x,
        department: departments[x.departmentID-1].title
    }))
}
