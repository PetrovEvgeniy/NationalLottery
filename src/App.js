import React, {Component, Fragment} from 'react';
import styles from './App.module.css';
import Spheres from './components/Spheres/Spheres';
import Controls from './components/Controls/Controls';
import DirectionModal from './components/Modals/DirectionModal/DirectionModal';
import SummaryModal from './components/Modals/SummaryModal/SummaryModal';
import Logo from './components/Logo/Logo';

//Confetti 
import Confetti from 'react-confetti';

import initialState from './utils/initialState';
let interval = null;

class App extends Component {
  state = {
    gameRunning: false,
    failedAttempts: 0,
    sphereIndex: 0,
    lastNumber: null,
    direction: 'none',
    directionModalVisible: false,
    summaryModalVisible: false,
    spheresData: [
        {currentStatus: 'init', value: '', money: 5000},
        {currentStatus: 'init', value: '', money: 10000},
        {currentStatus: 'init', value: '', money: 15000},
        {currentStatus: 'init', value: '', money: 20000},
        {currentStatus: 'init', value: '', money: 25000},
        {currentStatus: 'init', value: '', money: 30000},
        {currentStatus: 'init', value: '', money: 50000},
        {currentStatus: 'init', value: '', money: 100000},
        {currentStatus: 'init', value: '', money: 150000},
        {currentStatus: 'init', value: '', money: 200000},
    ],
    blacklistedNumbers: [],
    earnedMoney: 0
  }

  onStartHandler = () => {
    if(this.state.sphereIndex !== -1){
      this.setState({gameRunning: true})
      this.startSpinning(this.state.sphereIndex, this.state.direction)
    }
    else{
      //set the inital state
      this.setState({...initialState})
    }
  }
  
  startSpinning(sphereId){
    if(sphereId !== 0){
      //ask for direction
      this.OpenDirectionModalHandler()
    }
    interval = setInterval(() => {
      const currentSphere = this.state.spheresData[sphereId]
      const rand = this.GetRandomNumber(this.state.blacklistedNumbers);
      const newSpheresData = [...this.state.spheresData];
      if(this.state.gameRunning){
        newSpheresData.splice(sphereId,1,{...currentSphere, currentStatus:'spinning', value: rand})
      }
      else{
        clearInterval(interval);
        return;
      }
  
      this.setState({spheresData: [...newSpheresData]})
    },200)
  
  }
  
  onStopHandler = () => {
      //continue spinning if possible
      if(this.state.sphereIndex < this.state.spheresData.length){
        clearInterval(interval);
        const {spheresData, sphereIndex, direction, blacklistedNumbers} = this.state;
        const currentSphere = spheresData[sphereIndex]
        let newSpheresData = [...spheresData];
       
        //first attempt free
        if(sphereIndex > 0){
          newSpheresData = this.GetMutatedSpheresDataArray(
            spheresData,
            sphereIndex,
            currentSphere,
            direction,
            spheresData[sphereIndex].value)

            if(newSpheresData === null){
              return
            }
        }
        else{
          newSpheresData.splice(sphereIndex,1,{...currentSphere, currentStatus:'correct'});
          this.setState({earnedMoney: 5000})
          
        }

        if((sphereIndex + 1 !== spheresData.length) && sphereIndex !== -1){
          blacklistedNumbers.push(currentSphere.value);
          this.setState((prevState) => {
            return {
              lastNumber: newSpheresData[sphereIndex].value,
              spheresData: [...newSpheresData],
              sphereIndex: prevState.sphereIndex + 1,
              blacklistedNumbers: blacklistedNumbers
            }
          });
          this.startSpinning(sphereIndex + 1)          
          
        }
        else{
          const newSpheresData = this.GetMutatedSpheresDataArray(spheresData,
            sphereIndex,
            currentSphere,
            direction,
            spheresData[sphereIndex].value);
          this.EndGame(newSpheresData,sphereIndex)
        }
      }
  }

