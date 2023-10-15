import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';

import * as WebBrowser from 'expo-web-browser';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [apiInputVisible, setApiInputVisible] = useState(true);
  const [apiInput, setApiInput] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!apiInput) {
      return;
    }

    fetchImages();
  }, [activeTab, apiInput]);

  const fetchImages = async () => {
    let category = '';

    switch (activeTab) {
      case 1:
        category = 'motorcycle';
        break;
      case 2:
        category = 'nature';
        break;
      case 3:
        category = 'space';
        break;
      case 4:
        category = 'architecture';
        break;
      default:
        break;
    }

    const url = `https://pixabay.com/api/?key=${apiInput}&q=${category}&image_type=photo`;

    const response = await fetch(url);
    const data = await response.json();
    setImages(data.hits);
  };

  const handleApplyAPIKey = () => {
    if (!apiInput) {
      alert('Please enter a valid API key.');
      return;
    }

    setApiInputVisible(false);
    setActiveTab(1);
  };

  const renderImageItem = ({ item }) => (
      <Image source={{ uri: item.webformatURL }} style={{ width: 200, height: 200 }} />
  );

  const renderTabs = () => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setActiveTab(1)} style={{ backgroundColor: 'rgb(20,45,140)', padding: 10 }}>
          <Text style={{ fontWeight: activeTab === 1 ? 'bold' : 'normal', color: 'white' }}>Motorcycles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(2)} style={{ backgroundColor: 'rgb(20,45,140)', padding: 10 }}>
          <Text style={{ fontWeight: activeTab === 2 ? 'bold' : 'normal', color: 'white' }}>Nature</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(3)} style={{ backgroundColor: 'rgb(20,45,140)', padding: 10 }}>
          <Text style={{ fontWeight: activeTab === 3 ? 'bold' : 'normal', color: 'white' }}>Space</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(4)} style={{ backgroundColor: 'rgb(20,45,140)', padding: 10 }}>
          <Text style={{ fontWeight: activeTab === 4 ? 'bold' : 'normal', color: 'white' }}>Architecture</Text>
        </TouchableOpacity>
      </View>
  );

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(46,52,61)' }}>
        {apiInputVisible ? (
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: 'white' }}>Enter your Pixabay API key:</Text>
              <TextInput
                  style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: 'rgb(255,255,255)', padding: 5 }}
                  value={apiInput}
                  onChangeText={text => setApiInput(text)}
              />
              <TouchableOpacity onPress={handleApplyAPIKey} style={{ marginTop: 10, backgroundColor: 'rgb(20,45,140)', padding: 10 }}>
                <Text style={{ color: 'white' }}>Apply Key</Text>
              </TouchableOpacity>
            </View>
        ) : (
            <>
              {renderTabs()}
              <FlatList
                  data={images}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderImageItem}
                  numColumns={2}
                  contentContainerStyle={{ marginTop: 20 }}
              />
            </>
        )}
      </View>
  );
};

export default App;
