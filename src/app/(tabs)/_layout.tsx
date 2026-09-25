import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { type ColorValue, Platform } from 'react-native';

import { FontFamily } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({
  focused,
  outline,
  color,
  isFocused,
}: {
  focused: IoniconName;
  outline: IoniconName;
  color: ColorValue;
  isFocused: boolean;
}) {
  return <Ionicons name={isFocused ? focused : outline} size={24} color={color} />;
}

export default function TabLayout() {
  const theme = useTheme();
  const haptics = useHaptics();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          ...(Platform.OS === 'android' && { height: 64, paddingBottom: 8 }),
        },
        tabBarLabelStyle: { fontSize: 11, fontFamily: FontFamily.semibold },
      }}
      screenListeners={{ tabPress: () => haptics.selection() }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '대시보드',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused="grid" outline="grid-outline" color={color} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused="settings" outline="settings-outline" color={color} isFocused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