  EndGame = (newSpheresData, lastIndex) => {
    this.setState({
      spheresData: [...newSpheresData],
      sphereIndex: -1,
      gameRunning: false,
      summaryModalVisible: true,
    })
    this.SetEarnedMoney(newSpheresData,lastIndex,this.state.failedAttempts);
  }

  onChangeDirectionHandler = (selectedDirection) => {
    this.setState({direction: selectedDirection})
  }
  
  GetMutatedSpheresDataArray = (spheresArray, sphereIndex, currentSphere, direction, number) => {
    let newSpheresArray = [...spheresArray];
    let gameEnded = false;

    if(direction === "up"){
      if(number >= this.state.lastNumber){
        newSpheresArray.splice(sphereIndex,1,{...currentSphere, currentStatus:'correct'})
        this.SetEarnedMoney(newSpheresArray,sphereIndex,this.state.failedAttempts);
      }
      else{
        newSpheresArray.splice(sphereIndex,1,{...currentSphere, currentStatus:'incorrect'})
        if(this.state.failedAttempts >= 1){
          this.EndGame(newSpheresArray, sphereIndex)
          gameEnded = true;
        }
        this.setState(prevState => {return{failedAttempts: prevState.failedAttempts + 1}})
        this.SetEarnedMoney(newSpheresArray,sphereIndex,this.state.failedAttempts + 1);
      }
    }
    else if(direction === "down"){
      if(number <= this.state.lastNumber){
        newSpheresArray.splice(sphereIndex,1,{...currentSphere, currentStatus:'correct'})
        this.SetEarnedMoney(newSpheresArray,sphereIndex,this.state.failedAttempts);
      }
      else{
        newSpheresArray.splice(sphereIndex,1,{...currentSphere, currentStatus:'incorrect'})
        if(this.state.failedAttempts >= 1){
          this.EndGame(newSpheresArray,sphereIndex)
          gameEnded = true;
        }
        this.setState(prevState => {return{failedAttempts: prevState.failedAttempts + 1}})
        this.SetEarnedMoney(newSpheresArray,sphereIndex,this.state.failedAttempts + 1);
      }
    }

    return !gameEnded ? newSpheresArray : null;
  }

  GetRandomNumber = (blacklistedNumbers) => {
    let rand = 1 + Math.floor(Math.random() * 50);
    if(blacklistedNumbers.includes(rand)){
      rand = 1 + Math.floor(Math.random() * 50);
    }
    
    return rand;
    
  }

  SetEarnedMoney = (spheresData, sphereIndex, failedAttempts) => {
    let prizeMoney = spheresData[sphereIndex].money;

    //failedAttempts == 1 ask if you want to take the earned money or continue
    if(failedAttempts === 2){
      prizeMoney = spheresData[sphereIndex - 1].money
      prizeMoney /= 2
    }
    this.setState({earnedMoney: prizeMoney})
  }

  OpenDirectionModalHandler = () => {
    this.setState({directionModalVisible: true})
  }
  
  CloseDirectionModalHandler = () => {
    this.setState({directionModalVisible: false})
  }
  

  render(){
    return (
      <Fragment>
      <Logo/>
      <div className={styles.container}>
        {this.state.summaryModalVisible && <Confetti
          gravity={0.2}
        />}
        <SummaryModal
        show={this.state.summaryModalVisible}
        money={this.state.earnedMoney}
        onNewGameStart={this.onStartHandler}
        />
        <DirectionModal
        show={this.state.directionModalVisible}
        onClose={this.CloseDirectionModalHandler}
        lastNumber={this.state.lastNumber}
        onChangeDirection={this.onChangeDirectionHandler}
        />
        <Spheres 
        data={this.state.spheresData}
        />
        <Controls 
        earnedMoney={this.state.earnedMoney}
        direction={this.state.direction}
        gameRunning={this.state.gameRunning}
        onStart={this.onStartHandler} 
        onStop={this.onStopHandler}
        />
      </div>
      </Fragment>
    );
  }
}

export default App;
