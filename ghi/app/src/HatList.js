import React, {useEffect, useState} from 'react';

function HatList() {
    const [hats, setHats] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/hats/');
        if (response.ok) {
            const data = await response.json();
            setHats(data.hats)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    const handleDelete = async (hat) => {
        try {
            const response = await fetch(`http://localhost:8090/api/hats/${hat.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedHats = hats.filter((h) => h.id !== hat.id);
                setHats(updatedHats);
            } else {
                throw new Error(`Failed to delete hat ${hat.id}`);
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Hat style</th>
                    <th>Fabric</th>
                    <th>Color</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    const { closet_name, section_number, shelf_number } = hat.location;
                    return (
                        <tr key={hat.href}>
                            <td>{ hat.name }</td>
                            <td>{ hat.fabric }</td>
                            <td>{ hat.color }</td>
                            <td>{`${closet_name}, section ${section_number}, shelf ${shelf_number}`}</td>
                            <td>
                                <button onClick={() => handleDelete(hat)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatList;
