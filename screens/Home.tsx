import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { Card, FAB, Paragraph } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import Post from "../models/Post";
import PostService from "../api/post";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { primary } from "../constants/Colors";
import { HomeNavProps } from "../navigation/HomeStack";

type HomeProps = HomeNavProps<"Home">;

const Home: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  const authContext = useContext(AuthContext);
  const [feed, setFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = async () => {
    try {
      const postService = new PostService(authContext.user?.token || "");
      return await postService.getFeedByUsername(
        authContext.user?.username || ""
      );
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const onRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    const posts = await fetchFeed();
    setFeed(posts);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchFeed().then((posts) => {
        setFeed(posts);
        setLoading(false);
      });
    }
  }, [fetchFeed, loading, setLoading]);

  return (
    <>
      <FlatList
        style={styles.feed}
        data={feed}
        keyExtractor={(item, index) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[primary]}
          />
        }
        renderItem={({ item }) => (
          <Card
            mode="outlined"
            style={styles.post}
            onPress={() =>
              Alert.alert("Post", item.content, [
                { text: "Ok", onPress: () => console.log(item.createdBy) },
              ])
            }
          >
            <Pressable onPress={() => console.log(item.content)}>
              <Card.Title
                title={item.createdBy.name}
                subtitle={`@${item.createdBy.username}`}
                left={() => (
                  <Image
                    style={styles.img}
                    source={
                      item.createdBy.image === "profile.png"
                        ? require("../assets/profile.png")
                        : { uri: item.createdBy.image }
                    }
                  />
                )}
              />
            </Pressable>
            <Card.Content>
              <Paragraph>{item.content}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Text style={styles.postDate}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <MaterialCommunityIcons
                name="comment-outline"
                color={primary}
                size={24}
              />
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        theme={{
          colors: {
            accent: primary,
          },
        }}
        onPress={() => {
          console.log("OnCreatePostPress");
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  feed: {
    marginHorizontal: 10,
  },
  loadingIconContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  loadingIcon: {
    width: 48,
    height: 48,
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 500,
  },
  post: {
    marginTop: 10,
  },
  cardActions: {
    alignSelf: "flex-end",
  },
  postDate: {
    alignSelf: "flex-start",
  },
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,
  },
});

export default Home;
