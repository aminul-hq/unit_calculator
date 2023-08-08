import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

const unitTable = [
    {
        min: 0,
        max: 75,
        unitPrice: 3.70
    }, {
        min: 76,
        max: 200,
        unitPrice: 5.45
    }, {
        min: 201,
        max: 300,
        unitPrice: 5.70
    }, {
        min: 301,
        max: 400,
        unitPrice: 6.00
    }, {
        min: 401,
        max: 600,
        unitPrice: 9.30
    }
]

const dataCalculation = (data) => {
    switch (data.unit >= 0) {
        case (data.unit >= unitTable[0].min && data.unit <= unitTable[0].max):
            data.price = (data.unit * unitTable[0].unitPrice);
            data.unitPrice = unitTable[0].unitPrice;
            return data;
        case (data.unit >= unitTable[1].min && data.unit <= unitTable[1].max):
            data.price = (((data.unit - 75) * unitTable[1].unitPrice) + (75 * unitTable[0].unitPrice));
            data.unitPrice = unitTable[1].unitPrice;
            return data;
        case (data.unit >= unitTable[2].min && data.unit <= unitTable[2].max):
            data.price = (((data.unit - 200) * unitTable[2].unitPrice) + (125 * unitTable[1].unitPrice) + (75 * unitTable[0].unitPrice));
            data.unitPrice = unitTable[2].unitPrice;
            return data;
        case (data.unit >= unitTable[3].min && data.unit <= unitTable[3].max):
            data.price = (((data.unit - 300) * unitTable[3].unitPrice) + (100 * unitTable[2].unitPrice) + (125 * unitTable[1].unitPrice) + (75 * unitTable[0].unitPrice));
            data.unitPrice = unitTable[3].unitPrice;
            return data;
        case (data.unit >= unitTable[4].min && data.unit <= unitTable[4].max):
            data.price = (((data.unit - 400) * unitTable[4].unitPrice) + (100 * unitTable[3].unitPrice) + (100 * unitTable[2].unitPrice) + (125 * unitTable[1].unitPrice) + (75 * unitTable[0].unitPrice));
            data.unitPrice = unitTable[4].unitPrice;
            return data;
        default:
            return data;
    }
}

export default function Calculator() {
    const [month, setMonth] = useState("");
    const [unit, setUnit] = useState("");
    const [tableData, setTableData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = dataCalculation({
            "month": month,
            "unit": parseInt(unit),
            "unitPrice": 0,
            "price": 0,
        })
        setTableData(prevState => [...prevState, data])
        setMonth("");
        setUnit("");
        localStorage.setItem("calculate", JSON.stringify(tableData));
    }

    const handleClear = (e) => {
        e.preventDefault();
        localStorage.removeItem("calculate");
        setTableData([])
    }
    useEffect(() => {
        const fetchData = () => {
            setTableData(JSON.parse(localStorage.getItem("calculate"))?JSON.parse(localStorage.getItem("calculate")) : []);
        }
        fetchData();
    }, [])
    return (
        <div className="container">
            <h1 className="my-3">Calculator</h1>
            <div className="container small-container">
                <div className="container container-sm">
                    <Form>
                        <Form.Group className="mb-3" controlId="month">
                            <Form.Label>Month Name</Form.Label>
                            <Form.Control
                                value={month}
                                onChange={(e) =>
                                    setMonth(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="unit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                                value={unit}
                                type="number"
                                onChange={(e) =>
                                    setUnit(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Button className="m-3" type="button" variant="light" onClick={handleSubmit}>
                                Add To Table
                            </Button>
                            <Button className="m-3" type="button" variant="danger" onClick={handleClear}>
                                Clear
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="container container-sm">
                    <div className="container align-content-sm-center">
                        <Table className="table" bordered hover>
                            <thead>
                            <tr>
                                <th>Unit</th>
                                <th>Unit Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {unitTable.map((data) => (
                                <tr>
                                    <td>{data.min} - {data.max}</td>
                                    <td>{(data.unitPrice).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="container align-content-sm-center mt-4">
                <Table className="table" bordered hover>
                    <thead>
                    <tr>
                        <th><strong>Month Name</strong></th>
                        <th><strong>Unit</strong></th>
                        <th><strong>Unit Price</strong></th>
                        <th><strong>Price</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data) => (
                        <tr>
                            <td>{data.month}</td>
                            <td>{data.unit}</td>
                            <td>{(data.unitPrice).toFixed(2)}</td>
                            <td>{(data.price).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3}><strong>Total</strong></td>
                        <td>{(tableData.reduce((a, b) => a = a + b.price, 0)).toFixed(2)}</td>
                    </tr>
                    </tfoot>
                </Table>
            </div>
        </div>

    )
}