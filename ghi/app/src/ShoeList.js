import { useEffect, useState } from 'react';

function ShoeList() {
    const [shoes,setShoes] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');

        if (response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    const handleDelete = async (shoe) => {
        try {
            const response = await fetch(`http://localhost:8080/api/shoes/${shoe.id}`,{
                method: 'DELETE',
            });
            console.log(response)
            if (response.ok) {
                const updatedShoes = shoes.filter((s) => s.id !== shoe.id);
                setShoes(updatedShoes);
            } else {
                throw new Error('Failed to delete shoe ${shoe.id)');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>manufacturer</th>
                    <th>model name</th>
                    <th>color</th>
                    <th>bins</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map(shoe => {
                    return (
                        <tr key={shoe.href}>
                            <td>{ shoe.manufacturer }</td>
                            <td>{ shoe.model_name }</td>
                            <td>{ shoe.color }</td>
                            <td>{ shoe.bins }</td>
                            <td>
                                <button onClick={() => handleDelete(shoe)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <a href="/shoes/new">Add new shoe</a>
        </>
    );
}

export default ShoeList;
