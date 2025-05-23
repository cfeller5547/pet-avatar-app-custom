import { Tabs } from 'expo-router';

export default function MainTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff926b',
      }}
    >
      <Tabs.Screen name="pet"      options={{ title: 'Avatar'   }} />
      <Tabs.Screen name="gallery"  options={{ title: 'Gallery'  }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
