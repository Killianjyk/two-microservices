import React, {useState, useEffect } from 'react';

function ShoeForm() {
    const [bins1, setBins] = useState([])
    const [formData, setFormData] = useState({
        manufacturer: '',
        model_name: '',
        color: '',
        bins: ''
    })

    const getData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const shoeURL = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(shoeURL, fetchConfig);

        if (response.ok) {
            setFormData({
                manufacturer: '',
                model_name: '',
                color: '',
                bin: ''
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }



    useEffect(()=> {
        getData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new shoe</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input value={formData.name} onChange={handleFormChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="name">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.fabric} onChange={handleFormChange} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control" />
                            <label htmlFor="fabric">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleFormChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.bins1} onChange={handleFormChange} required name="bins" id="bins" className="form-select">
                            <option value="">Choose a bin</option>
                            {bins1.map(bin => {
                                return (
                                <option key={bin.id} value={bin.href}>
                                    {bin.closet_name}
                                </option>
                                );
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShoeForm;
