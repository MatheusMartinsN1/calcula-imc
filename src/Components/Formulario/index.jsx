import { useState } from "react";
import styles from './Form.module.css'

const Formulario = () => {

    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [resultado, setResultado] = useState('');

    const mostraResultado = (e) => {
        e.preventDefault();

        const alturaEmMetros = parseFloat(altura);
        const pesoEmKg = parseFloat(peso);

        if (!alturaEmMetros || !pesoEmKg) {
            setResultado('Por favor, preencha todos os campos corretamente!');
            return;
        }

        const alturaAoQuadrado = altura ** 2;
        const resultadoDoImc = peso / alturaAoQuadrado;

        setResultado(`O valor do seu IMC é de ${resultadoDoImc.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`);

    }

    return (
        <main className={styles.container}>
            <h1 className={styles.titulo}>Calcule seu IMC</h1>

            <form className={styles.form}>

                <div className={styles.formItem}>
                    <label htmlFor="peso">Peso <small> (kg) </small> :</label>
                    <input
                        id="peso"
                        type="number"
                        placeholder="Exemplo: 60,5"
                        onChange={evento => setPeso(evento.target.value)}
                    />
                </div>

                <br />

                <div className={styles.formItem}>
                    <label htmlFor="altura">Altura <small> (m) :</small></label>
                    <input
                        id="altura"
                        type="number"
                        placeholder="Exemplo: 1,80"
                        onChange={evento => setAltura(evento.target.value)}
                    />
                </div>

                <button className={styles.botao} type="submit" onClick={mostraResultado}>Calcular</button>
            </form>

            <p className={styles.resultado}>{resultado}</p>
        </main>
    )
}

export default Formulario;