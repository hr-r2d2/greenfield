import React, { Component } from 'react';
import { Keyboard, TextInput, View ,Text, Alert, Button, FlatList} from 'react-native';
import styles from './Main.component.style';
import { SearchBar, Icon } from 'react-native-elements'
import axios from 'axios'
import Search from '../Search/Search.component';
import CafeCard from '../CafeCard/CafeCard.component';

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {cafes: []}

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(params){
    axios
      .get('http://10.16.3.114:8080/search', {params:params})
      .then((res) => {
        this.handleYelp(res.data.businesses);
      })
      .catch((err) => {
        console.log(err);
      });
    }


  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Search handleSearch={this.handleSearch}/>
        <FlatList
          style={{width:"100%"}}
          data={this.state.cafes}
          renderItem={({item:cafe})=>
          <CafeCard cafe={cafe}/>
          
          }/>
      </View>
    );
  }
}