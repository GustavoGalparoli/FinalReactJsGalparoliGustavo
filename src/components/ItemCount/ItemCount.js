import './ItemCount.css'   
    
    const ItemCount = ({setCount}) => {
        const addItem = () => {
            setCount((currentValue) => currentValue + 1)
        };
        const removeItem = () => {
            setCount((currentValue) => {
                if(currentValue > 1){
                    return currentValue - 1;
                } else{
                    return currentValue
                }
            });
        };
        return(
        <div>
            <button className='btn btn-primary boton' onClick={removeItem}>Quitar</button>
            <button className='btn btn-primary boton' onClick={addItem}>Agregar</button>
        </div> 
        );
    };

    export default ItemCount;