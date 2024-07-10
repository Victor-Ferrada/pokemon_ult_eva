function Saludo(props){
    return(
        <div>
        <h1>Hola</h1>
        <h1>Como Estas {props.nombre} {props.apellido}?</h1>
        </div>
        
    )
}
export default Saludo;