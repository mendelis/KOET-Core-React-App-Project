import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../api/auth';

export default function UpdateProfileScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.cancelled) setImageUri(res.uri);
  };

  const upload = async () => {
    if (!imageUri) return;
    const form = new FormData();
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    // UpdateProfileRequest file key should match server field name; 'photo' is a common key
    form.append('photo', {
      uri: imageUri,
      name: filename,
      type,
    } as any);
    await updateProfile(form);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Pick image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 120, height: 120 }} />}
      <Button title="Upload" onPress={upload} />
    </View>
  );
}