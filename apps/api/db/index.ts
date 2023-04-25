import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";

function concat(...args: string[]) {
  return args.join("");
}

function createFakePost() {
  const numberOfImages = faker.datatype.number({ min: 0, max: 4 });
  const images = [];
  const videos = [];

  for (let i = 0; i < numberOfImages; i++) {
    images.push(createFakeImage());
  }

  console.log("here");

  return {
    content: createFakePostContent(),
    imageUrls: images,
    videoUrls: videos,
  };
}

function createFakePostContent() {
  const url = faker.internet.url();
  const spotifyUrl = "https://open.spotify.com/playlist/2yXGnMiT1jqddwbAWSSLWc";
  const youtubeUrl = "https://www.youtube.com/watch?v=2X_2IdybTV0";

  const urls = [url, spotifyUrl, youtubeUrl];
  const randomUrl = faker.helpers.arrayElement(urls);
  const content = faker.lorem.words(5);
  return concat(content, Math.random() > 0.5 ? ` ${randomUrl}` : "");
}

function createFakeImage() {
  return faker.image.animals(1080, 720, true);
}

function createFakePosts(num: number) {
  const posts = [];

  for (let i = 0; i < num; i++) {
    posts.push(createFakePost());
  }

  return posts;
}

async function main() {
  const posts = createFakePosts(200);
  console.log(posts);
  await writeFile("posts.json", JSON.stringify(posts, null, 2));
}

main();
