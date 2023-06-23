import React, { useState } from 'react';
import './Dashboard.css';

const prizes = ['1', '2', '3', '4', '5'];

export default function Dashboard({ saldo, setSaldo, setToken }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [amount, setAmount] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [valorApostado, setValorApostado] = useState(0)

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  function handleButtonClick(prize) {
    setSelectedButton(prize);
  }

  const handleBetClick = () => {
    var saldoNovo = saldo - amount
    if (saldoNovo > 0) {
      setSaldo(saldoNovo)
      setValorApostado(amount)
      setValorApostado(valorApostado > 0 ? parseInt(valorApostado) + parseInt(amount) : parseInt(amount))
    } else {
      alert("Saldo insuficiente")
    }
  };

  const spin = () => {
    if(valorApostado > 0){
      setResultado(null)
      setIsSpinning(true);
      setSelectedPrize(null);
      const randomIndex = Math.floor(Math.random() * prizes.length);
      let i = 0;
      let timer;
      function startSpinning() {
        timer = setTimeout(() => {
          setSelectedPrize(prizes[i]);
          console.log(i);
          if (i !== 4) {
            i++;
          } else {
            i = 0;
          }
          if (i < 5) {
            startSpinning();
          }
        }, 100);
      }
      startSpinning();
      setTimeout(() => {
        clearTimeout(timer);
        setSelectedPrize(prizes[randomIndex]);
        setIsSpinning(false);
        setResultado(selectedButton === randomIndex + 1 ? true : false)
      }, 5000);
    }else{
      alert("Coloque uma quantia!")
    }
    
  };

  return (
    <div className="container">
      <div className="column">
        <h2 className="title-game-list">Jogos de Aposta</h2>
        <p className='select'>Roleta</p>
        <p className='item'>Poker</p>
        <p className='item'>Blackjack</p>
        <p className='item'>Bacará</p>
        <p className='item'>Caça-níqueis</p>
        <button className="logout-button" onClick={() => setToken(null)}>Deslogar</button>
      </div>
      <div className="column column-expanded">
        {resultado != null &&
          <span className={resultado ? "alert-resultado-vitoria" : "alert-resultado-derrota"}>Você {resultado ? "Ganhou" : "Perdeu"}</span>
        }
        <h1>Numero da Sorte</h1>
        <div className="roulette-container">
          <div className={`roulette ${isSpinning ? 'spinning' : ''}`}>
            {prizes.map((prize, index) => (
              <div className={`slot ${selectedPrize === prize ? 'selected' : ''}`} key={index}>
                {prize}
              </div>
            ))}
          </div>
        </div>
        <button onClick={spin} disabled={isSpinning}>
          Girar
        </button>
        {selectedButton != null &&
          <div class="number">
            {selectedButton}
          </div>
        }
        {valorApostado > 0 &&
          <>
            <h1 className="title">Escolha um numero</h1>
            <div className="number-container">
              <div className={`roulette ${isSpinning ? 'spinning' : ''}`}>
                {prizes.map((prize, index) => (
                  <button
                    className={`slot-choose ${selectedButton === prize ? 'selected-number' : ''}`}
                    key={index}
                    onClick={() => handleButtonClick(prize)}
                    disabled={isSpinning}
                  >
                    {prize}
                  </button>
                ))}
              </div>
            </div>
          </>
        }
      </div>
      <div className="column-square">
        <div className="square">
          <div className='linha-topo'></div>
          <h4>Quantidade para aposta</h4>
          <input className='input-field' onChange={handleAmountChange} placeholder='Valor apostado' />
          <button className='button-apostar' onClick={handleBetClick}>Apostar!</button>
          {valorApostado !== 0 &&
            <small className="valor-apostado">Valor apostado: {valorApostado} R$</small>
          }
        </div>
        <div className="square">
          <h4>Historico de apostas</h4>
        </div>
      </div>
    </div>
  );
}