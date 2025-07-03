import { useState } from "react";
import styles from './Form.module.css'

const Formulario = () => {

    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [resultado, setResultado] = useState('');
    const [faixaAtiva, setFaixaAtiva] = useState('');

    const mostraResultado = (e) => {
        e.preventDefault();

        const alturaEmMetros = parseFloat(altura);
        const pesoEmKg = parseFloat(peso);

        if (!alturaEmMetros || !pesoEmKg) {
            setResultado('Por favor, preencha todos os campos corretamente!');
            setFaixaAtiva('');
            return;
        }

        const alturaAoQuadrado = altura ** 2;
        const resultadoDoImc = peso / alturaAoQuadrado;

        let classificacao = '';
        let faixa = '';

        if (resultadoDoImc < 18.5) {
            classificacao = 'Abaixo do peso';
            faixa = 'abaixo';
        } else if (resultadoDoImc < 25) {
            classificacao = 'Peso normal';
            faixa = 'normal';
        } else if (resultadoDoImc < 30) {
            classificacao = 'Sobrepeso';
            faixa = 'sobrepeso';
        } else if (resultadoDoImc < 35) {
            classificacao = 'Obesidade grau I';
            faixa = 'obesidade1';
        } else if (resultadoDoImc < 40) {
            classificacao = 'Obesidade grau II';
            faixa = 'obesidade2';
        } else {
            classificacao = 'Obesidade grau III';
            faixa = 'obesidade3';
        }


        setResultado(`O valor do seu IMC é de ${resultadoDoImc.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} - ${classificacao}`);

        setFaixaAtiva(faixa);
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

            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Classificação</th>
                        <th>IMC (kg/m²)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={faixaAtiva === 'abaixo' ? styles.ativo : ''}>
                        <td>Abaixo do peso</td>
                        <td>Menor que 18,5</td>
                    </tr>
                    <tr className={faixaAtiva === 'normal' ? styles.ativo : ''}>
                        <td>Peso normal</td>
                        <td>18,5 a 24,9</td>
                    </tr>
                    <tr className={faixaAtiva === 'sobrepeso' ? styles.ativo : ''}>
                        <td>Sobrepeso</td>
                        <td>25,0 a 29,9</td>
                    </tr>
                    <tr className={faixaAtiva === 'obesidade1' ? styles.ativo : ''}>
                        <td>Obesidade grau I</td>
                        <td>30,0 a 34,9</td>
                    </tr>
                    <tr className={faixaAtiva === 'obesidade2' ? styles.ativo : ''}>
                        <td>Obesidade grau II</td>
                        <td>35,0 a 39,9</td>
                    </tr>
                    <tr className={faixaAtiva === 'obesidade3' ? styles.ativo : ''}>
                        <td>Obesidade grau III</td>
                        <td>40,0 ou mais</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

export default Formulario;