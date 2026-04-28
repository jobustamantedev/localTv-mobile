import { ChannelProvider } from "@/src/context/ChannelContext";
import { HomeScreen } from "@/src/screens/HomeScreen";

export default function Index() {
  return (
    <ChannelProvider>
      <HomeScreen />
    </ChannelProvider>
  );
}
