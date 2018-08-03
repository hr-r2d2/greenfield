import React, { Component } from 'react';
import { TextInput, View ,Text, Alert, Button} from 'react-native';
import styles from './Home.component.style';
import TextArea from '../TextArea/TextArea.component';
import axios from 'axios'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {cafes: []}

    this.handleInput = this.handleInput.bind(this)
  }
  
  handleInput(input){
    this.setState({
      location: input
    })
  }

  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  handleSearch(){
    Alert.alert('You tapped the button!');
    axios
      .get('http://10.16.3.114:8080/search', {
        params: {
          location: this.state.location,
          coffee: 0,
          atmosphere: 0,
          comfort: 0,
          food: 0,
          radius: 800
        }
      })
      .then((res) => {
        this.handleYelp(res.data.businesses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <TextArea 
          handleTextInput={this.handleInput}/>
        {/* <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        /> */}
        <Button onPress={()=>this.handleSearch()} title='Search'></Button>
        {this.state.cafes.map(cafe=>(
          <Text>{cafe.name}</Text>
        ))}
      </View>
    );
  }
}