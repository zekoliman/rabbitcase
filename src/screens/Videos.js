import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
  Linking,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {fetchVideos} from '../redux/slices/videoSlice';
import {useDispatch, useSelector} from 'react-redux';

const Videos = ({route}) => {
  const dispatch = useDispatch();
  const {countryCode} = route.params;
  const {videos, loading} = useSelector(state => state.videoSlice);
  useEffect(() => {
    dispatch(fetchVideos(countryCode));
  }, [dispatch, countryCode]);

  return loading === true ? (
    <ActivityIndicator />
  ) : (
    videos && (
      <FlatList
        data={videos.items}
        renderItem={({item, key}) => (
          <View key={key}>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/watch?v=' +
                    item.id +
                    '&ab_channel=' +
                    item.channelId +
                    '',
                )
              }
              key={key}>
              <Image
                source={{uri: item.snippet.thumbnails.high.url}}
                style={styles.images}
              />
              <Text style={styles.text}>{item.snippet.title}</Text>
            </Pressable>
          </View>
        )}
      />
    )
  );
};

const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: 200,
  },
  text: {
    fontSize: 16,
    margin: 15,
  },
});
export default Videos;
