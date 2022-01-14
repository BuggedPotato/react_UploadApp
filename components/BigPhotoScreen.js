import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";


class BigPhotoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.sharePicture = this.sharePicture.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }


  async sharePicture()
  {
    if( await Sharing.isAvailableAsync() )
    {
      Sharing.shareAsync( this.props.route.params.photo.uri );
    }
  }

  async deletePicture()
  {
    await MediaLibrary.deleteAssetsAsync( [ this.props.route.params.photo.id ] );
    this.props.navigation.goBack();
  }

  async uploadPicture()
  {
    const data = new FormData();
    
    const photo = this.props.route.params.photo;
    console.log( photo.filename );
    data.append( "photo", {
      uri: photo.uri,
      type: "image/jpeg",
      name: photo.filename
    } );

    await fetch( "http://192.168.1.111:3000/upload", {
      method: "POST",
      body: data
    } )
    
    console.log( "upload ig" );
    alert( "Upload complete" );
  }

  render() {
    return (
    <View style={ ss.main }>
        <View style={ ss.container }>
            <Image
                resizeMode={'contain'}
                style={{ width: "100%", height: "90%", borderRadius: 12 }}
                source={{ uri: this.props.route.params.photo.uri }}
            />
            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity style={ss.button} onPress={ this.sharePicture } >
                <Text style={ss.btnText}>SHARE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ss.button} onPress={ this.deletePicture } >
                <Text style={ss.btnText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ss.button} onPress={ this.uploadPicture } >
                <Text style={ss.btnText}>UPLOAD</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
    );
  }
}

const ss = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    container: {
        width: "90%",
        marginVertical: 5
    },
    button: {
        // flex: 1,
        // backgroundColor: "red",
        width: "33%",
        padding: 5
        
    },
    btnText: {textAlign: "center", 
      fontSize: Dimensions.get( "screen" ).height / 40,
      color: "whitesmoke", 
      fontWeight: "bold", fontFamily: "monospace" }
  });

export default BigPhotoScreen;
