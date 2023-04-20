import React, {useState, useEffect } from 'react';

function HatForm() {
    const [locations, setLocations] = useState([])
    const [formData, setFormData] = useState({
        fabric: '',
        name: '',
        color: '',
        location: '',
    })

    const getData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
            console.log(data.locations)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const hatURL = 'http://localhost:8090/api/hats/';
        console.log(formData)
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(hatURL, fetchConfig);

        if (response.ok) {
            setFormData({
                fabric: '',
                name: '',
                color: '',
                location: ''
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
                    <h1>Create a new hat</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input value={formData.name} onChange={handleFormChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.fabric} onChange={handleFormChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleFormChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.location} onChange={handleFormChange} required name="location" id="location" className="form-select">
                            <option value="">Choose a location</option>
                            {locations.map(location => {
                                return (
                                <option key={location.id} value={location.href}>
                                    {location.closet_name} - {location.section_number} - {location.shelf_number}
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

export default HatForm;
