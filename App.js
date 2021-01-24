import React, {useState, useEffect} from "react";
import { 
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  YellowBox
} from "react-native"
import Form from './src/components/Form'
import Footer from './src/components/Footer'
import ResultCaltulation from './src/components/ResultCaltulation'
import colors from './src/utils/colors'

YellowBox.ignoreWarnings([
  "Picker has been extracted",
  "YellowBox has been replaced with LogBox"
])

export default function App() {

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    capital && interest && months ? calculate() : reset();
  },[capital, interest, months])

  const calculate = () =>{
    reset();
    if(!capital){
      setErrorMessage("Añade la cantidad que quieres solicitar");
    }else if(!interest){
      setErrorMessage("Añade el interes del prestamo")
    } else if(!months){
      setErrorMessage("Selecciona los meses a pagar")
    } else{
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow( i + 1, -months)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace('.',','),
        totalPayable: (fee * months).toFixed(2).replace('.',',')
      })
    }
  }

  const reset = () => {
    setErrorMessage("");
    setTotal(null)
  }

  return(
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={styles.SafeArea}>
        <View style={styles.background}/>
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form 
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <ResultCaltulation
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}/>
      <Footer calculate={calculate} />
    </>
  )
}

const styles = StyleSheet.create({
  SafeArea: {
    height:290,  
    alignItems: 'center'
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff',
    marginTop: 15
  }
})